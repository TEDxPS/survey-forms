import { getSessionFromRequest } from "@/libs/adminAuth";
import { populateSheetForSlug } from "@/libs/populateSheet";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await populateSheetForSlug(params.slug);
    return Response.json(result);
  } catch (err: any) {
    return Response.json({ success: false, error: err.message }, { status: 400 });
  }
}
