import { Connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
Connect();
export async function POST(request: NextRequest) {
    try {
        const {token} = await request.json();
        console.log(token);
        const user = await User.findOne({ verificationToken: token })
        if(user){
        if (user.isVerified) {
            return NextResponse.json({ error: "User Already Verified", status: 400 });
        }
        else {
            if (user.verificationTokenExpiry > Date.now()) {
                user.isVerified = true;
                user.verificationToken = "";
                user.verificationTokenExpiry = "";
                await user.save();
                console.log(user);
                return NextResponse.json({ success: true, status: 200 });
            }
            else {
                console.log(user.verificationTokenExpiry);
                console.log(Date.now());
                return NextResponse.json({ error: "Token Has Expired", status: 400 });
            }
        }
    }
    else{
        return NextResponse.json({ error: "User doesnt exist / User already verified", status: 400 });
    }
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}