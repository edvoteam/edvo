"use client";

import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0f6f7f] text-white p-6 flex flex-col justify-between">

        <div>
          <h1 className="text-xl font-bold mb-8">Edvo</h1>

          <div className="flex flex-col gap-3">

            {/* Dashboard */}
            <button
              onClick={() => router.push("/dashboard")}
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/dashboard"
                  ? "bg-white text-[#0f6f7f]"
                  : "hover:bg-white/10"
              }`}
            >
              📊 Dashboard
            </button>

            {/* AI Tutor */}
            <button
              onClick={() => router.push("/tutor")}
              className={`flex items-center gap-2 p-2 rounded ${
                pathname === "/tutor"
                  ? "bg-white text-[#0f6f7f]"
                  : "hover:bg-white/10"
              }`}
            >
              🤖 AI Tutor
            </button>

          </div>
        </div>

        {/* Logout */}
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