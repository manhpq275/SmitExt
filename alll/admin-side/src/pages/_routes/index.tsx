import { adminRoutes } from "./admin-route";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const appRouter = adminRoutes;

const router = createBrowserRouter(appRouter);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
