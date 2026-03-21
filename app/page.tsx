"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-primary text-white flex flex-col">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">Edvo</h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-lg bg-white text-primary font-medium"
          >
            Login
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Study Smarter with AI
        </h1>

        <p className="text-lg mb-6 max-w-xl">
          Your personal AI tutor for Year 11 & 12.  
          Get instant help, explanations, and exam-ready answers.
        </p>

        <button
          onClick={() => router.push("/signup")}
          className="bg-accent text-black px-6 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition"
        >
          Get Started Free
        </button>
      </div>

      {/* FEATURES */}
      <div className="bg-white text-black py-12 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">

          <div className="p-4">
            <h3 className="font-bold mb-2">⚡ Instant Help</h3>
            <p className="text-sm text-gray-600">
              Ask any question and get clear answers instantly.
            </p>
          </div>

          <div className="p-4">
            <h3 className="font-bold mb-2">📚 Exam Ready</h3>
            <p className="text-sm text-gray-600">
              Learn exactly what you need for Year 11 & 12 exams.
            </p>
          </div>

          <div className="p-4">
            <h3 className="font-bold mb-2">🎯 Simple Explanations</h3>
            <p className="text-sm text-gray-600">
              No confusing jargon — just clear, simple help.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}