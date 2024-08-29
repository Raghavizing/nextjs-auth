import { Connect } from "@/app/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
Connect();
export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        const user = await User.findOne({ email: email });
        if (user) {
            const id = user._id;
            await sendMail(email, "reset", id);
            return NextResponse.json({ success: true, message: "Reset Email sent Successfully" })
        }
        else {
            return NextResponse.json({ error: "User not found", status: 500 });
        }

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}