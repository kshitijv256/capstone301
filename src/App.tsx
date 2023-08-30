// import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { useContext } from "react";
import { ThemeContext } from "./context/theme";

function App() {
  const currentTheme = useContext(ThemeContext);
  return (
    <div
      className={`min-h-screen h-full overflow-y-scroll no-scrollbar w-full mx-auto ${
        currentTheme.theme === "dark" ? "dark" : ""
      }`}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
