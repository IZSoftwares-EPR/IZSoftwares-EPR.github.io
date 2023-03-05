import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
export default function OnlyDisconnectedRoute({children}){
    let authCtx = useContext(AuthContext);
    if (authCtx.userJWT != null) {
        return (<Navigate to="/" state={{from: "/"}}></Navigate>)
    }
    return children
}