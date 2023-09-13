import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { ThemeProvider } from "./context/theme.js";
import { UserProvider } from "./context/user.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <>
          <App />
        </>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
