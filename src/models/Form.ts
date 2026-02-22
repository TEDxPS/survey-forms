import mongoose from "mongoose";

const FormSchema = new mongoose.Schema(
    {},
    { strict: false, collection: "forms", timestamps: true }
);

const Form = mongoose.models.Form || mongoose.model("Form", FormSchema);

export default Form;
