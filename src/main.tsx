import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryProvider } from "./lib/providers/query-provider";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  </StrictMode>
);
