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
      <div className="bg-gradient-to-r from-[#0f6f7f] to-[#138a9e] text-white px-8 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Learn Smarter. <br /> Score Higher.
            </h1>

            <p className="text-white/90 text-lg mb-6">
              Your AI-powered tutor for Year 11 & 12.
              Get instant help, understand concepts faster,
              and ace your exams.
            </p>

            <button
              onClick={() => router.push("/signup")}
              className="bg-[#facc15] text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Start Learning Free
            </button>
          </div>

          {/* RIGHT FORM CARD */}
          <div className="bg-white text-black rounded-2xl p-6 w-full max-w-sm shadow-xl">

            <h2 className="text-xl font-bold mb-4 text-center">
              Get Started Free
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full mb-3 p-3 border rounded-lg"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-3 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full mb-4 p-3 border rounded-lg"
            />

            <button
              onClick={() => router.push("/signup")}
              className="w-full bg-[#0f6f7f] text-white py-3 rounded-lg font-semibold hover:opacity-90"
            >
              Create Account
            </button>

            <p className="text-sm text-center mt-3 text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-[#0f6f7f] cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>

        </div>
      </div>

      {/* FEATURES SECTION */}
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