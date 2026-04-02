import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

/* ═══════════════════════════════════════════
   WELCOME PAGE
   ═══════════════════════════════════════════ */
export default function Welcome() {
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState("")
  const [phase, setPhase] = useState(0) // 0=hidden, 1=icon, 2=content

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/")
      return
    }

    const hour = new Date().getHours()
    if (hour < 6) setGreeting("Xayrli tun")
    else if (hour < 12) setGreeting("Xayrli tong")
    else if (hour < 17) setGreeting("Xayrli kun")
    else setGreeting("Xayrli kech")

    const t1 = setTimeout(() => setPhase(1), 200)
    const t2 = setTimeout(() => setPhase(2), 700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const currentDate = new Date().toLocaleDateString("uz-UZ", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const features = [
    { emoji: "🍽️", text: "Taom rejasi" },
    { emoji: "📊", text: "Kaloriya hisobi" },
    { emoji: "💪", text: "Sog'lom hayot" },
  ]

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "linear-gradient(160deg, #0f2618 0%, #14432a 25%, #166534 50%, #1a7a40 75%, #1e8a48 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Bg orbs */}
      <div style={{
        position: "absolute", top: "-100px", right: "-80px",
        width: "450px", height: "450px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 65%)",
        filter: "blur(50px)", animation: "float-slow 10s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-80px", left: "-60px",
        width: "350px", height: "350px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 60%)",
        filter: "blur(45px)", animation: "float-slow 12s ease-in-out 3s infinite",
      }} />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: `${5 + i * 2}px`, height: `${5 + i * 2}px`,
          borderRadius: "50%",
          left: `${15 + i * 10}%`, top: `${10 + (i * 12) % 80}%`,
          background: `rgba(74, 222, 128, ${0.1 + (i % 3) * 0.05})`,
          animation: `float ${5 + i}s ease-in-out ${i * 0.5}s infinite`,
        }} />
      ))}

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px",
        zIndex: 1,
      }}>
        {/* Main card */}
        <div style={{
          background: "white",
          borderRadius: "28px",
          padding: "48px 40px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
          position: "relative",
          overflow: "hidden",
          animation: "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
        }}>
          {/* Top accent line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "3px",
            background: "linear-gradient(90deg, #22c55e, #4ade80, #86efac, #4ade80, #22c55e)",
            backgroundSize: "200% 100%",
            animation: "gradient-shift 3s ease infinite",
          }} />

          <div style={{ textAlign: "center" }}>
            {/* Success icon */}
            <div style={{
              marginBottom: "28px",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? "scale(1)" : "scale(0.5)",
            }}>
              <div style={{
                display: "inline-flex",
                width: "80px",
                height: "80px",
                borderRadius: "24px",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #14532d 0%, #16a34a 60%, #22c55e 100%)",
                boxShadow: "0 12px 40px rgba(22,163,74,0.35)",
                color: "white",
              }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
            </div>

            {/* Greeting content */}
            <div style={{
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              opacity: phase >= 2 ? 1 : 0,
              transform: phase >= 2 ? "translateY(0)" : "translateY(16px)",
            }}>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#16a34a", marginBottom: "8px" }}>
                {currentDate}
              </p>

              <h1 style={{
                fontSize: "36px",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                background: "linear-gradient(135deg, #14532d 0%, #16a34a 50%, #22c55e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "8px",
              }}>
                {greeting}! 👋
              </h1>

              <p style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#1a3a2a",
                marginBottom: "8px",
              }}>
                Tizimga muvaffaqiyatli kirdingiz
              </p>

              <p style={{
                fontSize: "14px",
                color: "#6b8f7b",
                lineHeight: 1.6,
                maxWidth: "340px",
                margin: "0 auto 24px",
              }}>
                Meal Time ilovasiga xush kelibsiz. Sog'lom ovqatlanish yo'lida sizga yordam berishdan mamnunmiz.
              </p>

              {/* Feature badges */}
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "32px",
              }}>
                {features.map((f) => (
                  <span key={f.text} style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    borderRadius: "100px",
                    fontSize: "13px",
                    fontWeight: 600,
                    background: "#f0fdf4",
                    border: "1px solid rgba(34,197,94,0.15)",
                    color: "#15803d",
                  }}>
                    {f.emoji} {f.text}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
                marginBottom: "24px",
              }} />

              <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "16px" }}>
                Tez orada yangi funksiyalar qo'shiladi
              </p>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Chiqish
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          fontSize: "11px",
          color: "rgba(187, 247, 208, 0.4)",
          marginTop: "32px",
          animation: "fade-in 0.5s ease 1.5s both",
        }}>
          © 2025 Meal Time · Bilan yasaldi ❤️ Meal Time jamoasi
        </p>
      </div>
    </div>
  )
}
