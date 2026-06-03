import { readFileSync } from "fs";
import { join } from "path";
import { getSessionFromRequest } from "@/libs/adminAuth";

export async function GET(req: Request) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const filePath = join(process.cwd(), "docs", "populate-google-sheet.md");
    const content = readFileSync(filePath, "utf-8");
    return Response.json({ content });
  } catch {
    return Response.json({ error: "Documentation file not found" }, { status: 404 });
  }
}
