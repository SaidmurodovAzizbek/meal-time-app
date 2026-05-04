import { useNavigate } from "react-router-dom"

export default function OrderHistory() {
  const navigate = useNavigate()
  
  const history = [
    { id: "MT-1293", date: "Bugun, 14:30", total: 47000, status: "Yetkazib berildi", items: ["Osh (Palov) x1", "Tuxum va non x1"] },
    { id: "MT-1052", date: "Kecha, 19:15", total: 58000, status: "Yetkazib berildi", items: ["Grillangan tovuq x1", "Yashil smoothie x1"] },
    { id: "MT-0883", date: "02 Apr, 12:00", total: 22000, status: "Bekor qilingan", items: ["Qaymoqli sho'rva x1"] },
  ]

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e3f5ec 0%, #bce9d2 100%)", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "32px", border: "1px solid rgba(255,255,255,1)", boxShadow: "0 12px 32px rgba(34,197,94,0.06)" }}>
        
        <button onClick={() => navigate("/home?tab=profile")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid rgba(34,197,94,0.2)", padding: "10px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginBottom: "24px", color: "#1a3a2a" }}>
          <span>←</span> Ortga
        </button>

        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2618", marginBottom: "32px" }}>Buyurtmalar tarixi</h1>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {history.map(order => (
            <div key={order.id} style={{ background: "white", padding: "20px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <div>
                   <p style={{ fontSize: "15px", fontWeight: 800, color: "#1a3a2a" }}>{order.id}</p>
                   <p style={{ fontSize: "12px", color: "#6b8f7b", fontWeight: 600, marginTop: "2px" }}>{order.date}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                   <p style={{ fontSize: "15px", fontWeight: 800, color: "#16a34a" }}>{order.total.toLocaleString("uz-UZ")} so'm</p>
                   <span style={{ display: "inline-block", background: order.status === "Bekor qilingan" ? "rgba(239,68,68,0.1)" : "rgba(34,197,94,0.1)", color: order.status === "Bekor qilingan" ? "#ef4444" : "#16a34a", padding: "4px 8px", borderRadius: "8px", fontSize: "11px", fontWeight: 700, marginTop: "4px" }}>{order.status}</span>
                </div>
              </div>
              <div style={{ background: "#f9fafb", padding: "12px", borderRadius: "12px", fontSize: "13px", color: "#4b5563", fontWeight: 500 }}>
                {order.items.join(", ")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
