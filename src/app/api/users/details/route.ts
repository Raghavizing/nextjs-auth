import { Connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { tokenDataHelper } from "@/helpers/tokenDataHelper"
import User from "@/models/userModel";
Connect();
export async function GET(request: NextRequest) {
    try {
        const userId = await tokenDataHelper(request);
        const user = await User.findOne({ _id: userId });
        if (user) {
            console.log(user);
            return NextResponse.json({ message: "User Found Successfully", user: user });
        }
        else {
            return NextResponse.json({ error: "User Not Found", status: "500" });
        }

    }
    catch (error: any) {
        return NextResponse.json({ error: error.message, status: "500" });
    }
}