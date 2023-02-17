import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
export default function VerifiedUserRoute({children}){
    let authCtx = useContext(AuthContext);
    if (!authCtx.user.isVerified) {
        return (<Navigate to="/change-password" state={{from: "/"}}></Navigate>)
    }
    return children
}