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
const GOOGLE_PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCtoyiDl1zv2b0H\noed57yAw4c7LsKrn8q3VHj1obFKBa16fr30+MCjEHTvtNiD3PBuKxX3GtdOGNQr9\nD18mhRrJRrvU6kQNWVYmdnCRD2N/TkW3a0vFqJBpUTiLPzvkdMi8aykxlhJEcsqn\nCi6PhN/XqaumC6lc63CRTYBAZMpvLv7JEtYGVMoTQ6PsizkyHwLDNtCP8OeL0HrN\nRYgde82segyqR0B8NAVf/s7gDcuefDX8vWsACzDkF0RjHRcQ+pjlXOXI2LPHUHY3\n+EeWJG4MTbshg+IvP3dhymDsv8uNr965DpzTJpwtfY1jz/9S8K55t6Yqk0HZO6j6\n044TeM3LAgMBAAECggEAOWz1CLRGGdMWt8/9eK+zo0cC+A2pMEXr5Mh4AbGVhdTn\nOgO1dZxC1z1d5OFafLnl1/rh0pau6rtfM3tieiBaUAfzNgL2V73chqL0Lp16yA8w\ncm1rZWcOv64Ld84FdlSDUQFV4d7ikr2uNRlidbe5uh8UtDk2HZOGKqAJkwJiiuth\no6YS4jvMfJ9XeeQTzp0JwvRrb+a0N/w0i0Pq88h+YSzwWXCzCc0B4v0GhiGwJaXU\nhzUgJ1d81jMUozLtciB+DQYn/G93G7CUjf+6Mx5wt+FeY6MDb4yFs3/Myx41Z1+s\nIAfYMw+WhFCPv6fqkpyuhGis7KNr0CR07W5s6xMJ/QKBgQDjGSx6+kjKwv5ny2TO\nPeoZdu2jnuiAl9IKJLXyDt/LtdovgDdaVmFv7pbsfjfMsfLkClEBohUsZBxHH3Wx\nOQXHBRycrEaQsQvZVBLwRuULNwTNN4arR39gbamFgP+WolC0vhAX+Wr3hft/AlaK\na8ZEfmxyjhQLFW67Cv0igWHSdQKBgQDDvDvouUE0K1JHcpxWbgvK2tyP04hr4cs7\njlc1ikjC0bR/ZbUpDsXNSrm2KNU+FHbSYvC0IDj/DYOUs/0XduGqf141fIHX1iey\nRHRM6WSOvLd77kianSzrk7ncWVrffRirW2QXgRxdDPPonjkT1UBJYcJA8sFc1lQ2\njw8dhdeXPwKBgQCTu0eVRIXf6RNoYAbWp65HHHegzfn/1UOct57otUZelZE2/1iC\n2tiN4Q6rD7yq20Pfltp1joPpmcJPfiaowCiC/E9NmEBbVeEYYrnjNqs/LW5hNXLU\nrzEsgIobv/wEeNi5iz6a6fTsymr9h37Wkx+qZPeVWdmuECY1ZQOg07vYFQKBgQCG\nu7OhZqPzfT6N396tv+JuKGlat4lYeXyj6j8to5qiQCe26hPhx0FxJtbfBQyERyHj\ngCegVe3l4y+H1L2KwVJlQnde6e2W3NtGYsiLiLynZFAJBuUDSN366x0tCHT9EedB\nTQ+A/ma/xoK+xOsVM92kpZ5JhtCDTyV4yNDmyZK1kQKBgEoJwN9VY31a3u27yRpZ\nmHWPMBQcsKst6PJdsp3YeZBfBliqvyJEKE1nP8cRhSftv1AlmKBZU01T+jkMFMWS\n4ClLGcItlJc9CrN3rVxM8rmtRZfxZuLk5mlOhVorgeFDNWxL8QBg4VomlIvZLtMn\nsa0GnPYGFbSwJ6Lzel5J4P1u\n-----END PRIVATE KEY-----\n";
const GOOGLE_SPREADSHEET_ID = "1qLbGODHXXYdyIFR3TA6yKadnTWAmpvj7-6sOpQkKCS4";

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

//removeAllSheets();
populateGoogleSheet();
