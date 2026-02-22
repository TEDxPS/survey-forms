import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import dbConnect from "@/libs/mongodb";
import FormSubmission from "@/models/FormSubmission";
import Form from "@/models/Form";

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
  const submission = new FormSubmission({
    formName: "recruitment",
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
  if (googleConfig && googleConfig.apiKey && googleConfig.apiKey.includes('private_key')) {
    try {
      const credentials = typeof googleConfig.apiKey === 'string'
        ? JSON.parse(googleConfig.apiKey)
        : googleConfig.apiKey;
      serviceAccountAuth = new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      });
    } catch (e) {
      console.error("Failed to parse provided apiKey as JSON:", e);
    }
  }

  if (!serviceAccountAuth) {
    serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join(
        "\n"
      ),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

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

  return Response.json({ data: "OK" });
}
