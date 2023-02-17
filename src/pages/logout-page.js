import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../context/auth-context";

export default function LogoutPage(){
    useEffect(()=>{
        logoutUser()
    }, [])
    return (
        <Navigate to="/auth/login"></Navigate>
    )
}