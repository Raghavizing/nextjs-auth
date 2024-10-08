import { Connect } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendMail } from "@/helpers/mailer";
Connect();
export async function POST(request:NextRequest){
    try{
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        const user = await User.findOne({email:email})
        if(user){
            return NextResponse.json({error:"User Already Exists", status:"500"});
        }
        else{
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password,salt);
            const newUser = new User({
                username:username,
                email:email,
                password:hashedPassword
            })
            await newUser.save();
            await sendMail(newUser.email,"verify",newUser._id);
            return NextResponse.json({message:"Signup Successful", success:true});
        }
    }
    catch(error:any){
        return NextResponse.json({error:error.message, status:"500"})
    }
}