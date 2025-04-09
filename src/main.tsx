import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
