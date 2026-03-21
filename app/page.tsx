"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = mode === "signup" ? "/api/signup" : "/api/login";
    const body =
      mode === "signup"
        ? JSON.stringify({ name, email, password })
        : JSON.stringify({ email, password });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }
      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
      fontFamily: "system-ui, sans-serif",
    }}>

      {/* ── LEFT — Brand panel ── */}
      <div style={{
        flex: 1,
        backgroundColor: "#0a5e6d",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px",
      }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/logo.png"
            alt="edvo"
            style={{
              width: 160,
              height: 160,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Hero copy */}
        <div>
          <div style={{
            display: "inline-block",
            backgroundColor: "rgba(245,197,24,0.15)",
            color: "#f5c518",
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: 20,
            marginBottom: 20,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}>
            Built for SACE · Year 11 &amp; 12
          </div>

          <h1 style={{
            fontSize: 44,
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#ffffff",
            marginBottom: 20,
            fontFamily: "Georgia, serif",
          }}>
            Study smarter.<br />
            <em style={{ color: "#f5c518" }}>Score higher.</em>
          </h1>

          <p style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 340,
            marginBottom: 32,
          }}>
            Your AI-powered study partner — aligned to the SACE
            curriculum and available 24/7.
          </p>

          {/* Feature pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["AI Tutor", "Smart Notes", "Practice Quizzes"].map((f) => (
              <span key={f} style={{
                fontSize: 12,
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          © 2025 edvo · Built for South Australian students
        </p>
      </div>

      {/* ── RIGHT — Auth panel ── */}
      <div style={{
        flex: 1,
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 56px",
      }}>
        <div style={{ width: "100%", maxWidth: 360 }}>

          {/* Toggle */}
          <div style={{
            display: "flex",
            backgroundColor: "#f2f8f9",
            borderRadius: 12,
            padding: 4,
            marginBottom: 32,
          }}>
            {(["signup", "login"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor: mode === m ? "#ffffff" : "transparent",
                  color: mode === m ? "#0d7a8c" : "#5a7a82",
                  boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {m === "signup" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <h2 style={{
            fontSize: 26,
            fontWeight: 600,
            color: "#071e22",
            marginBottom: 6,
            fontFamily: "Georgia, serif",
          }}>
            {mode === "signup" ? "Get started free" : "Welcome back"}
          </h2>
          <p style={{ fontSize: 13, color: "#5a7a82", marginBottom: 24 }}>
            {mode === "signup"
              ? "No credit card required."
              : "Sign in to continue to edvo."}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: 14,
                  borderRadius: 10,
                  border: "1.5px solid #b8d4d8",
                  outline: "none",
                  color: "#071e22",
                  backgroundColor: "#ffffff",
                  fontFamily: "system-ui, sans-serif",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0d7a8c")}
                onBlur={(e) => (e.target.style.borderColor = "#b8d4d8")}
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: 14,
                borderRadius: 10,
                border: "1.5px solid #b8d4d8",
                outline: "none",
                color: "#071e22",
                backgroundColor: "#ffffff",
                fontFamily: "system-ui, sans-serif",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0d7a8c")}
              onBlur={(e) => (e.target.style.borderColor = "#b8d4d8")}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: 14,
                borderRadius: 10,
                border: "1.5px solid #b8d4d8",
                outline: "none",
                color: "#071e22",
                backgroundColor: "#ffffff",
                fontFamily: "system-ui, sans-serif",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0d7a8c")}
              onBlur={(e) => (e.target.style.borderColor = "#b8d4d8")}
            />

            {error && (
              <div style={{
                fontSize: 12,
                color: "#c0392b",
                backgroundColor: "#faeae8",
                padding: "10px 14px",
                borderRadius: 8,
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "13px",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 10,
                border: "none",
                backgroundColor: loading ? "#5a7a82" : "#0d7a8c",
                color: "#ffffff",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 4,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                  ? "Create account →"
                  : "Sign in →"}
            </button>
          </form>

          {/* Below form links */}
          <div style={{ marginTop: 20, textAlign: "center" }}>
            {mode === "login" && (
              <p style={{ fontSize: 12, color: "#5a7a82" }}>
                <span
                  style={{ color: "#0d7a8c", cursor: "pointer" }}
                  onClick={() => router.push("/forgot-password")}
                >
                  Forgot your password?
                </span>
              </p>
            )}
            {mode === "signup" && (
              <p style={{ fontSize: 12, color: "#5a7a82", lineHeight: 1.6 }}>
                By creating an account you agree to our{" "}
                <span style={{ color: "#0d7a8c", cursor: "pointer" }}>Terms</span>
                {" "}and{" "}
                <span style={{ color: "#0d7a8c", cursor: "pointer" }}>Privacy Policy</span>.
              </p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}