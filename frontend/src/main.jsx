import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router";
import { AuthProvider } from "./store/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
