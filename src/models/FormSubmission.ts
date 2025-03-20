import mongoose from "mongoose";

const FormSubmissionSchema = new mongoose.Schema(
  {
    formName: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true }, // Store raw JSON
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const FormSubmission =
  mongoose.models.FormSubmission ||
  mongoose.model("FormSubmission", FormSubmissionSchema);

export default FormSubmission;
