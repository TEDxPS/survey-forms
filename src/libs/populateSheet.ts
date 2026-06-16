import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import dbConnect from "@/libs/mongodb";
import Form from "@/models/Form";
import { IForm } from "@/types/form";
import { parsePrivateKey } from "@/libs/googleAuth";

interface SurveyElement {
  type: string;
  name: string;
  title?: string;
  elements?: SurveyElement[];
}

function extractQuestions(elements: SurveyElement[] = []) {
  return elements
    .flatMap((el) => {
      if (el.type === "panel" && el.elements) {
        return el.elements.filter(
          (e) => e.type !== "html" && e.type !== "expression"
        );
      }
      return el.type !== "html" && el.type !== "expression" ? [el] : [];
    })
    .map((el) => ({ id: el.name, title: el.title || el.name }));
}

export interface PopulateResult {
  success: boolean;
  message: string;
  sheets: string[];
}

export async function populateSheetForSlug(
  slug: string
): Promise<PopulateResult> {
  await dbConnect();

  // @ts-ignore
  const formDoc = await Form.findOne({ slug });
  if (!formDoc) {
    throw new Error(`Form with slug '${slug}' not found in database.`);
  }

  const form = formDoc.toObject() as IForm;
  const google = form.google;

  if (!google?.private_key || !google?.client_email) {
    throw new Error(
      "No Google credentials found in this form's configuration."
    );
  }
  if (!google.sheetId) {
    throw new Error("No Google sheetId found in this form's configuration.");
  }

  const auth = new JWT({
    email: google.client_email,
    key: parsePrivateKey(google.private_key),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(google.sheetId as string, auth);
  await doc.loadInfo();

  const defaultHeaders = ["Submission ID", "Timestamp"];

  // ── Sheet 1: all questions ─────────────────────────────
  const allQuestions = (form.pages || []).flatMap((page: any) =>
    extractQuestions(page.elements || [])
  );
  const combinedHeaders = [...defaultHeaders, ...allQuestions.map((q) => q.id)];
  const combinedDescriptions = [
    ...defaultHeaders,
    ...allQuestions.map((q) => q.title),
  ];

  const firstSheet = doc.sheetsByIndex[0];
  await firstSheet.resize({
    rowCount: 500,
    columnCount: combinedHeaders.length,
  });
  await firstSheet.setHeaderRow(combinedHeaders);
  await firstSheet.addRow(combinedDescriptions);

  const initializedSheets: string[] = [firstSheet.title];

  // ── Team sheets (customData.sheetName) ────────────────
  const generalQuestions = (form.pages || [])
    .filter((page: any) => !page.customData?.sheetName)
    .flatMap((page: any) => extractQuestions(page.elements || []));

  const teamPagesMap: Record<string, any[]> = {};
  for (const page of form.pages || []) {
    const sheetName = (page as any).customData?.sheetName;
    if (sheetName) {
      if (!teamPagesMap[sheetName]) teamPagesMap[sheetName] = [];
      teamPagesMap[sheetName].push(page);
    }
  }

  for (const [sheetTitle, pages] of Object.entries(teamPagesMap)) {
    if (doc.sheetsByTitle[sheetTitle]) {
      initializedSheets.push(`${sheetTitle} (skipped — already exists)`);
      continue;
    }
    const teamQuestions = pages.flatMap((page: any) =>
      extractQuestions(page.elements || [])
    );
    const teamHeaders = [
      ...defaultHeaders,
      ...generalQuestions.map((q) => q.id),
      ...teamQuestions.map((q) => q.id),
    ];
    const teamDescriptions = [
      ...defaultHeaders,
      ...generalQuestions.map((q) => q.title),
      ...teamQuestions.map((q) => q.title),
    ];
    const newSheet = await doc.addSheet({
      title: sheetTitle,
      headerValues: teamHeaders,
      gridProperties: { rowCount: 500, columnCount: teamHeaders.length },
    });
    await newSheet.addRow(teamDescriptions);
    initializedSheets.push(sheetTitle);
  }

  return {
    success: true,
    message: `Successfully initialized "${doc.title}" with ${combinedHeaders.length} columns.`,
    sheets: initializedSheets,
  };
}
