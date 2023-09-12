import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { ThemeProvider } from "./context/theme.js";
import { UserProvider } from "./context/user.js";
import ErrorBoundary from "./ErrorBoundary.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
