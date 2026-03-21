"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-5">
        <h1 className="text-2xl font-bold text-[#0f6f7f]">Edvo</h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="text-[#0f6f7f] font-medium"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="bg-[#0f6f7f] text-white px-5 py-2 rounded-lg"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-6xl mx-auto">

        {/* LEFT TEXT */}
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Your Personal AI Tutor for{" "}
            <span className="text-[#0f6f7f]">Year 11 & 12</span>
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Get instant help with your subjects, understand concepts faster,
            and prepare for exams with confidence.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => router.push("/signup")}
              className="bg-[#facc15] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Start Learning Free
            </button>

            <button
              onClick={() => router.push("/login")}
              className="border border-gray-300 px-6 py-3 rounded-lg"
            >
              Login
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL (placeholder box) */}
        <div className="mt-10 md:mt-0">
          <div className="w-[300px] h-[300px] bg-[#0f6f7f] rounded-2xl flex items-center justify-center text-white text-xl font-semibold">
            AI Tutor
          </div>
        </div>

      </div>

      {/* FEATURES */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">📚 Better Understanding</h3>
            <p className="text-gray-600 text-sm">
              Learn concepts clearly instead of memorising.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">⚡ Instant Help</h3>
            <p className="text-gray-600 text-sm">
              Ask questions anytime and get answers instantly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-lg mb-2">🎯 Exam Focused</h3>
            <p className="text-gray-600 text-sm">
              Built specifically for Year 11 & 12 students.
            </p>
          </div>

        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">
          Start studying smarter today
        </h2>

        <button
          onClick={() => router.push("/signup")}
          className="bg-[#0f6f7f] text-white px-6 py-3 rounded-lg hover:opacity-90"
        >
          Join Edvo
        </button>
      </div>

    </div>
  );
}