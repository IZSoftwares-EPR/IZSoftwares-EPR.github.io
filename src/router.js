
import { createBrowserRouter } from "react-router-dom"
import OnlyDisconnectedRoute from "./hoc/OnlyDisconnectedRoute";
import ProtectedRoute from "./hoc/ProtectedRoute";
import ActivateAccount from "./pages/activate-account";
import ChangePasswordPage from "./pages/change-password-page";
import ErrorPage from "./pages/error-page";
import LoginPage from "./pages/login-page"
import LogoutPage from "./pages/logout-page";
import QuestionsPage from "./pages/questions-page";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <ProtectedRoute><QuestionsPage /></ProtectedRoute>,
            errorElement: <ErrorPage />,
        },
        {
            path: "/auth/login",
            element: <OnlyDisconnectedRoute><LoginPage /></OnlyDisconnectedRoute>
        },
        {
            path: "/auth/login/activate-account/:email",

            element: <OnlyDisconnectedRoute><ActivateAccount/></OnlyDisconnectedRoute>
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