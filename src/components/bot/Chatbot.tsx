import React, { useState, useRef } from "react";

const GEMINI_API_KEY = 'AIzaSyD-awE0fI0EVaIJwG1Owp4lGq2pZsADjws'; // Reemplaza con tu API Key real

async function sendMessageToGemini(message: string): Promise<string> {
  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: "model",
              parts: [
                {
                  text: "Eres un asistente virtual de soporte. Solo responde preguntas relacionadas con esta aplicación. Si la pregunta no es sobre la app, responde: 'Solo puedo responder dudas sobre esta aplicación.'"
                }
              ]
            },
            {
              role: "user",
              parts: [
                { text: message }
              ]
            }
          ]
        })
      }
    );
    const data = await response.json();
    if (data.error) {
      return data.error.message || 'Error de Gemini: revisa tu API Key o cuota.';
    }
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No se pudo obtener respuesta de Gemini.';
  } catch (err) {
    return 'Ocurrió un error al consultar Gemini.';
  }
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>(
    [
      { from: "bot", text: "¡Hola! Soy tu asistente Gemini. Pregúntame lo que quieras." }
    ]
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user" as const, text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");

    let botText = "";
    botText = await sendMessageToGemini(input);

    const botMsg = { from: "bot" as const, text: botText };
    setMessages((msgs) => [...msgs, botMsg]);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: open ? "none" : "block"
        }}
      >
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 56,
            height: 56,
            fontSize: 28,
            boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
            cursor: "pointer"
          }}
          aria-label="Abrir chatbot"
        >
          💬
        </button>
      </div>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 340,
            maxWidth: "95vw",
            height: 420,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 4px 24px rgba(33,150,243,0.18)",
            zIndex: 10000,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div
            style={{
              background: "#1976d2",
              color: "#fff",
              padding: "12px 16px",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              fontWeight: 600,
              fontSize: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #1976d2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                animation: "avatar-bounce 1s infinite alternate"
              }}>
                <img
                  src="/195.jpg"
                  alt="Chatbot Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              </div>
              <span>Asistente Gemini</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 22,
                cursor: "pointer"
              }}
              aria-label="Cerrar chatbot"
            >
              ×
            </button>
          </div>
          <div
            style={{
              flex: 1,
              padding: "12px 10px",
              overflowY: "auto",
              background: "#f6f8fa"
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  margin: "8px 0",
                  display: "flex",
                  flexDirection: msg.from === "bot" ? "row" : "row-reverse",
                  alignItems: "flex-end"
                }}
              >
                {msg.from === "bot" && (
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #1976d2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fff",
                    marginRight: 8,
                    animation: "avatar-bounce 1s infinite alternate"
                  }}>
                    <img
                      src="/195.jpg"
                      alt="Chatbot Avatar"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                )}
                <span
                  style={{
                    display: "inline-block",
                    background: msg.from === "user" ? "#1976d2" : "#e3eafc",
                    color: msg.from === "user" ? "#fff" : "#222",
                    borderRadius: 12,
                    padding: "7px 14px",
                    maxWidth: "80%",
                    fontSize: 15
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={handleSend}
            style={{
              display: "flex",
              borderTop: "1px solid #eee",
              padding: 8,
              background: "#fff",
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16
            }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1,
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 15,
                outline: "none"
              }}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) handleSend();
              }}
            />
            <button
              type="submit"
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                marginLeft: 8,
                padding: "0 18px",
                fontSize: 16,
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              Enviar
            </button>
          </form>
          {/* Animación para el avatar */}
          <style>
            {`
              @keyframes avatar-bounce {
                0% { transform: translateY(0);}
                100% { transform: translateY(-6px);}
              }
            `}
          </style>
        </div>
      )}
    </div>
  );
};

export default Chatbot;