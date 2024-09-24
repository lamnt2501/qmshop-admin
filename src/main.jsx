import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import "./index.css";
import { StompSessionProvider } from "react-stomp-hooks";
import { VITE_WEBSOCKET_URL } from "./configs/envConfig.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StompSessionProvider
      brokerURL={VITE_WEBSOCKET_URL}
      onConnect={() => {
        console.log("WebSocket Connected!");
      }}
    >
      <App />
    </StompSessionProvider>
  </React.StrictMode>,
);
