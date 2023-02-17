
import { createBrowserRouter } from "react-router-dom"
import ProtectedRoute from "./hoc/ProtectedRoute";
import VerifiedUserRoute from "./hoc/VerifiedUserRoute";
import ChangePasswordPage from "./pages/change-password-page";
import ErrorPage from "./pages/error-page";
import LoginPage from "./pages/login-page"
import LogoutPage from "./pages/logout-page";
import QuestionsPage from "./pages/questions-page";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <ProtectedRoute><VerifiedUserRoute><QuestionsPage /></VerifiedUserRoute></ProtectedRoute>,
            errorElement: <ErrorPage />,
        },
        {
            path: "/auth/login",
            element: <LoginPage />
        },
        {
            path: "/change-password",
            element: <ProtectedRoute><ChangePasswordPage /></ProtectedRoute>
        },
        {
            path: "/logout",
            element: <LogoutPage/>
        }

    ]
)
export default router;