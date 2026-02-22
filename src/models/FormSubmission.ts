import mongoose from "mongoose";

export const FormSubmissionSchema = new mongoose.Schema(
  {
    formName: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }, // Store raw JSON
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

export function getFormSubmissionModel(slug: string) {
  // Switch to the dynamic database defined by the form's slug
  const db = mongoose.connection.useDb(slug, { useCache: true });
  return db.models.FormSubmission || db.model("FormSubmission", FormSubmissionSchema);
}

const FormSubmission =
  mongoose.models.FormSubmission ||
  mongoose.model("FormSubmission", FormSubmissionSchema);

export default FormSubmission;
