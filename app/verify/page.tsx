"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/verify", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Verified!");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Verify your account
        </h1>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border p-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="6-digit code"
            className="w-full rounded-lg border p-3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-black p-3 text-white"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}