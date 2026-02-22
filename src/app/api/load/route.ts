import dbConnect from "@/libs/mongodb";
import Form from "@/models/Form";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    try {
        const reqUrl = new URL(req.url);
        let slug = reqUrl.searchParams.get("slug") || "";

        // Fallback to referer if slug wasn't explicitly provided in query params
        if (!slug) {
            const referer = req.headers.get("referer");
            if (referer) {
                const refererUrl = new URL(referer);
                slug = refererUrl.pathname.replace(/^\/+/, "");
            }
        }

        if (!slug) {
            return Response.json(
                { error: "Could not determine slug from the request path" },
                { status: 400 }
            );
        }

        await dbConnect();
        const form = await Form.findOne({ slug });

        if (!form) {
            return Response.json(
                { error: `Form with slug '${slug}' not found in database` },
                { status: 404 }
            );
        }

        const formObj = form.toObject();
        if (formObj.google) {
            delete formObj.google;
        }

        return Response.json({ data: formObj });
    } catch (error) {
        console.error("Error loading form:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
