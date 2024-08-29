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
    useEffect(() => {
        if (token.length > 0) {
            verifyUser();
        }
    }, [token]);
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                User Verification
            </div>
        </div>

    )
}