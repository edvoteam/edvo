"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SUBJECTS = [
  "Chemistry",
  "Mathematical Methods",
  "Specialist Mathematics",
  "Physics",
  "Biology",
  "English Literary Studies",
  "English",
  "Modern History",
  "Economics",
  "Psychology",
  "Legal Studies",
];

const YEAR_LEVELS = ["Year 10", "Year 11", "Year 12"];

export default function LandingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!yearLevel) { setError("Please select your year level."); return; }
      if (selectedSubjects.length === 0) { setError("Please select at least one subject."); return; }
    }

    setLoading(true);

    const endpoint = mode === "signup" ? "/api/signup" : "/api/login";
    const body = mode === "signup"
      ? JSON.stringify({ name, email, password, yearLevel, subjects: selectedSubjects })
      : JSON.stringify({ email, password });

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const data = await res.json();

      if (!res.ok) { setError(data.error || "Something went wrong"); return; }

      if (mode === "signup") {
        localStorage.setItem("edvo_user_name", name);
        localStorage.setItem("edvo_year_level", yearLevel);
        localStorage.setItem("edvo_subjects", JSON.stringify(selectedSubjects));
      } else {
        localStorage.setItem("edvo_user_name", data.user?.name || email);
        localStorage.setItem("edvo_year_level", data.user?.yearLevel || "");
        localStorage.setItem("edvo_subjects", JSON.stringify(data.user?.subjects || []));
      }

      router.push("/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    fontSize: 14,
    borderRadius: 10,
    border: "1.5px solid #a0c8d8",
    outline: "none",
    color: "#071e22",
    backgroundColor: "#ffffff",
    fontFamily: "system-ui, sans-serif",
    boxSizing: "border-box",
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
        backgroundColor: "#007090",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px",
      }}>

        {/* Top left — logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/logo.png"
            alt="edvo"
            style={{ width: 160, height: 160, objectFit: "contain" }}
          />
        </div>

        {/* Centre — hero copy */}
        <div>
          <div style={{
            display: "inline-block",
            backgroundColor: "rgba(245,197,24,0.15)",
            color: "#f5c518",
            fontSize: 11,
            fontWeight: 600,
            padding: "4px 12px",
            borderRadius: 20,
            marginBottom: 16,
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
            marginBottom: 16,
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
            marginBottom: 28,
          }}>
            Your AI-powered study partner.<br />
            Aligned to the SACE curriculum and available 24/7.
          </p>

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

        {/* Bottom — copyright */}
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
        padding: "40px 56px",
        overflowY: "auto",
      }}>
        <div style={{ width: "100%", maxWidth: 380 }}>

          {/* Toggle */}
          <div style={{
            display: "flex",
            backgroundColor: "#f0f7f9",
            borderRadius: 12,
            padding: 4,
            marginBottom: 28,
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
                  color: mode === m ? "#007090" : "#5a7a82",
                  boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {m === "signup" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          <h2 style={{
            fontSize: 24,
            fontWeight: 600,
            color: "#071e22",
            marginBottom: 4,
            fontFamily: "Georgia, serif",
          }}>
            {mode === "signup" ? "Get started free" : "Welcome back"}
          </h2>
          <p style={{ fontSize: 13, color: "#5a7a82", marginBottom: 20 }}>
            {mode === "signup" ? "No credit card required." : "Sign in to continue to edvo."}
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "#007090")}
                onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")}
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007090")}
              onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "#007090")}
              onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")}
            />

            {mode === "signup" && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a3a40", marginBottom: 8 }}>
                  Year level
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {YEAR_LEVELS.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setYearLevel(y)}
                      style={{
                        flex: 1,
                        padding: "9px 0",
                        borderRadius: 9,
                        border: "1.5px solid",
                        borderColor: yearLevel === y ? "#007090" : "#a0c8d8",
                        backgroundColor: yearLevel === y ? "#e0f0f5" : "#ffffff",
                        color: yearLevel === y ? "#007090" : "#5a7a82",
                        fontSize: 13,
                        fontWeight: yearLevel === y ? 600 : 400,
                        cursor: "pointer",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {mode === "signup" && (
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#1a3a40", marginBottom: 8 }}>
                  Your subjects{" "}
                  <span style={{ color: "#5a7a82", fontWeight: 400 }}>(select all that apply)</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {SUBJECTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSubject(s)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 20,
                        border: "1.5px solid",
                        borderColor: selectedSubjects.includes(s) ? "#007090" : "#a0c8d8",
                        backgroundColor: selectedSubjects.includes(s) ? "#e0f0f5" : "#ffffff",
                        color: selectedSubjects.includes(s) ? "#007090" : "#5a7a82",
                        fontSize: 12,
                        fontWeight: selectedSubjects.includes(s) ? 600 : 400,
                        cursor: "pointer",
                        fontFamily: "system-ui, sans-serif",
                        transition: "all 0.15s",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                backgroundColor: loading ? "#5a7a82" : "#007090",
                color: "#ffffff",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 4,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {loading ? "Please wait..." : mode === "signup" ? "Create account →" : "Sign in →"}
            </button>
          </form>

          <div style={{ marginTop: 16, textAlign: "center" }}>
            {mode === "login" && (
              <p style={{ fontSize: 12, color: "#5a7a82" }}>
                <span
                  style={{ color: "#007090", cursor: "pointer" }}
                  onClick={() => router.push("/forgot-password")}
                >
                  Forgot your password?
                </span>
              </p>
            )}
            {mode === "signup" && (
              <p style={{ fontSize: 12, color: "#5a7a82", lineHeight: 1.6 }}>
                By creating an account you agree to our{" "}
                <span style={{ color: "#007090", cursor: "pointer" }}>Terms</span>
                {" "}and{" "}
                <span style={{ color: "#007090", cursor: "pointer" }}>Privacy Policy</span>.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}