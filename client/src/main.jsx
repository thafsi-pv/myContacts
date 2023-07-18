import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import FullscreenComponent from "./components/FullScreen.jsx";
import DrawerHandleContext from "./context/DrawerContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <DrawerHandleContext>
      <React.StrictMode>
        <FullscreenComponent>
          <App />
        </FullscreenComponent>
      </React.StrictMode>
    </DrawerHandleContext>
  </ThemeContextProvider>
);
