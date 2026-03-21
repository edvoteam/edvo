"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⊞" },
    { id: "tutor", label: "AI Tutor", icon: "💬" },
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "quiz", label: "Quiz", icon: "🎯" },
    { id: "settings", label: "Settings", icon: "⚙️" },
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

        {/* Logo */}
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

          {/* Nav items */}
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

        {/* User profile at bottom */}
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
            A
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff" }}>
              Alex Chen
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
              Year 12
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
              Saturday, 21 March 2025
            </div>
          </div>
          <button
            onClick={() => router.push("/")}
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
                Good morning, Alex 👋
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                You have 3 topics to review before your Chemistry exam.
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
              { label: "Study streak", value: "7 days", sub: "Keep it up!", color: "#f5c518" },
              { label: "Topics completed", value: "12 / 18", sub: "Chemistry", color: "#0d7a8c" },
              { label: "Quiz average", value: "84%", sub: "Last 5 quizzes", color: "#0f9b6e" },
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
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { name: "Chemistry", progress: 78, color: "#0d7a8c" },
                  { name: "Mathematics", progress: 65, color: "#f5c518" },
                  { name: "Physics", progress: 90, color: "#0f9b6e" },
                  { name: "English", progress: 50, color: "#d4860a" },
                ].map((subject) => (
                  <div key={subject.name}>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}>
                      <span style={{ fontSize: 13, color: "#1a3a40" }}>
                        {subject.name}
                      </span>
                      <span style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: subject.color,
                      }}>
                        {subject.progress}%
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
                        width: `${subject.progress}%`,
                        backgroundColor: subject.color,
                        borderRadius: 3,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
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
                  { label: "Ask the AI Tutor", sub: "Get instant help", icon: "💬", route: "/tutor" },
                  { label: "Continue Notes", sub: "Chemistry — Redox", icon: "📝", route: "/notes" },
                  { label: "Take a Quiz", sub: "Test your knowledge", icon: "🎯", route: "/quiz" },
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { action: "Completed quiz", detail: "Chemistry — Redox Reactions", time: "2 hours ago", icon: "🎯", score: "8/10" },
                { action: "AI Tutor session", detail: "Asked 4 questions on Calculus", time: "Yesterday", icon: "💬", score: null },
                { action: "Notes updated", detail: "Physics — Motion & Forces", time: "2 days ago", icon: "📝", score: null },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 0",
                    borderBottom: i < 2 ? "1px solid #f2f8f9" : "none",
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: "#f2f8f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#071e22",
                    }}>
                      {item.action}
                    </div>
                    <div style={{ fontSize: 12, color: "#5a7a82" }}>
                      {item.detail}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {item.score && (
                      <div style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#0f9b6e",
                        marginBottom: 2,
                      }}>
                        {item.score}
                      </div>
                    )}
                    <div style={{ fontSize: 11, color: "#5a7a82" }}>
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}