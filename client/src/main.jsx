import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import FullscreenComponent from "./components/FullScreen.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <React.StrictMode>
      <FullscreenComponent>
        <App />
      </FullscreenComponent>
    </React.StrictMode>
  </ThemeContextProvider>
);
