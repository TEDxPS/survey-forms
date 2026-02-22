import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import dbConnect from "../src/libs/mongodb";
import Form from "../src/models/Form";
import * as dotenv from "dotenv";

dotenv.config();

interface SurveyElement {
  type: string;
  name: string;
  title?: string;
  elements?: SurveyElement[];
  html?: string;
  isRequired?: boolean;
}

async function populateGoogleSheet(slug: string) {
  if (!slug) {
    console.error("Please provide a form slug! Usage: npx ts-node scripts/populateGoogleSheet.ts <slug>");
    return;
  }

  await dbConnect();
  const formDoc = await Form.findOne({ slug });

  if (!formDoc) {
    console.error(`Form with slug '${slug}' not found in database.`);
    return;
  }

  const form = formDoc.toObject();
  const googleConfig = form.google || {};

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
    console.error("No Google apiKey provided in MongoDB document. Cannot authenticate.");
    return;
  }

  const sheetId = googleConfig.sheetId;
  if (!sheetId) {
    console.error("No Google sheetId provided in MongoDB document.");
    return;
  }

  const doc = new GoogleSpreadsheet(sheetId as string, serviceAccountAuth);
  await doc.loadInfo(); // loads document properties and worksheets

  // Extract all questions from the form
  const questions = (form.pages || [])
    .flatMap((page: any) => page.elements || [])
    .flatMap((element: SurveyElement) => {
      // Handle panels which might have nested elements
      if (element.type === "panel" && element.elements) {
        return element.elements.filter((e) => e.type !== "html" && e.type !== "expression");
      }
      return (element.type !== "html" && element.type !== "expression") ? [element] : [];
    })
    .map((element: SurveyElement) => ({
      id: element.name,
      title: element.title || element.name,
    }));

  const defaultHeaders = ["Submission ID", "Timestamp"];
  const combinedHeaders = [...defaultHeaders, ...questions.map((q: any) => q.id)];
  const combinedDescriptions = [...defaultHeaders, ...questions.map((q: any) => q.title)];

  const firstSheet = doc.sheetsByIndex[0];

  // Resize and set headers
  await firstSheet.resize({ rowCount: 500, columnCount: combinedHeaders.length });
  await firstSheet.setHeaderRow(combinedHeaders);

  // Add the descriptions row (acting as the user-friendly header)
  await firstSheet.addRow(combinedDescriptions);

  console.log(`Successfully initialized first sheet of '${doc.title}' with ${combinedHeaders.length} columns.`);
}

// Get slug from command line args
const args = process.argv.slice(2);
if (args[0]) {
  populateGoogleSheet(args[0]).then(() => process.exit(0));
} else {
  console.log("Usage: npx ts-node scripts/populateGoogleSheet.ts <slug>");
}