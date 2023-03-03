import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
export default function ProtectedRoute({children}){
    let authCtx = useContext(AuthContext);
    if (authCtx.userJWT == null) {
        return (<Navigate to="/auth/login" state={{from: "/"}} />)
    }
    return children
}