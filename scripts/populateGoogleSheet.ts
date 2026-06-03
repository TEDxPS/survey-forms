import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import * as dotenv from 'dotenv';
import dbConnect from "../src/libs/mongodb";
import Form, { IForm } from "../src/models/Form";
import { parsePrivateKey } from "@/libs/googleAuth";

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
    console.error("Please provide a form slug! Usage: node scripts/populateGoogleSheet/index.js <slug> (or npx ts-node scripts/populateGoogleSheet.ts <slug> in dev)");
    return;
  }

  await dbConnect();
  // @ts-ignore: Mongoose findOne types can be complex, skipping strict check here
  const formDoc = await Form.findOne({ slug });

  if (!formDoc) {
    console.error(`Form with slug '${slug}' not found in database.`);
    return;
  }

  const form = formDoc.toObject() as IForm;
  const googleConfig = form.google;

  if (!googleConfig?.private_key || !googleConfig?.client_email) {
    console.error("No Google credentials provided in MongoDB document. Cannot authenticate.");
    return;
  }

  if (!googleConfig.sheetId) {
    console.error("No Google sheetId provided in MongoDB document.");
    return;
  }

  let serviceAccountAuth;
  try {
    serviceAccountAuth = new JWT({
      email: googleConfig.client_email,
      key: parsePrivateKey(googleConfig.private_key),
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
  } catch (e) {
    console.error("Failed to configure Google JWT auth:", e);
    return;
  }

  const doc = new GoogleSpreadsheet(googleConfig.sheetId as string, serviceAccountAuth);
  await doc.loadInfo(); // loads document properties and worksheets

  // Extract all questions from the form
  const allQuestions = (form.pages || [])
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
  const combinedHeaders = [...defaultHeaders, ...allQuestions.map((q: any) => q.id)];
  const combinedDescriptions = [...defaultHeaders, ...allQuestions.map((q: any) => q.title)];

  const firstSheet = doc.sheetsByIndex[0];

  // Resize and set headers
  await firstSheet.resize({ rowCount: 500, columnCount: combinedHeaders.length });
  await firstSheet.setHeaderRow(combinedHeaders);

  // Add the description row (acting as the user-friendly header)
  await firstSheet.addRow(combinedDescriptions);

  console.log(`Successfully initialized first sheet of '${doc.title}' with ${combinedHeaders.length} columns.`);

  // Find general questions (from pages without customData.sheetName)
  const generalQuestions = (form.pages || [])
    .filter((page: any) => !page.customData || !page.customData.sheetName)
    .flatMap((page: any) => page.elements || [])
    .flatMap((element: SurveyElement) => {
      if (element.type === "panel" && element.elements) {
        return element.elements.filter((e) => e.type !== "html" && e.type !== "expression");
      }
      return (element.type !== "html" && element.type !== "expression") ? [element] : [];
    })
    .map((element: SurveyElement) => ({
      id: element.name,
      title: element.title || element.name,
    }));

  const existingSheets = doc.sheetsByTitle;

  // Group team pages by sheetName
  const teamPagesMap: Record<string, any[]> = {};
  for (const page of (form.pages || [])) {
    if (page.customData && page.customData.sheetName) {
      if (!teamPagesMap[page.customData.sheetName]) {
        teamPagesMap[page.customData.sheetName] = [];
      }
      teamPagesMap[page.customData.sheetName].push(page);
    }
  }

  // Create separate sheets for teams
  for (const sheetTitle of Object.keys(teamPagesMap)) {
    if (!existingSheets[sheetTitle]) {
      const teamQuestions = teamPagesMap[sheetTitle]
        .flatMap((page: any) => page.elements || [])
        .flatMap((element: SurveyElement) => {
          if (element.type === "panel" && element.elements) {
            return element.elements.filter((e) => e.type !== "html" && e.type !== "expression");
          }
          return (element.type !== "html" && element.type !== "expression") ? [element] : [];
        })
        .map((element: SurveyElement) => ({
          id: element.name,
          title: element.title || element.name,
        }));

      const teamCombinedHeaders = [...defaultHeaders, ...generalQuestions.map((q: any) => q.id), ...teamQuestions.map((q: any) => q.id)];
      const teamCombinedDescriptions = [...defaultHeaders, ...generalQuestions.map((q: any) => q.title), ...teamQuestions.map((q: any) => q.title)];

      const newSheet = await doc.addSheet({
        title: sheetTitle,
        headerValues: teamCombinedHeaders,
        gridProperties: {
          rowCount: 500,
          columnCount: teamCombinedHeaders.length,
        }
      });

      await newSheet.addRow(teamCombinedDescriptions);
      console.log(`Created and initialized team sheet: '${sheetTitle}'`);
    } else {
      console.log(`Team sheet '${sheetTitle}' already exists. Skipping creation.`);
    }
  }
}

// Get slug from command line args
const args = process.argv.slice(2);
if (args[0]) {
  populateGoogleSheet(args[0]).then(() => process.exit(0));
} else {
  console.log("Usage: node scripts/populateGoogleSheet/index.js <slug> (or npx ts-node scripts/populateGoogleSheet.ts <slug> in dev)");
}
