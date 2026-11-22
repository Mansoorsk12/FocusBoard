import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import "./styles/global.css";
import "./styles/dashboard.css";
import "./styles/components.css";
import "./styles/responsive.css";
import "./styles/carousel.css";
import "./styles/layout.css"
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </React.StrictMode>,
);
