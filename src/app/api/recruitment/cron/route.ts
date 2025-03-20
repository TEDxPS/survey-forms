import nodemailer from "nodemailer";
import dbConnect from "@/libs/mongodb";
import FormSubmission from "@/models/FormSubmission";

export async function GET() {
  return Response.json({ data: "Wrong Method" });
}

export async function POST() {
  // Save to database first
  await dbConnect();
  const submission = await FormSubmission.findOne({ emailSent: false }).sort({
    createdAt: 1,
  });

  if (!submission) {
    return Response.json({ data: "Nothing in queue" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Send email
  await transporter.sendMail({
    from: `"TEDx Petalling Street" <${process.env.EMAIL_FROM}>`,
    to: submission.data.email,
    subject: "We have received your submission",
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  await FormSubmission.updateOne({ _id: submission._id }, { emailSent: true });

  return Response.json({ data: "OK" });
}
