import { readFileSync } from 'fs';
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import dbConnect from "@/libs/mongodb";
import FormSubmission from "@/models/FormSubmission";

export async function GET() {
  return Response.json({ data: "hello" });
}

export async function POST(req: Request) {
  // const formData = await req.formData();
  // const data: Record<string, string> = {};
  // formData.forEach((value, key) => {
  //   data[key] = value as string;
  // });
  const data = await req.json();
  console.log('Original data:', data);

  const processedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      typeof value === 'object' && value !== null
        ? Array.isArray(value)
          ? value.map(v => v.content || v.value || v).join(", ")
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

  // Initialize Necessary Items
  // const serviceAccountAuth = new JWT({
  //   email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  //   key: process.env.GOOGLE_PRIVATE_KEY,
  //   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  // });

  const credentials = JSON.parse(
    readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS as string, 'utf-8')
  );
  const serviceAccountAuth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID as string,
    serviceAccountAuth
  );
  await doc.loadInfo(); // loads document properties and worksheets

  console.log('Entry Data: ', data);

  const sheetData = Object.fromEntries(
    Object.entries(processedData).map(([key, value]) => [
      key,
      Array.isArray(value)
        ? value.map(v => typeof v === 'object' && v !== null ? v.content : v).join(", ")
        : String(value)
    ])
  ) as { [key: string]: string };

  const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  await sheet.addRow(sheetData);

  const teamSheet = doc.sheetsByTitle[data["first_choice"]["value"]];
  await teamSheet.addRow(sheetData);

  return Response.json({ data: "OK" });
}
