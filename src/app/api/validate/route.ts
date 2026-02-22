import dbConnect from "@/libs/mongodb";
import { getFormSubmissionModel } from "@/models/FormSubmission";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const slug = searchParams.get('slug');

    if (!email) {
        return Response.json({
            success: false,
            error: "Email parameter is required"
        }, { status: 400 });
    }

    try {
        await dbConnect();
        const targetDbSlug = slug || "default_submissions";
        const DynamicFormSubmission = getFormSubmissionModel(targetDbSlug);

        const query: any = { 'data.email.value': email };
        if (slug) {
            query.formName = slug;
        }
        const existedForm = await DynamicFormSubmission.findOne(query);

        return Response.json({
            success: true,
            isUnique: existedForm === null,
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : '';
        console.error("Email uniqueness check failed:", {
            email,
            error: errorMessage,
            stack: errorStack,
            timestamp: new Date().toISOString()
        });
        return Response.json(
            {
                success: false,
                error: "Failed to check unique email",
            },
            { status: 500 }
        );
    }
}
