import { resendApiKey } from "@/utils/constansts"
import { CustomResponse } from "@/utils/types/response"
import { checkForError, withErrorHandling } from "@/utils/validations";
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(resendApiKey);

export const POST = async (request: Request): Promise<NextResponse<CustomResponse>> => {
    return await withErrorHandling(async () => {
        const emailData = await request.json();
        const { name, email, message } = emailData;

        // Validate input
        checkForError(
            name && name.trim() !== "" || email && email.trim() !== "" || message && message.trim() !== "",
            "send email > POST > validation Error: one of the required fields is empty",
            "response",
            400
        )

        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "ahmedraouane30@gmail.com",
            replyTo: email,
            subject: `New message from ${name}`,
            html: `<p>${message}</p>`
        });

        checkForError(
            !error, 
            `${error && "message" in error && (error as typeof error).message as string || "Failed to send email"}`, 
            "response", 
            error && 'statusCode' in error && (error as typeof error).statusCode as number || 500
        );

        return NextResponse.json({
            success: true,
            message: "Email sent successfully",
            data,
        }, { status: 200 })
    }) as NextResponse<CustomResponse>;
}