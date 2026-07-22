import { SubmitPlugin } from "../types";

/**
 * Copies a submission row into an additional Sheet tab chosen by the value of
 * one designated answer field. Opt-in per form via `google.sheetRouting` in
 * MongoDB — forms without that config are untouched by this plugin.
 *
 * Example form config:
 * "google": {
 *   "sheetRouting": {
 *     "field": "department",
 *     "map": { "editorial": "Editorial", "logistics": "Logistics" }
 *   }
 * }
 */
const sheetRoutingPlugin: SubmitPlugin = {
  name: "sheet-routing",
  async onSubmit({ doc, form, processedData, sheetData }) {
    const routing = form.google?.sheetRouting as
      | { field?: string; map?: Record<string, string> }
      | undefined;
    if (!routing?.field || !routing.map) return;

    const answer = processedData[routing.field];
    const sheetName = routing.map[String(answer)];
    if (!sheetName) return;

    const targetSheet = doc.sheetsByTitle[sheetName];
    if (!targetSheet) {
      console.warn(`sheet-routing: sheet "${sheetName}" not found, skipping`);
      return;
    }

    await targetSheet.addRow(sheetData);
  },
};

export default sheetRoutingPlugin;
