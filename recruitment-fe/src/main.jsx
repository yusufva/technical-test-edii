import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/login";
import RegisterPage from "./Pages/register";
import HomePage from "./Pages/homepage";
import EditBiodata from "./Pages/editBiodata";
import DashboardAdmin from "./Pages/dashboardAdmin";
import AdminBiodata from "./Pages/adminBiodata";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "edit-biodata",
        element: <EditBiodata />,
    },
    {
        path: "/admin",
        element: <DashboardAdmin />,
    },
    {
        path: "/biodata",
        element: <AdminBiodata />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
