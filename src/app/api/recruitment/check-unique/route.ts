import dbConnect from "@/libs/mongodb";
import FormSubmission from "@/models/FormSubmission";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
        return Response.json({
            success: false,
            error: "Email parameter is required"
        }, { status: 400 });
    }

    try {
        await dbConnect();
        const existedForm = await FormSubmission.findOne({ 'data.email': email });

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
