import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header.tsx";
import "@/styles/globals.css";
import BuildsSheet from "./pages/BuildsSheet.tsx";
import ConfigsPage from "./pages/ConfigGen.tsx";
import BuildsStatusPage from "./pages/BuildStatus.tsx"
import { Toaster } from "@/components/ui/toaster";

// Whenever we add a new Route, we need to add it here
// "element" is the component that will be rendered when the path is matched
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/builds",
    element: <BuildsSheet />,
  },
  {
    path: "/configgen",
    element: <ConfigsPage />,
  },
  {
    path: "/buildstatus",
    element: <BuildsStatusPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Header />
    {/* <App /> */}
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
