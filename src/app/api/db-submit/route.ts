import dbConnect from "@/libs/mongodb";
import FormSubmission from "@/models/FormSubmission";
import { readFileSync } from 'fs';
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function GET() {
  return Response.json({ data: "Wrong Method" });
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    // 连接数据库
    await dbConnect();
    
    // 根据电子邮件查找提交记录
    const submission = await FormSubmission.findOne({ 
      "data.email.value": email 
    });

    if (!submission) {
      return Response.json({ error: "No submission found with this email" }, { status: 404 });
    }

    // 提取数据
    const data = submission.data;
    
    // 处理数据以适应 Google Sheets
    const processedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        typeof value === 'object' && value !== null
          ? Array.isArray(value)
            ? value.map(v => v.content || v.value || v).join(String.fromCharCode(10))
            : 'value' in value
              ? value.value
              : String(value)
          : String(value)
      ])
    );

    // 准备 Google Sheets 数据
    const sheetData = Object.fromEntries(
      Object.entries(processedData).map(([key, value]) => [
        key,
        Array.isArray(value)
          ? value.map(v => typeof v === 'object' && v !== null ? v.content : v).join(",")
          : String(value)
      ])
    ) as { [key: string]: string };

    // 添加提交 ID 和时间戳
    const now = new Date();
    const malaysiaTime = new Date(now.getTime() + (8 * 60 * 60 * 1000)); // 转换为 GMT+8
    
    sheetData["Submission ID"] = now.getTime().toString();
    sheetData["Timestamp"] = malaysiaTime.toISOString().replace('T', ' ').slice(0, 19);

    // 初始化 Google Sheets
    const credentials = JSON.parse(
      readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS as string, 'utf-8')
    );
    const serviceAccountAuth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID as string,
      serviceAccountAuth
    );
    await doc.loadInfo();

    // 添加到主表
    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow(sheetData);

    // 添加到团队表
    if (data["first_choice"] && data["first_choice"]["value"]) {
      const teamSheet = doc.sheetsByTitle[data["first_choice"]["value"]];
      if (teamSheet) {
        await teamSheet.addRow(sheetData);
      }
    }

    return Response.json({ data: "OK", email: email });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}