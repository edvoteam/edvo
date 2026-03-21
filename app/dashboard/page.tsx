"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
        <h1 className="text-xl font-bold text-[#0f6f7f]">Edvo</h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/tutor")}
            className="text-gray-600 hover:text-black"
          >
            AI Tutor
          </button>

          <button
            onClick={() => router.push("/login")}
            className="bg-[#0f6f7f] text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto p-6">

        {/* HERO CARD */}
        <div className="bg-[#0f6f7f] text-white p-8 rounded-2xl mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back 👋
          </h2>
          <p className="text-white/90 mb-4">
            Ready to study? Your AI tutor is here to help.
          </p>

          <button
            onClick={() => router.push("/tutor")}
            className="bg-[#facc15] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            Start Studying
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-sm">Questions</p>
            <p className="text-2xl font-bold">0</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-sm">Study Time</p>
            <p className="text-2xl font-bold">0 mins</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-gray-500 text-sm">Streak</p>
            <p className="text-2xl font-bold">0 days</p>
          </div>
        </div>

        {/* SECONDARY CTA */}
        <div className="bg-white p-6 rounded-xl shadow-sm text-center">
          <h3 className="text-lg font-semibold mb-3">
            Need help with something?
          </h3>

          <button
            onClick={() => router.push("/tutor")}
            className="bg-[#0f6f7f] text-white px-6 py-3 rounded-lg hover:opacity-90"
          >
            Ask AI Tutor
          </button>
        </div>

      </div>
    </div>
  );
}