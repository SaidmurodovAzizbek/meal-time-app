import { useNavigate } from "react-router-dom"

export default function Privacy() {
  const navigate = useNavigate()
  
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e3f5ec 0%, #bce9d2 100%)", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", borderRadius: "24px", padding: "32px", border: "1px solid rgba(255,255,255,1)", boxShadow: "0 12px 32px rgba(34,197,94,0.06)" }}>
        
        <button onClick={() => navigate("/home")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", border: "1px solid rgba(34,197,94,0.2)", padding: "10px 16px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginBottom: "24px", color: "#1a3a2a" }}>
          <span>←</span> Ortga
        </button>

        <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2618", marginBottom: "32px" }}>Maxfiylik</h1>
        
        <div style={{ background: "white", padding: "24px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.05)", fontSize: "14px", color: "#4b5563", lineHeight: 1.6 }}>
           <p style={{ marginBottom: "16px" }}>
             <strong>Meal Time</strong> ilovasi foydalanuvchilarining maxfiyligini hurmat qiladi. Sizning ma'lumotlaringiz (ism, raqam, manzil va boshqalar) uchinchi shaxslarga berilmaydi.
           </p>
           <p style={{ marginBottom: "16px" }}>
             Ilovadan foydalanish jarayonida qoldirilgan buyurtmalar, va karta ma'lumotlari to'liq himoyalangan va shifrlangan tizimlarda saqlanadi. 
           </p>
           <p>
             Siz istalgan vaqt o'z profilingizdagi barcha ma'lumotlarni o'chirib tashlash huquqiga egasiz!
           </p>
        </div>
      </div>
    </div>
  )
}
