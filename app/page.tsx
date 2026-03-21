"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "login">("signup");

  // Sign up state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI state
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

      {/* LEFT — Brand panel */}
      <div className="flex-1 bg-edvo-teal-dark flex flex-col justify-between p-10 min-h-[280px]">

        {/* Logo */}
        <span className="font-display text-2xl font-semibold text-edvo-gold">
          edvo
        </span>

        {/* Hero copy */}
        <div>
          <div className="inline-block bg-edvo-gold/20 text-edvo-gold text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Built for SACE · Year 11 &amp; 12
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Study smarter.<br />
            <span className="italic text-edvo-gold">Score higher.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-sm">
            Your AI-powered study partner — aligned to the SACE curriculum
            and available 24/7.
          </p>
        </div>

        {/* Bottom badge */}
        <div className="text-white/30 text-xs">
          © 2025 edvo · Built for South Australian students
        </div>
      </div>

      {/* RIGHT — Auth panel */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-sm">

          {/* Toggle */}
          <div className="flex bg-edvo-bg rounded-lg p-1 mb-8">
            <button
              onClick={() => { setMode("signup"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "signup"
                  ? "bg-white text-edvo-teal shadow-sm"
                  : "text-edvo-grey hover:text-edvo-dark"
              }`}
            >
              Create account
            </button>
            <button
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                mode === "login"
                  ? "bg-white text-edvo-teal shadow-sm"
                  : "text-edvo-grey hover:text-edvo-dark"
              }`}
            >
              Sign in
            </button>
          </div>

          {/* Heading */}
          <h2 className="font-display text-2xl font-semibold text-edvo-dark mb-1">
            {mode === "signup" ? "Get started free" : "Welcome back"}
          </h2>
          <p className="text-sm text-edvo-grey mb-6">
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
                className="w-full border border-edvo-light-grey rounded-lg px-4 py-3 text-sm text-edvo-dark placeholder-edvo-grey focus:outline-none focus:border-edvo-teal focus:ring-1 focus:ring-edvo-teal"
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-edvo-light-grey rounded-lg px-4 py-3 text-sm text-edvo-dark placeholder-edvo-grey focus:outline-none focus:border-edvo-teal focus:ring-1 focus:ring-edvo-teal"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-edvo-light-grey rounded-lg px-4 py-3 text-sm text-edvo-dark placeholder-edvo-grey focus:outline-none focus:border-edvo-teal focus:ring-1 focus:ring-edvo-teal"
            />

            {/* Error */}
            {error && (
              <p className="text-xs text-edvo-red bg-edvo-red-light px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-edvo-teal text-white py-3 rounded-lg text-sm font-semibold hover:bg-edvo-teal-dark transition-colors disabled:opacity-60 mt-1"
            >
              {loading
                ? "Please wait..."
                : mode === "signup"
                ? "Create account →"
                : "Sign in →"}
            </button>
          </form>

          {/* Footer note */}
          {mode === "signup" && (
            <p className="text-xs text-edvo-grey text-center mt-5 leading-relaxed">
              By creating an account you agree to our{" "}
              <span className="text-edvo-teal cursor-pointer hover:underline">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-edvo-teal cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>
          )}

          {mode === "login" && (
            <p className="text-xs text-edvo-grey text-center mt-5">
              <span className="text-edvo-teal cursor-pointer hover:underline">
                Forgot your password?
              </span>
            </p>
          )}

        </div>
      </div>

    </div>
  );
}