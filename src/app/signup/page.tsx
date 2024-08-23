"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router, { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    useEffect(() => {
        if (user.username && user.email && user.password) {
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
    const onSignup = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            console.log(res);
            toast.success("Signup successful");
            router.push("/login");
        }
        catch (error: any) {
            toast.error("Some error has occurred");
            console.log(error);
        }
        finally{
            setLoading(false);
        }

    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="col-lg-6 col-md-10 col-12 mx-auto">
                <h1 className="text-center my-2">{loading?"Signing Up":"Sign Up"}</h1>
                <form className="form-group w-75 mx-auto" action={onSignup} hidden={loading}>
                    <div className="my-3">

                        <input type="text" name="username" id="username" className="form-control" value={user.username} required onChange={handleChange} minLength={4} maxLength={16} placeholder="Username" />
                    </div>
                    <div className="my-3">
                        <input type="email" name="email" id="email" className="form-control" value={user.email} required onChange={handleChange} placeholder="Email" />
                    </div>
                    <div className="my-3">

                        <input type="password" name="password" id="password" className="form-control" value={user.password} required onChange={handleChange} minLength={8} maxLength={16} placeholder="Password" />
                    </div>
                    <div className="text-center col-6 mx-auto">
                        <input type="submit" value="Submit" disabled={disableButton} className="btn btn-primary btn-lg my-2" />
                    </div>
                    <div className="text-center ">
                        <Link href="/login">login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
