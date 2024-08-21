"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/navigation";
export default function LoginPage() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    function handleChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;
        setUser((prev) => {
            return (
                {
                    ...prev,
                    [name]: value
                }
            )
        })
    }
    function submit(event: any) {
        event.preventDefault();
        alert("Hello");
    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="w-50 mx-auto">
                <h1 className="text-center my-2">Login</h1>
                <form className="form-group px-5" action={submit}>
                    <div className="my-2">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" id="username" className="form-control" value={user.username} required onChange={handleChange} />
                    </div>
                    <div className="my-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={user.password} required onChange={handleChange} />
                    </div>
                    <div className="text-center">
                        <input type="submit" value="Login" className="btn btn-primary btn-lg w-25 my-2" />
                    </div>
                    <div className="text-center">
                        <Link href="/signup">Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}