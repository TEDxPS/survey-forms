import nodemailer from "nodemailer";
import dbConnect from "@/libs/mongodb";
import FormSubmission from "@/models/FormSubmission";

export const dynamic = "force-dynamic";

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
    tls: {
      rejectUnauthorized: false,
    }
  });

  // Send email
  // Create HTML content from submission data
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${process.env.NEXT_PUBLIC_BASE_URL}/tedxps_logo.png" alt="TEDxPetallingStreet Logo" style="max-width: 200px; height: auto;"/>
      </div>
      <h1 style="color: #eb0028;">TEDxPetalingStreet Volunteer Application</h1>
      <p>Thank you for your interest in joining TEDxPetalingStreet Volunteer. Here's a summary of your submission:</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
        ${Object.entries(submission.data)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          const title = 'question_title' in value ? value.question_title : key;

          // Check if answer_text exists and is an array
          if ('answer_text' in value && Array.isArray(value.answer_text)) {
            return `
                  <p><strong>${title}</strong><br/>
                    ${value.answer_text.map(file =>
              'content' in file && 'name' in file
                ? `<a href="${file.content}" target="_blank">${file.name}</a>`
                : ''
            ).filter(Boolean).join(', ')}
                  </p>
                `;
          }

          // Handle regular fields
          if ('question_title' in value && 'answer_text' in value) {
            return `
                  <p><strong>${value.question_title}</strong><br/>
                    ${value.answer_text}
                  </p>
                `;
          }
        }
        return `
              <p><strong>${key}:</strong> ${value}</p>
            `;
      })
      .join('')}
      </div>

      <p style="margin-top: 20px;">We will review your application and get back to you soon.</p>
      <p>Best regards,<br>TEDxPetalingStreet Team</p>
    </div>
  `;

  // Send email with the form data
  await transporter.sendMail({
    from: `"TEDxPetalingStreet" <${process.env.EMAIL_FROM}>`,
    to: submission.data.email.value,
    subject: "Your TEDxPetalingStreet Volunteer Application",
    html: htmlContent,
    text: Object.entries(submission.data)
      .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
      .join('\n'), // Fallback plain text version
  });
  await FormSubmission.updateOne({ _id: submission._id }, { emailSent: true });

  return Response.json({ data: "OK" });
}
