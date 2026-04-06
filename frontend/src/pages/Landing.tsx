import { useNavigate } from "react-router-dom"

/* ═══════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════ */
export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: "linear-gradient(160deg, #e3f5ec 0%, #bce9d2 100%)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}>
      {/* ── Background decorations ── */}
      <div style={{
        position: "absolute",
        top: "-150px",
        left: "-100px",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,222,128,0.15) 0%, transparent 65%)",
        filter: "blur(60px)",
        animation: "float-slow 10s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-120px",
        right: "-80px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 60%)",
        filter: "blur(50px)",
        animation: "float-slow 12s ease-in-out 3s infinite",
      }} />
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "350px",
        height: "350px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(134,239,172,0.08) 0%, transparent 60%)",
        filter: "blur(40px)",
        animation: "pulse-ring 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      }} />
      
      {/* Grid pattern */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.4,
        backgroundImage: `
          linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }} />

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "800px",
        zIndex: 1,
        textAlign: "center",
      }}>
        {/* Logo and Icon Container */}
        <div style={{
          animation: "slide-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
          marginBottom: "32px",
        }}>
          <div style={{
            display: "inline-flex",
            position: "relative",
            marginBottom: "24px",
          }}>
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)",
              border: "1px solid rgba(34,197,94,0.2)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 16px 40px rgba(34,197,94,0.1), inset 0 2px 4px rgba(255,255,255,0.8)",
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            {/* Decorative Sparkles */}
            <div style={{
              position: "absolute",
              top: "-8px",
              right: "-8px",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#22c55e",
              border: "4px solid #166534",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(34,197,94,0.6)",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              </svg>
            </div>
          </div>

          <h1 style={{
            fontSize: "44px",
            fontWeight: 900,
            color: "#0f2618",
            letterSpacing: "-0.04em",
            marginBottom: "12px",
            lineHeight: 1.1,
          }}>
            Meal Time
          </h1>
          <p style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "#4b6b55",
            lineHeight: 1.6,
            maxWidth: "320px",
            margin: "0 auto",
          }}>
            Sog'lom ovqatlanish — yangi hayot tarzi. Biz bilan to'g'ri taomlanishni o'rganing.
          </p>
        </div>

        {/* Feature Cards / Mini info */}
        <div style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          marginBottom: "40px",
          animation: "fade-in 0.8s ease 0.3s both",
        }}>
          {[
            { icon: "🥗", text: "Foydali" },
            { icon: "⏱️", text: "Tezkor" },
            { icon: "💪", text: "Sog'lom" }
          ].map(f => (
            <div key={f.text} style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(34,197,94,0.1)",
              padding: "10px 16px",
              borderRadius: "16px",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#1a3a2a",
              fontSize: "13px",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(34,197,94,0.05)",
            }}>
              <span>{f.icon}</span> {f.text}
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div style={{ animation: "scale-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both" }}>
          <button
            onClick={() => navigate("/signin")}
            style={{
              width: "100%",
              maxWidth: "320px",
              margin: "0 auto",
              height: "60px",
              borderRadius: "20px",
              fontSize: "16px",
              fontWeight: 800,
              fontFamily: "inherit",
              color: "white",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              boxShadow: "0 12px 32px rgba(22,163,74,0.3), inset 0 -3px 0 rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)"
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(22,163,74,0.4), inset 0 -3px 0 rgba(0,0,0,0.1)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(22,163,74,0.3), inset 0 -3px 0 rgba(0,0,0,0.1)"
            }}
          >
            <span>Boshlash</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

        {/* Footer */}
        <p style={{
          fontSize: "12px",
          color: "#94a3b8",
          marginTop: "48px",
          fontWeight: 500,
          animation: "fade-in 1s ease 0.8s both",
        }}>
          © 2025 Meal Time. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  )
}
