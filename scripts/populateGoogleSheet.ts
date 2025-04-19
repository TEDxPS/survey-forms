import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { editorial } from "../data/team_questions/editorial_json";
import { experience } from "../data/team_questions/experience_json";
import { floorAndHall } from "../data/team_questions/floor_and_hall";
import { foodBeverage } from "../data/team_questions/food_beverage_json";
import { infoTech } from "../data/team_questions/info_tech_json";
import { logistic } from "../data/team_questions/logistic_json";
import { partnership } from "../data/team_questions/partnership_json";
import { production } from "../data/team_questions/production_json";
import { publicRelations } from "../data/team_questions/public_relations_json";
import { socialMedia } from "../data/team_questions/social_media_json";
import { speakerCuration } from "../data/team_questions/speaker_curation_json";
import { stageManagement } from "../data/team_questions/stage_management_json";
import { ticketing } from "../data/team_questions/ticketing_json";
import { videoPhoto } from "../data/team_questions/video_photo_json";
import { visual } from "../data/team_questions/visual_json";
import { volunteer } from "../data/team_questions/volunteer_json";

interface SurveyElement {
  type: string;
  name: string;
  title?: string;
  elements?: SurveyElement[];
  html?: string;
  isRequired?: boolean;
}

interface Team {
  name: string;
  description: string;
  elements: SurveyElement[];
  customData?: {
    sheetName: string;
  };
}

const teams: Team[] = [
  editorial,
  experience,
  floorAndHall,
  foodBeverage,
  infoTech,
  logistic,
  partnership,
  production,
  publicRelations,
  socialMedia,
  speakerCuration,
  stageManagement,
  ticketing,
  videoPhoto,
  visual,
  volunteer,
];

// TODO: Replace with actual credentials
const GOOGLE_SERVICE_ACCOUNT_EMAIL = "tedxpetalingstreet@friendly-autumn-455017-d1.iam.gserviceaccount.com";
const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCLAWj1NsjMV2gT\nyJnKgORNDYFiOEXlJD78Ow8MAhyhBeuVhGqhhd3PPvoWNeL+91r5WcB2v5ZiK48d\n6USPoa5a26CHFdBFrIDt3XMgfldxlqd7YdRo9SvRVyT+JtaDZlbHc14ecFXqxkDL\naaleZWbudoBK/cVqQdINTTqjEQ/QE5UgYnOTuMxC+3aFpMCLqM5u1l0nBv6Mc/xu\nF9Y9DJQvowFw00MUXUV2XZ1xpENHraS3vpr7AzNwe4t/d/jAOVqP202T34FSqNnY\nOUZGDX8u9me4BvUIABHJC5fkHkWOYLQSaC2fal9ExRxRkc5+ht53GM/3U8k3Gtbd\nHewt+6/HAgMBAAECggEADB4OWTnyXSXNc9QL3ARKYpEn0zkWlrgHKZO4ZxKUDlFm\nzPzjEruJr3RM9ryx0gocCxqQ1Yk0AdDMRA4+pMqyWUdGAiCbrEcyYgno7E83Lja0\n2OOZUaD1teUD24flMUUtkWt0K/Ec/D9WDKVkV089ntIDswXWPMIKHpC56Ncm6rt5\nYHf/XJpm7sD7YHYkrtFlRhzX1W8s/+Bg75E95PSeNyZ8FIRPmDSMvO+lZ8SjqRqS\nrrKA1ij2K9hlfJirxfnxPY6rz/tYIzwbKkTBAzB48EwLfCBE3JxCxKNMhpHmOi7i\nr+bxtYyuvecmK1BaklyuO1iXFCkhlrDL0PhvATf8mQKBgQDCHiTMgr5Z8fNGm8Xn\n2XNonXANMYmca5IitdWRUvVevZkjle6kv9Efv8A8OA2rybRWF3/WmfAJQDTstXoF\nx5UEOLH9p4xrLEPvVfwSwiYXIRSZnv0K/5iGO66kNQn9j4uIDFvKYBMcc0wGtSQJ\nvD6jAXsrGl1F2sClD2YhpZYaYwKBgQC3UZUsnkZrogHz5Jq6imnpOSE3tEpqMSGf\npffomMg+6Sg8zrtjYcKMns2rdOowK+qHhcyFtHm4YS7bJgZbWYi5e5iPHvPzCaj2\n8vwf2J450g+zSzE2kugti5FT2irf5d5RrHHa6bxt2sDpaFYGPTrOtEStTHDmlAi1\nBJldv99ATQKBgQCXuqwU1tUmxQHc3QGSOdwFl5nwFhp0E3kEfJDUqL12MkizEgyY\n5f32DRGbgEzfTCgTawbXnTeMY416wFcCkYAe7pnhpMcTNmRbfSAtIWhYh9jsQuOT\nZzm3Iotder+2XC86Rj6xLuuBP3XbgFcM7QEgtJWrmU3yvgv6eNDh1+Y99QKBgBNb\nQe0cKUNkL+CY2t2nj9dYePFw0Aq2dV5uH+cner1p0R3all7AC9LdUcow5il/+Zul\nvRrBG7kkSdZKBZHPumgbbNhv5EJdWsH4ljamoM5qJ84+ukuQ54MnoYjBGJXbp8Xn\n932uAH95AbWjlrHB9VuuHTJPR/yQ1PqIKcmEYQZhAoGBALy/gomjxlnTdP3Gox1E\nopzbyqBMO1i4nqBcOgs0m8QxhOMjMxABCrjnzp1KjuUdmx3F/JPJhqFH8Wyx7iAh\npsh4DWzktIEYvnbdi/XOGXJNJT/Ip2RBOik2b9/jJuuZDIs3AZKiOEQC+EobyWE+\nEPUWDhq2YGgFvT0IjEwC0dIy\n-----END PRIVATE KEY-----\n";
const GOOGLE_SPREADSHEET_ID = "1TWm9F3GUdUUuQrBmO8PFLcRKRFy8q-pNmUUDX6y_2Dc"; //Dev used

async function populateGoogleSheet() {
  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo(); // loads document properties and worksheets

  // Get all existing sheet titles
  const existingSheets = doc.sheetsByTitle;

  // Load the header row from the first sheet
  const firstSheet = doc.sheetsByIndex[0];
  await firstSheet.loadHeaderRow();
  const firstSheetHeaders = firstSheet.headerValues || [];

  // Load all rows and ensure they're fully loaded
  const firstSheetRows = await firstSheet.getRows();
  
  // Get the header descriptions using the public get method
  const headerDescriptions = firstSheetRows.length > 0 
    ? firstSheetHeaders.map(header => firstSheetRows[0].get(header))
    : firstSheetHeaders;

  console.log("Header descriptions:", headerDescriptions);

  // Create sheets for each team if they don't exist
  for (const team of teams) {
    const sheetTitle = team.customData ? team.customData.sheetName : team.name;

    if (!existingSheets[sheetTitle]) {
      // Get all questions to calculate required columns
      const questions = team.elements
        .flatMap((element: SurveyElement) => {
          if (element.type === "panel" && element.elements) {
            return element.elements.filter((e) => e.type !== "html");
          }
          return element.type !== "html" ? [element] : [];
        })
        .map((element: SurveyElement) => ({
          id: element.name,
          title: element.title || element.name,
        }));

      // Calculate total columns needed
      const totalColumns = firstSheetHeaders.length + questions.length;

      // Combine headers before creating sheet
      const combinedHeaders = [...firstSheetHeaders, ...questions.map((q) => q.id)];

      // Create new sheet with headers
      const sheet = await doc.addSheet({ 
        title: sheetTitle,
        headerValues: combinedHeaders,
        gridProperties: {
          columnCount: totalColumns,
          rowCount: 500
        }
      });

      // Add the descriptions row
      const combinedDescriptions = [...headerDescriptions, ...questions.map((q) => q.title)];
      await sheet.addRow(combinedDescriptions);

      console.log(`Created sheet for ${sheetTitle}`);
    } else {
      console.log(`Sheet ${sheetTitle} already exists`);
    }
  }

  console.log("Google Sheet has been populated!");
}

// For Debugging Purposes
async function removeAllSheets() {
  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    "1qLbGODHXXYdyIFR3TA6yKadnTWAmpvj7-6sOpQkKCS4",
    serviceAccountAuth
  );
  await doc.loadInfo();

  // Get all existing sheet titles
  const existingSheets = doc.sheetsByTitle;

  for (const sheet of Object.values(existingSheets)) {
    // Only remove sheets that are not "General"
    if (!["General Information"].includes(sheet.title)) {
      await sheet.delete();
    }
  }

  console.log("All sheets have been removed!");
}

async function replacePreferenceColumnValues() {
  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  const targetColumnTitle = "preferred_tedxps";
  const valueMapping: Record<string, string> = {
    "new" : "I want to try something new / open to any opportunity | 我对我的组别分配保持开放，愿意尝试我没有经验的组别" ,
    "experienced": "I want to join a role that is more relevant to what I studied/ I am working | 我想要参与和我的【学业】/【工作】领域有关系的组别为志工"
  };

  let updatedRows = 0;
  for (const sheet of Object.values(doc.sheetsByTitle)) {
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues || [];
    
    const columnIndex = headers.findIndex(header => header === targetColumnTitle);
    
    if (columnIndex === -1) {
      continue;
    }
    
    const rows = await sheet.getRows();
    
    for (const row of rows) {
      if(updatedRows >= 50){
        updatedRows = 0;
        console.log("Updated 50 rows, sleeping for 1 minute..."); //Handle rate limit exceeded
        await new Promise(resolve => setTimeout(resolve, 60000));
      }

      const currentValue = row.get(targetColumnTitle);
      
      if (currentValue && valueMapping[currentValue]) {
        row.set(targetColumnTitle, valueMapping[currentValue]);
        await row.save();
        updatedRows++;
      }
    }
  }
  
  console.log("All preference column values have been replaced!");
}

//removeAllSheets();
// populateGoogleSheet();
replacePreferenceColumnValues();