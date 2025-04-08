import { createRoot } from "react-dom/client";
import "./styles/main.scss";
import App from "./App";
import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
