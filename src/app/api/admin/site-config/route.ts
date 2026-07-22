import dbConnect from "@/libs/mongodb";
import SiteConfig from "@/models/SiteConfig";
import { getSessionFromRequest } from "@/libs/adminAuth";
import { getSiteConfig } from "@/libs/siteConfig";

export async function GET(req: Request) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const config = await getSiteConfig();
  return Response.json(config);
}

export async function PUT(req: Request) {
  if (!(await getSessionFromRequest(req))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    delete body._id;
    delete body.__v;
    await dbConnect();
    const config = await SiteConfig.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });
    return Response.json(config.toObject());
  } catch (err) {
    console.error("[admin/site-config PUT]", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
