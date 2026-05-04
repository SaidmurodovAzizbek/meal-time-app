import { useNavigate } from "react-router-dom"

export default function Settings() {
  const navigate = useNavigate()
  
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e3f5ec 0%, #bce9d2 100%)", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "32px", border: "1px solid rgba(255,255,255,1)", boxShadow: "0 12px 32px rgba(34,197,94,0.06)" }}>
        
        <button onClick={() => navigate("/home?tab=profile")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid rgba(34,197,94,0.2)", padding: "10px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginBottom: "24px", color: "#1a3a2a" }}>
          <span>←</span> Ortga
        </button>

        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2618", marginBottom: "32px" }}>Sozlamalar</h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", padding: "20px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
             <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#1a3a2a" }}>Ilova tili</p>
                <p style={{ fontSize: "13px", color: "#6b8f7b", marginTop: "4px" }}>O'zbek (lotin)</p>
             </div>
             <button style={{ background: "#f3f4f6", border: "none", padding: "8px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, color: "#4b5563", cursor: "pointer" }}>O'zgartirish</button>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", padding: "20px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
             <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#1a3a2a" }}>Bildirishnomalar</p>
                <p style={{ fontSize: "13px", color: "#6b8f7b", marginTop: "4px" }}>Aksiyalar va yangiliklar xabarlari</p>
             </div>
             <div style={{ width: "44px", height: "24px", background: "#16a34a", borderRadius: "12px", position: "relative", cursor: "pointer" }}>
                <div style={{ width: "20px", height: "20px", background: "white", borderRadius: "50%", position: "absolute", top: "2px", right: "2px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}></div>
             </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", padding: "20px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.05)" }}>
             <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#1a3a2a" }}>Qorong'u mavzu (Dark mode)</p>
                <p style={{ fontSize: "13px", color: "#6b8f7b", marginTop: "4px" }}>Hozirda o'chirilgan</p>
             </div>
             <div style={{ width: "44px", height: "24px", background: "#e5e7eb", borderRadius: "12px", position: "relative", cursor: "pointer" }}>
                <div style={{ width: "20px", height: "20px", background: "white", borderRadius: "50%", position: "absolute", top: "2px", left: "2px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}></div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}
