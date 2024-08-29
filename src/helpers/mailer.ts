import User from "@/models/userModel"
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
import { NextResponse } from "next/server";
import { Connect } from "@/app/dbConfig/dbConfig";
import { useState } from "react";
Connect();
export async function sendMail(email: any, emailType: any, userId: any) {
    try {
        const hashToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "verify") {
            try {
                const newUser = await User.findByIdAndUpdate(userId, {
                    verificationToken: hashToken,
                    verificationTokenExpiry: (Date.now() + (24 * 60 * 60 * 1000)) // 1 Day
                }, { runValidators: true, new: true });
            }
            catch (error: any) {
                NextResponse.json({ error: error.message, status: 500 });
            }
        }
        else if (emailType === "reset") {
            try {
                const newUser = await User.findByIdAndUpdate(userId, {
                    forgotPasswordToken: hashToken,
                    forgotPasswordTokenExpiry: (Date.now() + (24 * 60 * 60 * 1000)) // 1 Day
                }, { runValidators: true, new: true });
            }
            catch (error: any) {
                NextResponse.json({ error: error.message, status: 500 });
            }
        }
        const transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "6e52eb20dba0a7",
                pass: "b11a1cc9fac720"
            }
        });
        const mailOptions = {
            from: "raghavchaturvedi77@gmail.com",
            to: "raghavchaturvedi77@gmail.com",
            subject: (emailType === "verify") ? "Verify Account" : "Reset Password",
            html: `<p> <a href = "${process.env.domain}/${emailType}?token=${hashToken}">Click here</a> to ${(emailType === "verify") ? "Verify Account" : "Reset Password"} </p> `

        }
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log(mailResponse)
    }
    catch (error: any) {
        console.log(error.message);
    }
}
