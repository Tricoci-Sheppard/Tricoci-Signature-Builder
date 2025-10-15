import React from "react";
import ReactDOM from "react-dom/client";
import AuthGate from "./AuthGate";
import SignatureBuilder from "./SignatureBuilder";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthGate>
      <SignatureBuilder />
    </AuthGate>
  </React.StrictMode>
);
