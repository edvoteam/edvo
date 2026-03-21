"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f6f7f] text-white flex flex-col">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold tracking-wide">Edvo</h1>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="px-4 py-2 rounded-lg bg-white text-[#0f6f7f] font-medium hover:opacity-90"
          >
            Login
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Stop Struggling. <br />
          <span className="text-[#facc15]">Start Understanding.</span>
        </h1>

        <p className="text-lg md:text-xl max-w-xl mb-8 text-white/90">
          Your AI tutor built for Year 11 & 12 students.  
          Get instant explanations, exam help, and smarter study sessions.
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/signup")}
            className="bg-[#facc15] text-black px-6 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition"
          >
            Get Started Free
          </button>

          <button
            onClick={() => router.push("/login")}
            className="border border-white px-6 py-3 rounded-xl font-medium hover:bg-white hover:text-[#0f6f7f] transition"
          >
            I already have an account
          </button>
        </div>

      </div>

      {/* FEATURE STRIP */}
      <div className="bg-white text-black py-12 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="p-6 rounded-xl hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">⚡ Instant Answers</h3>
            <p className="text-gray-600 text-sm">
              Ask any question and get clear explanations in seconds.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">📚 Exam Focused</h3>
            <p className="text-gray-600 text-sm">
              Built specifically for Year 11 & 12 curriculum.
            </p>
          </div>

          <div className="p-6 rounded-xl hover:shadow-md transition">
            <h3 className="font-bold text-lg mb-2">🧠 Learn Faster</h3>
            <p className="text-gray-600 text-sm">
              Understand concepts instead of memorising.
            </p>
          </div>

        </div>
      </div>

      {/* CTA FOOTER */}
      <div className="py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Ready to study smarter?
        </h2>

        <button
          onClick={() => router.push("/signup")}
          className="bg-[#facc15] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Join Edvo
        </button>
      </div>

    </div>
  );
}