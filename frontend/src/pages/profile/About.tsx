import { useNavigate } from "react-router-dom"

export default function About() {
  const navigate = useNavigate()
  
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e3f5ec 0%, #bce9d2 100%)", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "32px", border: "1px solid rgba(255,255,255,1)", boxShadow: "0 12px 32px rgba(34,197,94,0.06)", textAlign: "center" }}>
        
        <button onClick={() => navigate("/home?tab=profile")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid rgba(34,197,94,0.2)", padding: "10px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginBottom: "24px", color: "#1a3a2a" }}>
          <span>←</span> Ortga
        </button>

        <div style={{ margin: "0 auto 20px", display: "inline-flex" }}>
           <div style={{ width: "80px", height: "80px", borderRadius: "24px", background: "white", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(34,197,94,0.2)", boxShadow: "0 8px 24px rgba(34,197,94,0.1)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
           </div>
        </div>

        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2618", marginBottom: "8px" }}>Meal Time</h1>
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#16a34a", marginBottom: "24px" }}>Versiya 1.0.0 (Eco-Premium)</p>
        
        <div style={{ background: "white", padding: "24px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.05)", fontSize: "14px", color: "#4b5563", lineHeight: 1.6, textAlign: "left" }}>
           <p style={{ marginBottom: "16px" }}>
             <strong>Meal Time</strong> — Sog'lom ovqatlanish va uyga tez yetkazib berish xizmatidan foydalanishga mo'ljallangan mobil/veb ilova.
           </p>
           <p>
             Ilovada barcha taomlarning to'liq kaloriyalari, makro elementlari hisoblangan. Bu sportchilar, dietadagi insonlar va shunchaki o'z sog'lig'iga e'tibor beradiganlar uchun ideal tanlov.
           </p>
        </div>
        
        <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "24px" }}>&copy; 2026 Meal Time LLC. Barcha huquqlar himoyalangan.</p>
      </div>
    </div>
  )
}
