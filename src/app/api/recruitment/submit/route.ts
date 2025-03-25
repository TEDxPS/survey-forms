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

  // Save to database first
  await dbConnect();
  const submission = new FormSubmission({
    formName: "recruitment",
    data: data,
    emailSent: false,
  });
  await submission.save();

  // Initialize Necessary Items
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID as string,
    serviceAccountAuth
  );
  await doc.loadInfo(); // loads document properties and worksheets

  const sheetData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      Array.isArray(value) ? value.join(",") : String(value)
    ])
  ) as { [key: string]: string };

  const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  await sheet.addRow(sheetData);

  const teamSheet = doc.sheetsByTitle[data["first_choice"]];
  await teamSheet.addRow(sheetData);

  return Response.json({ data: "OK" });
}
