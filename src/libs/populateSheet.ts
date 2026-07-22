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

  // ── Routed sheets (google.sheetRouting) ────────────────
  // Sub-sheets mirror the master sheet's full column set, since routing is
  // decided by one answer's value rather than which page it lives on.
  const routing = google.sheetRouting as
    | { field?: string; map?: Record<string, string> }
    | undefined;
  const sheetTitles = routing?.map ? Array.from(new Set(Object.values(routing.map))) : [];

  for (const sheetTitle of sheetTitles) {
    if (doc.sheetsByTitle[sheetTitle]) {
      initializedSheets.push(`${sheetTitle} (skipped — already exists)`);
      continue;
    }
    const newSheet = await doc.addSheet({
      title: sheetTitle,
      headerValues: combinedHeaders,
      gridProperties: { rowCount: 500, columnCount: combinedHeaders.length },
    });
    await newSheet.addRow(combinedDescriptions);
    initializedSheets.push(sheetTitle);
  }

  return {
    success: true,
    message: `Successfully initialized "${doc.title}" with ${combinedHeaders.length} columns.`,
    sheets: initializedSheets,
  };
}
