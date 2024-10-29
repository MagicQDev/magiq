import Layout from "@/pages/layout";
import CompanyPage from "@/pages/public/features/company";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <div>404</div>,
    children: [
      {
        path: "company",
        element: <CompanyPage />,
      },
      {
        path: "products",
        element: <div>Products</div>,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ],
  },
]);
