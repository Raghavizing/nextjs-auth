"use client"
import { sendMail } from "@/helpers/mailer";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
export default function ResetPassword() {
    const [email, setEmail] = useState();
    const router  = useRouter();
    function handleChange(event: any) {
        setEmail(event.target.value);
    }
    async function onSubmit(){
        try{
            const res = await axios.post("/api/users/forgotPassword",{email:email});
            if(res.data.success){
                toast.success("Reset password link sent to your email");
                router.push("/login");
            }
            else{
                toast.error(res.data.error);
            }
        }
        catch(error:any){
            toast.error(error.message);
        }
    }
    return (
        <div className=" d-flex align-items-center justify-content-center vh-100">
            <div>
                <h1>
                    Reset Password
                </h1>
                <form action={onSubmit}className="form-group">
                    <input type="email" name="email" id="email" className="form-control my-2" placeholder="Enter Your Email Id" onChange={handleChange} value={email} required />
                    <div className="text-center my-2"><input type="submit" className="btn btn-dark" value="Submit" /></div>
                </form>
            </div>
        </div>
    )
}