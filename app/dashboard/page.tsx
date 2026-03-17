"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">
        Welcome to Edvo Dashboard
      </h1>

      <button
        onClick={() => router.push("/tutor")}
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Go to AI Tutor
      </button>
    </div>
  );
}