"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ── LEFT — Brand panel ── */}
      <div
        className="flex-1 flex flex-col justify-between p-10 md:p-14"
        style={{ backgroundColor: "#0a5e6d" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="edvo logo"
            width={36}
            height={36}
            className="rounded-lg"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
          <span
            className="text-2xl font-semibold"
            style={{ fontFamily: "Georgia, serif", color: "#f5c518" }}
          >
            edvo
          </span>
        </div>

        {/* Hero copy */}
        <div className="py-12">
          <div
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-widest uppercase"
            style={{ backgroundColor: "rgba(245,197,24,0.15)", color: "#f5c518" }}
          >
            Built for SACE · Year 11 &amp; 12
          </div>

          <h1
            className="text-4xl md:text-5xl font-semibold leading-tight mb-5"
            style={{ fontFamily: "Georgia, serif", color: "#ffffff" }}
          >
            Study smarter.<br />
            <em style={{ color: "#f5c518" }}>Score higher.</em>
          </h1>

          <p className="text-base leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
            Your AI-powered study partner — aligned to the SACE curriculum
            and available 24/7.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {["AI Tutor", "Smart Notes", "Practice Quizzes"].map((f) => (
              <span
                key={f}
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          © 2025 edvo · Built for South Australian students
        </p>
      </div>

      {/* ── RIGHT — Auth panel ── */}
      <div
        className="flex-1 flex items-center justify-center p-8 md:p-14"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="w-full max-w-sm">

          {/* Toggle tabs */}
          <div
            className="flex rounded-xl p-1 mb-8"
            style={{ backgroundColor: "#f2f8f9" }}
          >
            {(["signup", "login"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className="flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: mode === m ? "#ffffff" : "transparent",
                  color: mode === m ? "#0d7a8c" : "#5a7a82",
                  boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {m === "signup" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          {/* Heading */}
          <h2
            className="text-2xl font-semibold mb-1"
            style={{ fontFamily: "Georgia, serif", color: "#071e22" }}
          >
            {mode === "signup" ? "Get started free" : "Welcome back"}
          </h2>
          <p className="text-sm mb-6" style={{ color: "#5a7a82" }}>
            {mode === "signup"
              ? "No credit card required."
              : "Sign in to continue to edvo."}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Full name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  border: "1.5px solid #b8d4d8",
                  color: "#071e22",
                  backgroundColor: "#ffffff",
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
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                border: "1.5px solid #b8d4d8",
                color: "#071e22",
                backgroundColor: "#ffffff",
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
              className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                border: "1.5px solid #b8d4d8",
                color: "#071e22",
                backgroundColor: "#ffffff",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#0d7a8c")}
              onBlur={(e) => (e.target.style.borderColor = "#b8d4d8")}
            />

            {/* Error message */}
            {error && (
              <div
                className="text-xs px-3 py-2.5 rounded-lg"
                style={{ backgroundColor: "#faeae8", color: "#c0392b" }}
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold mt-1 transition-all duration-200"
              style={{
                backgroundColor: loading ? "#5a7a82" : "#0d7a8c",
                color: "#ffffff",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                ? "Create account →"
                : "Sign in →"}
            </button>
          </form>

          {/* Below form */}
          <div className="mt-5 text-center">
            {mode === "login" && (
              <p className="text-xs" style={{ color: "#5a7a82" }}>
                <span
                  className="cursor-pointer hover:underline"
                  style={{ color: "#0d7a8c" }}
                >
                  Forgot your password?
                </span>
              </p>
            )}

            {mode === "signup" && (
              <p className="text-xs leading-relaxed" style={{ color: "#5a7a82" }}>
                By creating an account you agree to our{" "}
                <span className="cursor-pointer hover:underline" style={{ color: "#0d7a8c" }}>
                  Terms
                </span>{" "}
                and{" "}
                <span className="cursor-pointer hover:underline" style={{ color: "#0d7a8c" }}>
                  Privacy Policy
                </span>
                .
              </p>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}