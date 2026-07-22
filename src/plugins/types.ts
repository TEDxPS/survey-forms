import { GoogleSpreadsheet } from "google-spreadsheet";
import { IForm } from "@/types/form";

export interface SubmitPluginContext {
  /** Authenticated, loaded spreadsheet for this form's submission. */
  doc: GoogleSpreadsheet;
  /** The form document this submission belongs to. */
  form: IForm;
  /** Answers keyed by question name, flattened to primitive/string values. */
  processedData: Record<string, unknown>;
  /** The row already written to the master sheet (headers already resolved). */
  sheetData: Record<string, string>;
}

export interface SubmitPlugin {
  name: string;
  onSubmit(ctx: SubmitPluginContext): Promise<void>;
}
