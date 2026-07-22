import { SubmitPlugin } from "./types";
import sheetRouting from "./sheet-routing";

/**
 * Plugins run, in order, after the master sheet row is written in
 * /api/submit. Comment a plugin out to disable it for this deployment —
 * per-form behavior still comes from each form's MongoDB config.
 */
export const enabledPlugins: SubmitPlugin[] = [sheetRouting];
