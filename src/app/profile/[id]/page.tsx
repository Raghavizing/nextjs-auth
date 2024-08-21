import React from "react";
export default function profilePage(props: any){
    console.log(props);
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
            <h1>Profile Page</h1>
            <p>{props.params.id}</p>
            </div>
        </div>
    )
}