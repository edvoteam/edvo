"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState("dashboard");
  const [userName, setUserName] = useState("there");
  const [yearLevel, setYearLevel] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
  };

  useEffect(() => {
    const storedName = localStorage.getItem("edvo_user_name");
    const storedYear = localStorage.getItem("edvo_year_level");
    const storedSubjects = localStorage.getItem("edvo_subjects");

    if (storedName) setUserName(storedName.split(" ")[0]);
    if (storedYear) setYearLevel(storedYear);
    if (storedSubjects) {
      try {
        setSubjects(JSON.parse(storedSubjects));
      } catch {
        setSubjects([]);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("edvo_user_name");
    localStorage.removeItem("edvo_year_level");
    localStorage.removeItem("edvo_subjects");
    router.push("/");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⊞" },
    { id: "tutor", label: "AI Tutor", icon: "💬" },
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "quiz", label: "Quiz", icon: "🎯" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const subjectColors = [
    "#0d7a8c",
    "#f5c518",
    "#0f9b6e",
    "#d4860a",
    "#7c3aed",
    "#c0392b",
    "#0e9db5",
    "#1a3a40",
    "#5a7a82",
    "#b8d4d8",
  ];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#f2f8f9",
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 220,
        backgroundColor: "#0d7a8c",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "28px 14px",
        flexShrink: 0,
      }}>
        <div>
          <img
            src="/logo.png"
            alt="edvo"
            style={{
              width: 100,
              height: 100,
              objectFit: "contain",
              mixBlendMode: "luminosity",
              marginBottom: 32,
              marginLeft: 8,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  if (item.id !== "dashboard") router.push(`/${item.id}`);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: activePage === item.id ? 600 : 400,
                  backgroundColor: activePage === item.id
                    ? "#f5c518"
                    : "transparent",
                  color: activePage === item.id
                    ? "#0a5e6d"
                    : "rgba(255,255,255,0.7)",
                  textAlign: "left",
                  width: "100%",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* User profile */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            backgroundColor: "#f5c518",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#0a5e6d",
            flexShrink: 0,
          }}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff" }}>
              {userName}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
              {yearLevel || "Student"}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>

        {/* Top bar */}
        <div style={{
          height: 60,
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0f0f3",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#071e22" }}>
              Dashboard
            </div>
            <div style={{ fontSize: 12, color: "#5a7a82" }}>
              {new Date().toLocaleDateString("en-AU", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              fontSize: 13,
              color: "#5a7a82",
              background: "none",
              border: "1px solid #e0f0f3",
              borderRadius: 8,
              padding: "6px 14px",
              cursor: "pointer",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Log out
          </button>
        </div>

        {/* Page content */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px 28px",
        }}>

          {/* Welcome banner */}
          <div style={{
            backgroundColor: "#0d7a8c",
            borderRadius: 14,
            padding: "24px 28px",
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <div style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#f5c518",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                marginBottom: 6,
              }}>
                Welcome back
              </div>
              <div style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#ffffff",
                fontFamily: "Georgia, serif",
                marginBottom: 4,
              }}>
                {getGreeting()}, {userName} 👋
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                {subjects.length > 0
                  ? `You are studying ${subjects.length} subject${subjects.length > 1 ? "s" : ""} this year.`
                  : "Welcome to edvo — your AI study platform."}
              </div>
            </div>
            <button
              onClick={() => router.push("/tutor")}
              style={{
                backgroundColor: "#f5c518",
                color: "#0a5e6d",
                border: "none",
                borderRadius: 10,
                padding: "11px 20px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
                whiteSpace: "nowrap",
              }}
            >
              Ask AI Tutor →
            </button>
          </div>

          {/* Stat cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 14,
            marginBottom: 20,
          }}>
            {[
              {
                label: "Year level",
                value: yearLevel || "—",
                sub: "Current year",
                color: "#0d7a8c",
              },
              {
                label: "Subjects",
                value: subjects.length > 0 ? `${subjects.length}` : "—",
                sub: "Enrolled subjects",
                color: "#f5c518",
              },
              {
                label: "AI Tutor",
                value: "24/7",
                sub: "Always available",
                color: "#0f9b6e",
              },
            ].map((stat) => (
              <div key={stat.label} style={{
                backgroundColor: "#ffffff",
                borderRadius: 12,
                padding: "18px 20px",
                border: "1px solid #e0f0f3",
              }}>
                <div style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: stat.color,
                  marginBottom: 4,
                  fontFamily: "Georgia, serif",
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#071e22" }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: 11, color: "#5a7a82", marginTop: 2 }}>
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Two column section */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 20,
          }}>

            {/* Subjects */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: "20px",
              border: "1px solid #e0f0f3",
            }}>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#071e22",
                marginBottom: 14,
              }}>
                Your Subjects
              </div>

              {subjects.length === 0 ? (
                <div style={{ fontSize: 13, color: "#5a7a82" }}>
                  No subjects added yet.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {subjects.map((subject, i) => (
                    <div key={subject}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 5,
                      }}>
                        <span style={{ fontSize: 13, color: "#1a3a40" }}>
                          {subject}
                        </span>
                        <span style={{
                          fontSize: 11,
                          color: "#5a7a82",
                        }}>
                          In progress
                        </span>
                      </div>
                      <div style={{
                        height: 5,
                        backgroundColor: "#f2f8f9",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}>
                        <div style={{
                          height: "100%",
                          width: "10%",
                          backgroundColor: subjectColors[i % subjectColors.length],
                          borderRadius: 3,
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div style={{
              backgroundColor: "#ffffff",
              borderRadius: 12,
              padding: "20px",
              border: "1px solid #e0f0f3",
            }}>
              <div style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#071e22",
                marginBottom: 14,
              }}>
                Quick Actions
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  {
                    label: "Ask the AI Tutor",
                    sub: "Get instant help",
                    icon: "💬",
                    route: "/tutor",
                  },
                  {
                    label: "Continue Notes",
                    sub: subjects[0] ? `${subjects[0]}` : "Pick a subject",
                    icon: "📝",
                    route: "/notes",
                  },
                  {
                    label: "Take a Quiz",
                    sub: "Test your knowledge",
                    icon: "🎯",
                    route: "/quiz",
                  },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => router.push(action.route)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 10,
                      border: "1px solid #e0f0f3",
                      backgroundColor: "#f2f8f9",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      fontFamily: "system-ui, sans-serif",
                      transition: "all 0.15s",
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{action.icon}</span>
                    <div>
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#071e22",
                      }}>
                        {action.label}
                      </div>
                      <div style={{ fontSize: 11, color: "#5a7a82" }}>
                        {action.sub}
                      </div>
                    </div>
                    <span style={{
                      marginLeft: "auto",
                      color: "#0d7a8c",
                      fontSize: 16,
                    }}>
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: 12,
            padding: "20px",
            border: "1px solid #e0f0f3",
          }}>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#071e22",
              marginBottom: 14,
            }}>
              Recent Activity
            </div>
            <div style={{
              fontSize: 13,
              color: "#5a7a82",
              textAlign: "center",
              padding: "20px 0",
            }}>
              No activity yet — start by asking the AI Tutor a question!
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}