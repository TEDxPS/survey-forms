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
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === 'object' && value !== null
        ? Array.isArray(value)
          ? value.map(v => typeof v === 'object' && v !== null && 'content' in v ? v.content : (typeof v === 'object' && v !== null && 'value' in v ? v.value : v)).join(String.fromCharCode(10))
          : 'value' in value
            ? value.value
            : String(value)
        : String(value)
    ])
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
  if (slug) {
    const form = await Form.findOne({ slug });
    if (form && form.google) {
      googleConfig = form.google;
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

  if (!serviceAccountAuth) {
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
      serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
    }
  }

  if (serviceAccountAuth) {
    const doc = new GoogleSpreadsheet(
      googleConfig?.sheetId || (process.env.GOOGLE_SHEET_ID as string),
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

    if (data["first_choice"] && data["first_choice"]["value"]) {
      const teamSheet = doc.sheetsByTitle[data["first_choice"]["value"]];
      if (teamSheet) {
        await teamSheet.addRow(sheetData);
      }
    }
  } else {
    console.warn("No Google credentials provided, skipping Google Sheets insertion.");
  }

  return Response.json({ data: "OK" });
}
