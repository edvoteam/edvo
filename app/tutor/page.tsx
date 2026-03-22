"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function TutorPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("there");
  const [yearLevel, setYearLevel] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("edvo_user_name");
    const storedYear = localStorage.getItem("edvo_year_level");
    if (stored) setUserName(stored.split(" ")[0]);
    if (storedYear) setYearLevel(storedYear);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!message.trim()) return;
    const newMessages: Message[] = [...messages, { role: "user", content: message }];
    setMessages(newMessages);
    setMessage("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      setMessages([...newMessages, {
        role: "ai",
        content: data.reply || "Sorry, I could not get a response. Please try again.",
      }]);
    } catch {
      setMessages([...newMessages, {
        role: "ai",
        content: "Network error. Please check your connection and try again.",
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("edvo_user_name");
    router.push("/");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⊞" },
    { id: "tutor", label: "AI Tutor", icon: "💬" },
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "quiz", label: "Quiz", icon: "🎯" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const suggestions = [
    "Explain oxidation and reduction",
    "How do I solve quadratic equations?",
    "What is Newton's second law?",
    "Help me understand essay structure",
  ];

  return (
    <>
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#f0f7f9",
      }}>

        {/* ── SIDEBAR ── */}
        <div style={{
          width: 220,
          backgroundColor: "#007090",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "28px 14px",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
              <img
                src="/logo.png"
                alt="edvo"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    router.push(item.id === "dashboard" ? "/dashboard" : `/${item.id}`)
                  }
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
                    fontWeight: item.id === "tutor" ? 600 : 400,
                    backgroundColor: item.id === "tutor" ? "#f5c518" : "transparent",
                    color: item.id === "tutor" ? "#005a73" : "rgba(255,255,255,0.7)",
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
              color: "#005a73",
              flexShrink: 0,
            }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff" }}>
                {userName}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
                {localStorage.getItem("edvo_year_level") || "Student"}
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
            borderBottom: "1px solid #d0e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            flexShrink: 0,
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#071e22" }}>
                AI Tutor
              </div>
              <div style={{ fontSize: 12, color: "#5a7a82" }}>
                Ask me anything about your subjects
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={{
                fontSize: 13,
                color: "#5a7a82",
                background: "none",
                border: "1px solid #d0e8f0",
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Log out
            </button>
          </div>

          {/* Chat area */}
          <div style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}>

            {/* Empty state */}
            {messages.length === 0 && (
              <div style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 60,
              }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor: "#007090",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  marginBottom: 16,
                }}>
                  💬
                </div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#071e22",
                  fontFamily: "Georgia, serif",
                  marginBottom: 6,
                }}>
                  Hi {userName}, I am your AI Tutor
                </div>
                <div style={{
                  fontSize: 14,
                  color: "#5a7a82",
                  marginBottom: 28,
                  textAlign: "center",
                  maxWidth: 360,
                }}>
                  Ask me anything about your SACE subjects — I am here to help
                  you understand, not just memorise.
                </div>
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  justifyContent: "center",
                  maxWidth: 520,
                }}>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setMessage(s)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 20,
                        border: "1px solid #a0c8d8",
                        backgroundColor: "#ffffff",
                        color: "#007090",
                        fontSize: 13,
                        cursor: "pointer",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "ai" && (
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    backgroundColor: "#007090",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    marginRight: 10,
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    💬
                  </div>
                )}
                <div style={{
                  maxWidth: "70%",
                  padding: "12px 16px",
                  borderRadius: msg.role === "user"
                    ? "14px 14px 4px 14px"
                    : "14px 14px 14px 4px",
                  backgroundColor: msg.role === "user" ? "#007090" : "#ffffff",
                  color: msg.role === "user" ? "#ffffff" : "#071e22",
                  fontSize: 14,
                  lineHeight: 1.6,
                  border: msg.role === "ai" ? "1px solid #d0e8f0" : "none",
                  whiteSpace: "pre-wrap",
                }}>
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: "#f5c518",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#005a73",
                    marginLeft: 10,
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  backgroundColor: "#007090",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}>
                  💬
                </div>
                <div style={{
                  padding: "12px 16px",
                  borderRadius: "14px 14px 14px 4px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #d0e8f0",
                  display: "flex",
                  gap: 4,
                  alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#007090",
                        opacity: 0.4,
                        animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div style={{
            padding: "16px 28px",
            backgroundColor: "#ffffff",
            borderTop: "1px solid #d0e8f0",
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
          }}>
            <input
              type="text"
              placeholder="Ask your AI tutor anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              style={{
                flex: 1,
                padding: "12px 16px",
                fontSize: 14,
                borderRadius: 10,
                border: "1.5px solid #a0c8d8",
                outline: "none",
                fontFamily: "system-ui, sans-serif",
                color: "#071e22",
                backgroundColor: "#f0f7f9",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007090")}
              onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")}
            />
            <button
              onClick={handleSend}
              disabled={loading || !message.trim()}
              style={{
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                backgroundColor: loading || !message.trim() ? "#a0c8d8" : "#007090",
                color: "#ffffff",
                fontSize: 14,
                fontWeight: 600,
                cursor: loading || !message.trim() ? "not-allowed" : "pointer",
                fontFamily: "system-ui, sans-serif",
                flexShrink: 0,
                transition: "all 0.15s",
              }}
            >
              Send →
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}