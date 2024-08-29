"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function VerifyEmail() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    async function verifyUser() {

        const response = await axios.post("/api/users/verify", { token: token });
        if (response.data.success) {
            toast.success("User Verified Successfully");
            router.push("/login");
        }
        else {
            toast.error(response.data.error);
        }
    }
    useEffect(() => {
        const t = searchParams.get('token') || "";
        setToken(t);
    }, []);
    async function onSubmit() {
        try {
            const res = await axios.post("/api/users/reset", { token: token, password: password });
            if (res.data.success) {
                toast.success(res.data.message);
                router.push("/login");
            }
            else {
                toast.error(res.data.error);
            }
        }
        catch (error: any) {
            toast.error(error.message);
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div>
                <h1>Reset Password</h1>
                <form action={onSubmit} className="form-group">
                    <input type="password" className="form-control" id="password" name="password" placeholder="New Password" required minLength={8} maxLength={16} />
                    <div className="text-center"><input type="submit" value="Submit" className="btn btn-dark" /></div>
                </form>
            </div>

        </div>

    )
}