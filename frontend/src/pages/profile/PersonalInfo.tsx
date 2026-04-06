import { useNavigate } from "react-router-dom"

export default function PersonalInfo() {
  const navigate = useNavigate()
  
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e3f5ec 0%, #bce9d2 100%)", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "32px", border: "1px solid rgba(255,255,255,1)", boxShadow: "0 12px 32px rgba(34,197,94,0.06)" }}>
        
        <button onClick={() => navigate("/home")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid rgba(34,197,94,0.2)", padding: "10px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginBottom: "24px", color: "#1a3a2a" }}>
          <span>←</span> Ortga
        </button>

        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2618", marginBottom: "32px" }}>Shaxsiy ma'lumotlar</h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
             <label style={{ display: "block", fontSize: "13px", color: "#6b8f7b", fontWeight: 700, marginBottom: "8px" }}>Ism-sharif</label>
             <input type="text" defaultValue="Murodov Azizbek" style={{ width: "100%", padding: "16px", borderRadius: "16px", border: "1px solid rgba(22,163,74,0.2)", background: "white", fontSize: "15px", outline: "none", color: "#1a3a2a", fontWeight: 600 }} />
          </div>
          <div>
             <label style={{ display: "block", fontSize: "13px", color: "#6b8f7b", fontWeight: 700, marginBottom: "8px" }}>Telefon raqam</label>
             <input type="text" defaultValue="+998 90 123 45 67" disabled style={{ width: "100%", padding: "16px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.05)", background: "#f9fafb", fontSize: "15px", outline: "none", color: "#9ca3af", fontWeight: 600 }} />
          </div>
          <div>
             <label style={{ display: "block", fontSize: "13px", color: "#6b8f7b", fontWeight: 700, marginBottom: "8px" }}>Tug'ilgan sana</label>
             <input type="date" defaultValue="1995-05-15" style={{ width: "100%", padding: "16px", borderRadius: "16px", border: "1px solid rgba(22,163,74,0.2)", background: "white", fontSize: "15px", outline: "none", color: "#1a3a2a", fontWeight: 600 }} />
          </div>
        </div>

        <button style={{ width: "100%", marginTop: "32px", background: "#16a34a", color: "white", padding: "18px", borderRadius: "16px", border: "none", fontSize: "16px", fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(22,163,74,0.25)" }} onClick={() => navigate("/home")}>
          Saqlash
        </button>
      </div>
    </div>
  )
}
