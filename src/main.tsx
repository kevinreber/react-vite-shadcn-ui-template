import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header.tsx";
import "@/styles/globals.css";
import BuildsSheet from "./pages/BuildsSheet.tsx";
import ConfigsPage from "./pages/ConfigGen.tsx";
import BuildsStatusPage from "./pages/BuildStatus.tsx";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* Toggle react query dev tools below */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>
);
