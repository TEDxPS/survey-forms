import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import dbConnect from "@/libs/mongodb";
import { getFormSubmissionModel } from "@/models/FormSubmission";
import Form from "@/models/Form";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ data: "hello" });
}

export async function POST(req: Request) {
  const payload = await req.json();
  const { slug, ...data } = payload;
  console.log('Original data:', data);

  const processedData = Object.fromEntries(
    Object.entries(data).flatMap(([key, value]) => {
      if (
        value &&
        typeof value === 'object' &&
        'value' in value &&
        value.value &&
        typeof value.value === 'object' &&
        !Array.isArray(value.value)
      ) {
        return Object.entries(value.value).map(([subKey, subValue]) => [
          `${key}[${subKey}]`,
          Array.isArray(subValue)
            ? subValue.join(', ')
            : String(subValue)
        ]);
      }

      return [[
        key,
        value && typeof value === 'object' && 'value' in value
          ? String(value.value)
          : String(value)
      ]];
    })
  );
  console.log('Processed data:', processedData);

  // Save to database first
  await dbConnect();

  const targetDbSlug = slug || "default_submissions";
  const DynamicFormSubmission = getFormSubmissionModel(targetDbSlug);

  const submission = new DynamicFormSubmission({
    formName: slug || "recruitment",
    data: data,  // Keep original data in database
    emailSent: false,
  });
  await submission.save();

  let googleConfig = null;
  let formObj: any = null;
  if (slug) {
    const form = await Form.findOne({ slug });
    if (form) {
      formObj = form.toObject();
      if (formObj.google) {
        googleConfig = formObj.google;
      }
    }
  }

  let serviceAccountAuth;
  if (googleConfig && googleConfig.private_key && googleConfig.client_email) {
    serviceAccountAuth = new JWT({
      email: googleConfig.client_email,
      key: typeof googleConfig.private_key === 'string' ? googleConfig.private_key.replace(/\\n/g, '\n') : googleConfig.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
  }

  if (serviceAccountAuth && googleConfig?.sheetId) {
    const doc = new GoogleSpreadsheet(
      googleConfig.sheetId,
      serviceAccountAuth
    );
    await doc.loadInfo(); // loads document properties and worksheets

    console.log('Entry Data: ', data);

    const sheetData = Object.fromEntries(
      Object.entries(processedData).map(([key, value]) => [
        key,
        Array.isArray(value)
          ? value.map(v => typeof v === 'object' && v !== null ? v.content : v).join(",")
          : String(value)
      ])
    ) as { [key: string]: string };

    // Add Submission ID and Timestamp
    const now = new Date();
    const malaysiaTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)); // Convert to GMT+8

    sheetData["Submission ID"] = now.getTime().toString();
    sheetData["Timestamp"] = malaysiaTime.toISOString().replace('T', ' ').slice(0, 19);

    console.log('Sheet Data: ', sheetData);

    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
    await sheet.addRow(sheetData);

    if (formObj && formObj.pages) {
      const activeSheetNames = new Set<string>();

      const extractNames = (elements: any[] = []): string[] => {
        return elements.flatMap((el: any) => {
          const names: string[] = [];
          if (el.name && el.type !== "html" && el.type !== "expression") {
            names.push(el.name);
          }
          if (el.elements) {
            names.push(...extractNames(el.elements));
          }
          return names;
        });
      };

      for (const page of formObj.pages) {
        if (page.customData && page.customData.sheetName) {
          const pageNames = extractNames(page.elements);
          // If the user provided ANY answer to any question on this team page, they must have seen it / chosen it
          const hasAnswers = pageNames.some(
            (name) => processedData[name] !== undefined && processedData[name] !== null && processedData[name] !== ""
          );
          if (hasAnswers) {
            activeSheetNames.add(page.customData.sheetName);
          }
        }
      }

      for (const sheetName of Array.from(activeSheetNames)) {
        const teamSheet = doc.sheetsByTitle[sheetName];
        if (teamSheet) {
          await teamSheet.addRow(sheetData);
          console.log(`Routed submission copy to team sheet: ${sheetName}`);
        }
      }
    }
  } else {
    console.warn("No Google credentials provided, skipping Google Sheets insertion.");
  }

  return Response.json({ data: "OK" });
}
