"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
export default function ProfilePage(props: any) {
    const router = useRouter();
    const onLogout = async function () {
        try {
            const res = await axios.get("/api/users/logout");
            if (res.data.success) {
                toast.success("logged out successfully");
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
    console.log(props);
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1>Profile Page</h1>
                <p>{props.params.id}</p>
                <button className="btn btn-dark" onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}