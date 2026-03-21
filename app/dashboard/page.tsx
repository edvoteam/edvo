"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <button
          onClick={() => router.push("/tutor")}
          className="bg-[#0f6f7f] text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Open AI Tutor
        </button>
      </div>

      {/* WELCOME CARD */}
      <div className="bg-[#0f6f7f] text-white p-6 rounded-2xl mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Welcome back 👋
        </h2>
        <p className="text-white/90">
          Ready to study? Ask your AI tutor anything and get instant help.
        </p>
      </div>

      {/* STATS / CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm mb-1">
            Questions Asked
          </h3>
          <p className="text-2xl font-bold">0</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm mb-1">
            Study Time
          </h3>
          <p className="text-2xl font-bold">0 mins</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm mb-1">
            Streak
          </h3>
          <p className="text-2xl font-bold">0 days</p>
        </div>

      </div>

      {/* QUICK ACTION */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm text-center">
        <h3 className="text-lg font-semibold mb-3">
          Start studying now
        </h3>

        <button
          onClick={() => router.push("/tutor")}
          className="bg-[#facc15] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Ask AI Tutor
        </button>
      </div>

    </div>
  );
}