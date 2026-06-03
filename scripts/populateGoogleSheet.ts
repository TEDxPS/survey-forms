import * as dotenv from "dotenv";
dotenv.config();

import { populateSheetForSlug } from "../src/libs/populateSheet";

const args = process.argv.slice(2);
if (args[0]) {
  populateSheetForSlug(args[0])
    .then((result) => {
      console.log(result.message);
      result.sheets.forEach((s) => console.log(`  · ${s}`));
      process.exit(0);
    })
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
} else {
  console.log(
    "Usage: npm run populate-sheet -- <slug>"
  );
}
