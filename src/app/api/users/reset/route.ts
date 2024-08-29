import { Connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
Connect();
export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();
        const user = await User.findOne({ forgotPasswordToken: token });
        if (user) {
            if (user.forgotPasswordTokenExpiry > Date.now()) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                user.password = hashedPassword;
                await user.save();
                return NextResponse.json({ success: true, message: "Password updated successfully", status: 200 });
            }
            else {
                return NextResponse.json({ error: "Token has expired", status: 500 });
            }
        }
        else {
            return NextResponse.json({ error: "Invalid Token", status: 500 });
        }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 });
    }
}