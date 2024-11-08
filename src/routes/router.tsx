import Layout from "@/pages/layout";
import PromoAdvicePage from "@/pages/public/features/promo-advice/promo-advice-page";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const Business = lazy(
  () => import("@/pages/public/features/business/business-page")
);
const CreateBusiness = lazy(
  () => import("@/pages/public/features/create-business/create-business-page")
);
const Kitchen = lazy(
  () => import("@/pages/public/features/kitchen/kitchen-page")
);
const Dashboard = lazy(
  () => import("@/pages/public/features/dashboard/dashboard-page")
);
const Products = lazy(
  () => import("@/pages/public/features/products/products-page")
);
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
        path: "business",
        element: <Business />,
      },
      {
        path: "business/create",
        element: <CreateBusiness />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "kitchen",
        element: <Kitchen />,
      },
      {
        path: "promo-advice",
        element: <PromoAdvicePage />,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ],
  },
]);
