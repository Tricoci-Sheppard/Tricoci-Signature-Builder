import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "./firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const ALLOWED_DOMAIN = "tricociuniversity.edu";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<"loading"|"signedOut"|"denied"|"ok">("loading");

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return setStatus("signedOut");
      const email = user.email || "";
      const domain = email.split("@")[1]?.toLowerCase() || "";
      if (domain === ALLOWED_DOMAIN) {
        setStatus("ok");
      } else {
        await signOut(auth);
        setStatus("denied");
      }
    });
  }, []);

  if (status === "loading") {
    return <div style={wrap}><p>Checking access…</p></div>;
  }

  if (status === "signedOut") {
    return (
      <div style={wrap}>
        <h2 style={h2}>Restricted</h2>
        <p>Sign in with your Tricoci University Google account to continue.</p>
        <button onClick={() => signInWithPopup(auth, googleProvider)} style={btnPrimary}>
          Sign in with Google
        </button>
      </div>
    );
  }

  if (status === "denied") {
    return (
      <div style={wrap}>
        <h2 style={h2}>Access denied</h2>
        <p>This app is restricted to <strong>@{ALLOWED_DOMAIN}</strong> accounts.</p>
      </div>
    );
  }

  return <>{children}</>;
}

const wrap: React.CSSProperties = { padding: "2rem", fontFamily: "Inter, system-ui, sans-serif" };
const h2: React.CSSProperties = { margin: "0 0 0.5rem 0" };
const btnPrimary: React.CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  cursor: "pointer",
  background: "#0b5a46",
  color: "#fff",
  fontWeight: 600
};
