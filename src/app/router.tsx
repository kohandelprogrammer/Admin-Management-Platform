import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProductPage from "../components/features/products/components/ProductPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <div>Dashboard</div>,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/users",
        element: <div>Users</div>,
      },
      {
        path: "/tickets",
        element: <div>Tickets</div>,
      },
    ],
  },
]);
