"use client";
import axios from "axios";
import Router, { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
export default function ProfilePage() {
    const router = useRouter()
    useEffect(() => {
        getProfile();
    },);

    async function getProfile() {
        try {
            const res = await axios.get("/api/users/details");
            const id = res.data.user._id;
            if (id) {
                router.push(`/profile/${id}`);
            }
            else {
                console.log("Some error has occurred");
            }
        }
        catch (error: any) {
            console.log(error.message);
        }
    }
    const onLogout = async () => {
        try {
            const res = await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        }
        catch (error: any) {
            toast.success("Some error has occurred");
            console.log(error.message);
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1>Profile Page</h1>
                <p>UserName</p>
                <button className="btn btn-primary" onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}