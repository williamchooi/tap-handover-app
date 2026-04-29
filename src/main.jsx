import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Amplify } from "aws-amplify";
import config from "./amplify-config";
import "./index.css";
import App from "./App.jsx";

Amplify.configure(config);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);