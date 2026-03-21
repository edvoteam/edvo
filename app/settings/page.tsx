"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SUBJECTS = [
  "Chemistry", "Mathematical Methods", "Specialist Mathematics",
  "Physics", "Biology", "English Literary Studies", "English",
  "Modern History", "Economics", "Psychology", "Legal Studies",
];

const YEAR_LEVELS = ["Year 10", "Year 11", "Year 12"];

export default function SettingsPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [school, setSchool] = useState("");
  const [targetATAR, setTargetATAR] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [savedMsg, setSavedMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("edvo_user_name");
    const storedYear = localStorage.getItem("edvo_year_level");
    const storedSubjects = localStorage.getItem("edvo_subjects");
    const storedSchool = localStorage.getItem("edvo_school");
    const storedATAR = localStorage.getItem("edvo_target_atar");
    if (storedName) setUserName(storedName);
    if (storedYear) setYearLevel(storedYear);
    if (storedSubjects) { try { setSubjects(JSON.parse(storedSubjects)); } catch { setSubjects([]); } }
    if (storedSchool) setSchool(storedSchool);
    if (storedATAR) setTargetATAR(storedATAR);
  }, []);

  const toggleSubject = (subject: string) => {
    setSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const showSuccess = (msg: string) => { setSavedMsg(msg); setErrorMsg(""); setTimeout(() => setSavedMsg(""), 3000); };
  const showError = (msg: string) => { setErrorMsg(msg); setSavedMsg(""); setTimeout(() => setErrorMsg(""), 3000); };

  const handleSaveProfile = () => {
    if (!userName.trim()) { showError("Name cannot be empty."); return; }
    if (!yearLevel) { showError("Please select a year level."); return; }
    if (subjects.length === 0) { showError("Please select at least one subject."); return; }
    localStorage.setItem("edvo_user_name", userName);
    localStorage.setItem("edvo_year_level", yearLevel);
    localStorage.setItem("edvo_subjects", JSON.stringify(subjects));
    localStorage.setItem("edvo_school", school);
    localStorage.setItem("edvo_target_atar", targetATAR);
    showSuccess("Profile saved successfully.");
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) { showError("Please fill in all password fields."); return; }
    if (newPassword.length < 8) { showError("New password must be at least 8 characters."); return; }
    if (newPassword !== confirmPassword) { showError("New passwords do not match."); return; }
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: localStorage.getItem("edvo_user_email"),
          currentPassword, newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) { showError(data.error || "Failed to change password."); return; }
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
      showSuccess("Password changed successfully.");
    } catch {
      showError("Network error. Please try again.");
    }
  };

  const handleLogout = () => { localStorage.clear(); router.push("/"); };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "⊞" },
    { id: "tutor", label: "AI Tutor", icon: "💬" },
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "quiz", label: "Quiz", icon: "🎯" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "subjects", label: "Subjects" },
    { id: "account", label: "Account" },
    { id: "about", label: "About" },
  ];

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", fontSize: 14,
    borderRadius: 9, border: "1.5px solid #a0c8d8",
    outline: "none", color: "#071e22", backgroundColor: "#ffffff",
    fontFamily: "system-ui, sans-serif", boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: "#1a3a40",
    marginBottom: 6, display: "block",
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      fontFamily: "system-ui, sans-serif", backgroundColor: "#f0f7f9",
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: 220, backgroundColor: "#007090",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "28px 14px", flexShrink: 0,
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
                onClick={() => router.push(item.id === "dashboard" ? "/dashboard" : `/${item.id}`)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 14px", borderRadius: 10, border: "none",
                  cursor: "pointer", fontFamily: "system-ui, sans-serif", fontSize: 14,
                  fontWeight: item.id === "settings" ? 600 : 400,
                  backgroundColor: item.id === "settings" ? "#f5c518" : "transparent",
                  color: item.id === "settings" ? "#005a73" : "rgba(255,255,255,0.7)",
                  textAlign: "left", width: "100%", transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            backgroundColor: "#f5c518", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: "#005a73", flexShrink: 0,
          }}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#ffffff" }}>
              {userName.split(" ")[0]}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
              {yearLevel || "Student"}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{
          height: 60, backgroundColor: "#ffffff",
          borderBottom: "1px solid #d0e8f0",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 28px", flexShrink: 0,
        }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#071e22" }}>Settings</div>
            <div style={{ fontSize: 12, color: "#5a7a82" }}>Manage your account and preferences</div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              fontSize: 13, color: "#c0392b", background: "none",
              border: "1px solid #faeae8", borderRadius: 8,
              padding: "6px 14px", cursor: "pointer",
              fontFamily: "system-ui, sans-serif", backgroundColor: "#faeae8",
            }}
          >
            Log out
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>

          {/* Tabs */}
          <div style={{
            display: "flex", gap: 4, backgroundColor: "#ffffff",
            borderRadius: 12, padding: 4, border: "1px solid #d0e8f0",
            marginBottom: 24, width: "fit-content",
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "8px 20px", borderRadius: 9, border: "none",
                  cursor: "pointer", fontFamily: "system-ui, sans-serif", fontSize: 13,
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  backgroundColor: activeTab === tab.id ? "#007090" : "transparent",
                  color: activeTab === tab.id ? "#ffffff" : "#5a7a82",
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {savedMsg && (
            <div style={{
              backgroundColor: "#d4f5e8", color: "#0f9b6e",
              padding: "10px 16px", borderRadius: 9,
              fontSize: 13, fontWeight: 500, marginBottom: 16,
            }}>
              ✓ {savedMsg}
            </div>
          )}
          {errorMsg && (
            <div style={{
              backgroundColor: "#faeae8", color: "#c0392b",
              padding: "10px 16px", borderRadius: 9,
              fontSize: 13, fontWeight: 500, marginBottom: 16,
            }}>
              ✕ {errorMsg}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div style={{
              backgroundColor: "#ffffff", borderRadius: 12,
              padding: "24px", border: "1px solid #d0e8f0", maxWidth: 560,
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#071e22", marginBottom: 20 }}>
                Personal details
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Full name</label>
                  <input style={inputStyle} value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = "#007090")}
                    onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")} />
                </div>
                <div>
                  <label style={labelStyle}>School</label>
                  <input style={inputStyle} placeholder="e.g. Glenunga International High School"
                    value={school} onChange={(e) => setSchool(e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = "#007090")}
                    onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")} />
                </div>
                <div>
                  <label style={labelStyle}>Year level</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {YEAR_LEVELS.map((y) => (
                      <button key={y} type="button" onClick={() => setYearLevel(y)}
                        style={{
                          flex: 1, padding: "9px 0", borderRadius: 9, border: "1.5px solid",
                          borderColor: yearLevel === y ? "#007090" : "#a0c8d8",
                          backgroundColor: yearLevel === y ? "#e0f0f5" : "#ffffff",
                          color: yearLevel === y ? "#007090" : "#5a7a82",
                          fontSize: 13, fontWeight: yearLevel === y ? 600 : 400,
                          cursor: "pointer", fontFamily: "system-ui, sans-serif",
                        }}
                      >
                        {y}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>
                    Target ATAR <span style={{ color: "#5a7a82", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input style={inputStyle} placeholder="e.g. 90"
                    value={targetATAR} onChange={(e) => setTargetATAR(e.target.value)}
                    onFocus={(e) => (e.target.style.borderColor = "#007090")}
                    onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")} />
                  <div style={{ fontSize: 11, color: "#5a7a82", marginTop: 5 }}>
                    Helps edvo tailor your study recommendations.
                  </div>
                </div>
                <button onClick={handleSaveProfile} style={{
                  padding: "12px", borderRadius: 10, border: "none",
                  backgroundColor: "#007090", color: "#ffffff",
                  fontSize: 14, fontWeight: 600, cursor: "pointer",
                  fontFamily: "system-ui, sans-serif", marginTop: 4,
                }}>
                  Save profile →
                </button>
              </div>
            </div>
          )}

          {/* SUBJECTS TAB */}
          {activeTab === "subjects" && (
            <div style={{
              backgroundColor: "#ffffff", borderRadius: 12,
              padding: "24px", border: "1px solid #d0e8f0", maxWidth: 560,
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#071e22", marginBottom: 6 }}>
                Your subjects
              </div>
              <div style={{ fontSize: 13, color: "#5a7a82", marginBottom: 18 }}>
                Select all the subjects you are currently studying.
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
                {SUBJECTS.map((s) => (
                  <button key={s} type="button" onClick={() => toggleSubject(s)}
                    style={{
                      padding: "7px 14px", borderRadius: 20, border: "1.5px solid",
                      borderColor: subjects.includes(s) ? "#007090" : "#a0c8d8",
                      backgroundColor: subjects.includes(s) ? "#e0f0f5" : "#ffffff",
                      color: subjects.includes(s) ? "#007090" : "#5a7a82",
                      fontSize: 13, fontWeight: subjects.includes(s) ? 600 : 400,
                      cursor: "pointer", fontFamily: "system-ui, sans-serif", transition: "all 0.15s",
                    }}
                  >
                    {subjects.includes(s) ? "✓ " : ""}{s}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#5a7a82", marginBottom: 16 }}>
                {subjects.length} subject{subjects.length !== 1 ? "s" : ""} selected
              </div>
              <button onClick={handleSaveProfile} style={{
                padding: "12px 24px", borderRadius: 10, border: "none",
                backgroundColor: "#007090", color: "#ffffff",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
              }}>
                Save subjects →
              </button>
            </div>
          )}

          {/* ACCOUNT TAB */}
          {activeTab === "account" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
              <div style={{
                backgroundColor: "#ffffff", borderRadius: 12,
                padding: "24px", border: "1px solid #d0e8f0",
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#071e22", marginBottom: 20 }}>
                  Change password
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Current password</label>
                    <input type="password" style={inputStyle} placeholder="••••••••"
                      value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#007090")}
                      onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")} />
                  </div>
                  <div>
                    <label style={labelStyle}>New password</label>
                    <input type="password" style={inputStyle} placeholder="Min. 8 characters"
                      value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#007090")}
                      onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")} />
                  </div>
                  <div>
                    <label style={labelStyle}>Confirm new password</label>
                    <input type="password" style={inputStyle} placeholder="Repeat new password"
                      value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={(e) => (e.target.style.borderColor = "#007090")}
                      onBlur={(e) => (e.target.style.borderColor = "#a0c8d8")} />
                  </div>
                  <button onClick={handleChangePassword} style={{
                    padding: "12px", borderRadius: 10, border: "none",
                    backgroundColor: "#007090", color: "#ffffff",
                    fontSize: 14, fontWeight: 600, cursor: "pointer",
                    fontFamily: "system-ui, sans-serif",
                  }}>
                    Update password →
                  </button>
                </div>
              </div>

              <div style={{
                backgroundColor: "#ffffff", borderRadius: 12,
                padding: "24px", border: "1px solid #faeae8",
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#c0392b", marginBottom: 6 }}>
                  Danger zone
                </div>
                <div style={{ fontSize: 13, color: "#5a7a82", marginBottom: 16 }}>
                  Once you delete your account all your data will be permanently removed.
                </div>
                <button
                  onClick={() => showError("Account deletion coming soon. Please contact support.")}
                  style={{
                    padding: "10px 20px", borderRadius: 9,
                    border: "1.5px solid #c0392b", backgroundColor: "#ffffff",
                    color: "#c0392b", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "system-ui, sans-serif",
                  }}
                >
                  Delete account
                </button>
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "about" && (
            <div style={{
              backgroundColor: "#ffffff", borderRadius: 12,
              padding: "24px", border: "1px solid #d0e8f0", maxWidth: 560,
            }}>
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <img src="/logo.png" alt="edvo"
                  style={{ width: 80, height: 80, objectFit: "contain", marginBottom: 12 }} />
                <div style={{
                  fontSize: 20, fontWeight: 600, color: "#007090",
                  fontFamily: "Georgia, serif", marginBottom: 4,
                }}>
                  edvo
                </div>
                <div style={{ fontSize: 13, color: "#5a7a82", marginBottom: 24 }}>
                  Version 1.0.0 · AI Study Platform for SACE Students
                </div>
              </div>
              <div style={{
                display: "flex", flexDirection: "column", gap: 12,
                borderTop: "1px solid #d0e8f0", paddingTop: 20,
              }}>
                {[
                  { label: "About edvo", desc: "Built for Year 11 & 12 students across South Australia" },
                  { label: "SACE alignment", desc: "All content is aligned to the SACE curriculum framework" },
                  { label: "AI powered", desc: "Using OpenAI GPT-4 for intelligent, accurate tutoring responses" },
                  { label: "Privacy", desc: "Your data is stored securely and never shared with third parties" },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: "12px 14px", borderRadius: 9, backgroundColor: "#f0f7f9",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#071e22", marginBottom: 2 }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: 12, color: "#5a7a82" }}>{item.desc}</div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button onClick={() => router.push("/privacy")} style={{
                    flex: 1, padding: "10px", borderRadius: 9,
                    border: "1px solid #d0e8f0", backgroundColor: "#ffffff",
                    color: "#007090", fontSize: 13, fontWeight: 500,
                    cursor: "pointer", fontFamily: "system-ui, sans-serif",
                  }}>
                    Privacy Policy
                  </button>
                  <button onClick={() => router.push("/terms")} style={{
                    flex: 1, padding: "10px", borderRadius: 9,
                    border: "1px solid #d0e8f0", backgroundColor: "#ffffff",
                    color: "#007090", fontSize: 13, fontWeight: 500,
                    cursor: "pointer", fontFamily: "system-ui, sans-serif",
                  }}>
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}