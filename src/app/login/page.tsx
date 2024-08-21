"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        if (user.username && user.password) {
            setDisableButton(false);
        }
        else {
            setDisableButton(true);
        }
    }, [user])
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
    const onLogin = async () => {
        try {
            const res = await axios.post("/api/users/login", user);
            console.log(res);
            router.push("/profile")
        }
        catch (error: any) {
            console.log(error);
        }

    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="w-50 mx-auto">
                <h1 className="text-center my-2">Login</h1>
                <form className="form-group px-5" action={onLogin}>
                    <div className="my-2">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" id="username" className="form-control" value={user.username} required onChange={handleChange} minLength={4} maxLength={16} />
                    </div>
                    <div className="my-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control" value={user.password} required onChange={handleChange} minLength={8} maxLength={16} />
                    </div>
                    <div className="text-center">
                        <input type="submit" value="Login" disabled={disableButton} className="btn btn-primary btn-lg w-25 my-2" />
                    </div>
                    <div className="text-center">
                        <Link href="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
