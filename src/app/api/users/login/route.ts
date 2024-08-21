import { Connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
Connect();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, password } = reqBody;
        const user = await User.findOne({ username: username });
        if (user) {
            const validPassword = await bcryptjs.compare(password, user.password);
            if (validPassword) {
                const tokenData = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
                const token = await jsonwebtoken.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
                const res = NextResponse.json({ message: "Login Successful", success: true });
                res.cookies.set("token", token, { httpOnly: true });
                return res;
            }
            else {
                return NextResponse.json({ error: "Wrong Password", status: 500 });
            }

        }
        else {
            return NextResponse.json({ error: "User not found", status: "500" });
        }

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: "500" });
    }
}