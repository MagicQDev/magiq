import Layout from "@/pages/layout";
import CompanyPage from "@/pages/public/features/business";
import Dashboard from "@/pages/public/features/dashboard";
import Kitchen from "@/pages/public/features/kitchen";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <div>404</div>,
    children: [
      {
        path: "",
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "business/create",
        element: <CompanyPage />,
      },
      {
        path: "kitchen",
        element: <Kitchen />,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ],
  },
]);
