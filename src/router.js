
import { createBrowserRouter } from "react-router-dom"
import OnlyDisconnectedRoute from "./hoc/OnlyDisconnectedRoute";
import ProtectedRoute from "./hoc/ProtectedRoute";
import OnlyAdminRoute from "./hoc/OnlyAdminRoute";
import ActivateAccount from "./pages/activate-account";
import ChangePasswordPage from "./pages/change-password-page";
import EditQuestionsPage from "./pages/edit-questions-page";
import ErrorPage from "./pages/error-page";
// import LoginPage from "./pages/login-page"
import LogoutPage from "./pages/logout-page";
import QuestionsPage from "./pages/questions-page";
import LoginPage2 from "./pages/login-page2";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <ProtectedRoute><QuestionsPage /></ProtectedRoute>,
            errorElement: <ErrorPage />,
        },
        {
            path: "/auth/login",
            element: <OnlyDisconnectedRoute><LoginPage2 /></OnlyDisconnectedRoute>
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
            path: "/questions-admin",
            element: <OnlyAdminRoute><EditQuestionsPage /></OnlyAdminRoute>
        },
        {
            path: "/logout",
            element: <LogoutPage/>
        }

    ]
)
export default router;