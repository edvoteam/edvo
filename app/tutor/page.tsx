"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function TutorPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: message },
    ];

    setMessages(newMessages);
    setMessage("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "ai", content: data.reply || "Error" },
    ]);

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">AI Tutor</h1>

      <div className="w-full max-w-2xl flex-1 border rounded-lg p-4 mb-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">
              {msg.role === "user" ? "You:" : "AI:"}
            </span>{" "}
            {msg.content}
          </div>
        ))}
        {loading && <p>AI is typing...</p>}
      </div>

      <div className="w-full max-w-2xl flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-lg p-3"
          placeholder="Ask something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-black text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}