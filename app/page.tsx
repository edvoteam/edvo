"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-edvo-bg font-sans">

      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white border-b border-edvo-light-grey">
        <span className="font-display text-2xl font-semibold text-edvo-teal">
          edvo
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2 text-sm font-medium text-edvo-teal hover:text-edvo-teal-dark transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-5 py-2 text-sm font-medium bg-edvo-teal text-white rounded-lg hover:bg-edvo-teal-dark transition-colors"
          >
            Get started free
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-edvo-teal-dark px-8 py-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-14">

          {/* LEFT */}
          <div className="flex-1 text-white">
            <div className="inline-block bg-edvo-gold/20 text-edvo-gold text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
              Built for SACE · Year 11 &amp; 12
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-5">
              Study smarter.<br />
              <span className="italic text-edvo-gold">Score higher.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
              edvo is your AI-powered study partner — aligned to the SACE curriculum,
              available 24/7, and built to help you actually understand your subjects.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/signup")}
                className="bg-edvo-gold text-edvo-teal-dark font-semibold px-6 py-3 rounded-lg hover:bg-edvo-gold-dark hover:text-white transition-colors"
              >
                Start learning free
              </button>
              <button
                onClick={() => router.push("/login")}
                className="bg-white/10 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Sign in
              </button>
            </div>
          </div>

          {/* RIGHT — sign up card */}
          <div className="w-full max-w-sm bg-white rounded-2xl p-7 shadow-xl flex-shrink-0">
            <h2 className="text-lg font-semibold text-edvo-dark mb-1 text-center">
              Create your free account
            </h2>
            <p className="text-sm text-edvo-grey text-center mb-5">
              No credit card required
            </p>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full name"
                className="w-full border border-edvo-light-grey rounded-lg px-4 py-3 text-sm text-edvo-dark placeholder-edvo-grey focus:outline-none focus:border-edvo-teal focus:ring-1 focus:ring-edvo-teal"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full border border-edvo-light-grey rounded-lg px-4 py-3 text-sm text-edvo-dark placeholder-edvo-grey focus:outline-none focus:border-edvo-teal focus:ring-1 focus:ring-edvo-teal"
              />
              <input
                type="password"
                placeholder="Create a password"
                className="w-full border border-edvo-light-grey rounded-lg px-4 py-3 text-sm text-edvo-dark placeholder-edvo-grey focus:outline-none focus:border-edvo-teal focus:ring-1 focus:ring-edvo-teal"
              />
              <button
                onClick={() => router.push("/signup")}
                className="w-full bg-edvo-teal text-white py-3 rounded-lg text-sm font-semibold hover:bg-edvo-teal-dark transition-colors"
              >
                Create account →
              </button>
            </div>

            <p className="text-xs text-edvo-grey text-center mt-4">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-edvo-teal font-medium cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-edvo-dark text-center mb-3">
            Everything you need to ace your exams
          </h2>
          <p className="text-edvo-grey text-center mb-12 max-w-xl mx-auto">
            edvo combines AI tutoring, structured notes, and practice quizzes
            — all aligned to the SACE curriculum.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "💬",
                title: "AI Tutor",
                desc: "Ask any question about your subjects and get clear, accurate explanations instantly — 24 hours a day.",
              },
              {
                icon: "📝",
                title: "Smart Notes",
                desc: "Structured notes for every topic in your subjects, broken down so they're easy to understand and revise.",
              },
              {
                icon: "🎯",
                title: "Practice Quizzes",
                desc: "Test yourself on each topic with AI-generated questions matched to SACE difficulty levels.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-edvo-teal-xl border border-edvo-light-grey rounded-xl p-6"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-edvo-dark mb-2">{f.title}</h3>
                <p className="text-sm text-edvo-grey leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 px-8 bg-edvo-bg">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            { val: "24/7", label: "AI tutor availability" },
            { val: "SACE", label: "Curriculum aligned" },
            { val: "Free", label: "To get started" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-6 border border-edvo-light-grey">
              <div className="font-display text-3xl font-semibold text-edvo-teal mb-1">
                {s.val}
              </div>
              <div className="text-sm text-edvo-grey">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-edvo-teal-dark py-16 px-8 text-center">
        <h2 className="font-display text-3xl font-semibold text-white mb-4">
          Ready to start studying smarter?
        </h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          Join students across South Australia using edvo to improve their results.
        </p>
        <button
          onClick={() => router.push("/signup")}
          className="bg-edvo-gold text-edvo-teal-dark font-semibold px-8 py-3 rounded-lg hover:bg-edvo-gold-dark hover:text-white transition-colors"
        >
          Get started free →
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-edvo-light-grey px-8 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-lg font-semibold text-edvo-teal">edvo</span>
          <div className="flex gap-6 text-sm text-edvo-grey">
            <span className="hover:text-edvo-teal cursor-pointer">Privacy Policy</span>
            <span className="hover:text-edvo-teal cursor-pointer">Terms of Service</span>
            <span className="hover:text-edvo-teal cursor-pointer">Contact</span>
          </div>
          <p className="text-xs text-edvo-grey">
            © 2025 edvo. Built for SACE students.
          </p>
        </div>
      </footer>

    </div>
  );
}