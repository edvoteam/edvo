"use client";

import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0f6f7f] text-white p-6 flex flex-col justify-between">

        <div>
          <h1 className="text-xl font-bold mb-8">Edvo</h1>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-left hover:bg-white/10 p-2 rounded"
            >
              Dashboard
            </button>

            <button
              onClick={() => router.push("/tutor")}
              className="text-left hover:bg-white/10 p-2 rounded"
            >
              AI Tutor
            </button>
          </div>
        </div>

        <button
          onClick={() => router.push("/login")}
          className="bg-white text-[#0f6f7f] p-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-50 p-6">
        {children}
      </div>

    </div>
  );
}