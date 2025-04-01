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
const GOOGLE_SERVICE_ACCOUNT_EMAIL = "";
const GOOGLE_PRIVATE_KEY = "";
const GOOGLE_SPREADSHEET_ID = "1rzjK6gEzCbdawqCn9iXUM1B8x2spyesOz34-_4bCWWk";

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

  // Create sheets for each team if they don't exist
  for (const team of teams) {
    const sheetTitle = team.name;

    if (!existingSheets[sheetTitle]) {
      // Create new sheet
      const sheet = await doc.addSheet({ title: sheetTitle });

      // Get all questions from the team's elements, filtering out HTML and panel elements
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

      // Add header rows
      await sheet.setHeaderRow([
        "Submission ID",
        "Timestamp",
        ...questions.map((q) => q.id),
      ]);

      await sheet.addRow([
        "Submission ID",
        "Timestamp",
        ...questions.map((q) => q.title),
      ]);

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
    "1rzjK6gEzCbdawqCn9iXUM1B8x2spyesOz34-_4bCWWk",
    serviceAccountAuth
  );
  await doc.loadInfo();

  // Get all existing sheet titles
  const existingSheets = doc.sheetsByTitle;

  for (const sheet of Object.values(existingSheets)) {
    // Only remove sheets that are not "General"
    if (!["General"].includes(sheet.title)) {
      await sheet.delete();
    }
  }

  console.log("All sheets have been removed!");
}

// removeAllSheets();
populateGoogleSheet();
