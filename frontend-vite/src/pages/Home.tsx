import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

/* ═══════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════ */
const categories = [
  { id: "all", label: "Barchasi", emoji: "🍽️" },
  { id: "nonushta", label: "Nonushta", emoji: "🥣" },
  { id: "tushlik", label: "Tushlik", emoji: "🍛" },
  { id: "kechki", label: "Kechki ovqat", emoji: "🥗" },
  { id: "ichimlik", label: "Ichimliklar", emoji: "🥤" },
]

const meals = [
  { id: 1, name: "Osh (Palov)", price: 32000, calories: 540, category: "tushlik", rating: 4.8, time: "30-40 min", image: "🍚" },
  { id: 2, name: "Qaymoqli sho'rva", price: 22000, calories: 320, category: "tushlik", rating: 4.6, time: "20-30 min", image: "🍲" },
  { id: 3, name: "Tuxum va non", price: 15000, calories: 280, category: "nonushta", rating: 4.5, time: "10-15 min", image: "🍳" },
  { id: 4, name: "Suli bo'tqasi", price: 18000, calories: 220, category: "nonushta", rating: 4.3, time: "15-20 min", image: "🥣" },
  { id: 5, name: "Meva salati", price: 25000, calories: 180, category: "kechki", rating: 4.9, time: "10 min", image: "🥗" },
  { id: 6, name: "Grillangan tovuq", price: 38000, calories: 420, category: "kechki", rating: 4.7, time: "25-35 min", image: "🍗" },
  { id: 7, name: "Yashil smoothie", price: 20000, calories: 150, category: "ichimlik", rating: 4.8, time: "5 min", image: "🥤" },
  { id: 8, name: "Limonad", price: 12000, calories: 90, category: "ichimlik", rating: 4.4, time: "3 min", image: "🍋" },
  { id: 9, name: "Lag'mon", price: 28000, calories: 480, category: "tushlik", rating: 4.7, time: "25-35 min", image: "🍜" },
  { id: 10, name: "Qovoqli tortilla", price: 24000, calories: 350, category: "kechki", rating: 4.5, time: "20 min", image: "🌮" },
]

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */
const MenuIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M3 12h18M3 18h18"/>
  </svg>
)

const CartIcon = ({ active, count }: { active: boolean; count: number }) => (
  <div style={{ position: "relative" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    </svg>
    {count > 0 && (
      <span style={{
        position: "absolute", top: "-6px", right: "-8px",
        width: "18px", height: "18px", borderRadius: "50%",
        background: "#22c55e", color: "white",
        fontSize: "10px", fontWeight: 700,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "2px solid white",
      }}>{count}</span>
    )}
  </div>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#94a3b8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
)

const FireIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

const LogOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
)

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2m-9-11H1m22 0h-2M4.22 4.22l1.42 1.42m12.73 12.73l1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
)

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
)

/* ═══════════════════════════════════════════
   FORMAT HELPERS
   ═══════════════════════════════════════════ */
function formatPrice(n: number) {
  return n.toLocaleString("uz-UZ") + " so'm"
}

/* ═══════════════════════════════════════════
   MENU TAB
   ═══════════════════════════════════════════ */
function MenuTab({ onAddToCart }: { onAddToCart: (id: number) => void }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = meals.filter((m) => {
    const matchCat = activeCategory === "all" || m.category === activeCategory
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div>
      {/* Search bar */}
      <div style={{
        position: "relative",
        marginBottom: "20px",
      }}>
        <div style={{
          position: "absolute", left: "16px", top: "50%",
          transform: "translateY(-50%)", color: "#94a3b8",
          display: "flex", alignItems: "center",
        }}>
          <SearchIcon />
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Taom izlash..."
          style={{
            width: "100%", height: "48px", borderRadius: "14px",
            fontSize: "14px", fontWeight: 500, fontFamily: "inherit",
            paddingLeft: "48px", paddingRight: "16px",
            background: "white", border: "2px solid #e8eeeb",
            color: "#1a3a2a", outline: "none",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
          }}
          onFocus={(e) => { e.target.style.borderColor = "rgba(34,197,94,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(34,197,94,0.1)" }}
          onBlur={(e) => { e.target.style.borderColor = "#e8eeeb"; e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.03)" }}
        />
      </div>

      {/* Categories */}
      <div style={{
        display: "flex", gap: "8px", overflowX: "auto",
        paddingBottom: "4px", marginBottom: "20px",
        scrollbarWidth: "none",
      }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "10px 18px", borderRadius: "100px",
                fontSize: "13px", fontWeight: 600, fontFamily: "inherit",
                whiteSpace: "nowrap", cursor: "pointer",
                border: isActive ? "none" : "1.5px solid #e8eeeb",
                background: isActive
                  ? "linear-gradient(135deg, #14532d 0%, #16a34a 60%, #22c55e 100%)"
                  : "white",
                color: isActive ? "white" : "#4a6a5a",
                boxShadow: isActive ? "0 4px 16px rgba(22,163,74,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
                transition: "all 0.25s ease",
                flexShrink: 0,
              }}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Meal cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {filtered.map((meal) => (
          <div
            key={meal.id}
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "16px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)",
              transition: "all 0.2s ease",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Meal emoji / image */}
            <div style={{
              width: "100%", height: "80px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "40px", marginBottom: "12px",
            }}>
              {meal.image}
            </div>

            {/* Name */}
            <p style={{
              fontSize: "14px", fontWeight: 700,
              color: "#1a3a2a", marginBottom: "6px",
              lineHeight: 1.3,
            }}>
              {meal.name}
            </p>

            {/* Meta info */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              marginBottom: "10px", flexWrap: "wrap",
            }}>
              <span style={{
                display: "flex", alignItems: "center", gap: "3px",
                fontSize: "11px", color: "#f59e0b", fontWeight: 600,
              }}>
                <StarIcon /> {meal.rating}
              </span>
              <span style={{
                display: "flex", alignItems: "center", gap: "3px",
                fontSize: "11px", color: "#6b8f7b",
              }}>
                <ClockIcon /> {meal.time}
              </span>
              <span style={{
                display: "flex", alignItems: "center", gap: "3px",
                fontSize: "11px", color: "#f97316",
              }}>
                <FireIcon /> {meal.calories} kcal
              </span>
            </div>

            {/* Price + Add button */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between",
            }}>
              <p style={{
                fontSize: "14px", fontWeight: 800,
                color: "#16a34a",
              }}>
                {formatPrice(meal.price)}
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart(meal.id) }}
                style={{
                  width: "32px", height: "32px", borderRadius: "10px",
                  border: "none", cursor: "pointer",
                  background: "linear-gradient(135deg, #16a34a, #22c55e)",
                  color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(22,163,74,0.3)",
                  transition: "all 0.15s ease",
                }}
              >
                <PlusIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <p style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</p>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "#1a3a2a" }}>
            Hech narsa topilmadi
          </p>
          <p style={{ fontSize: "13px", color: "#6b8f7b", marginTop: "4px" }}>
            Boshqa so'z bilan izlab ko'ring
          </p>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   CART TAB
   ═══════════════════════════════════════════ */
function CartTab({ cart, onRemove, onClear }: {
  cart: { id: number; qty: number }[]
  onRemove: (id: number) => void
  onClear: () => void
}) {
  if (cart.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "60px 20px",
      }}>
        <div style={{
          width: "100px", height: "100px", borderRadius: "28px",
          background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "48px", margin: "0 auto 24px",
          boxShadow: "0 4px 20px rgba(34,197,94,0.1)",
        }}>
          🛒
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a3a2a", marginBottom: "8px" }}>
          Korzinka bo'sh
        </h3>
        <p style={{ fontSize: "14px", color: "#6b8f7b", maxWidth: "260px", margin: "0 auto", lineHeight: 1.5 }}>
          Menyu bo'limidan sevimli taomlaringizni qo'shing
        </p>
      </div>
    )
  }

  const cartItems = cart.map((c) => {
    const meal = meals.find((m) => m.id === c.id)!
    return { ...meal, qty: c.qty }
  })
  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <div>
      {/* Cart items */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        {cartItems.map((item) => (
          <div key={item.id} style={{
            display: "flex", alignItems: "center", gap: "12px",
            background: "white", borderRadius: "16px", padding: "14px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "14px",
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px", flexShrink: 0,
            }}>
              {item.image}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a2a" }}>{item.name}</p>
              <p style={{ fontSize: "12px", color: "#6b8f7b", marginTop: "2px" }}>{item.qty} x {formatPrice(item.price)}</p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#16a34a" }}>{formatPrice(item.price * item.qty)}</p>
              <button
                onClick={() => onRemove(item.id)}
                style={{
                  fontSize: "11px", fontWeight: 600, color: "#ef4444",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "inherit", marginTop: "2px",
                }}
              >
                O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div style={{
        background: "white", borderRadius: "18px", padding: "20px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "16px",
        }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#6b8f7b" }}>Jami:</span>
          <span style={{ fontSize: "22px", fontWeight: 800, color: "#16a34a" }}>{formatPrice(total)}</span>
        </div>

        <button style={{
          width: "100%", height: "50px", borderRadius: "14px",
          fontSize: "15px", fontWeight: 700, fontFamily: "inherit",
          color: "white", border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #14532d 0%, #16a34a 60%, #22c55e 100%)",
          boxShadow: "0 6px 24px rgba(22,163,74,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          transition: "all 0.3s ease",
        }}>
          Buyurtma berish 🚀
        </button>

        <button
          onClick={onClear}
          style={{
            width: "100%", marginTop: "10px",
            fontSize: "13px", fontWeight: 600, color: "#ef4444",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "inherit", padding: "8px",
          }}
        >
          Korzinkani tozalash
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   PROFILE TAB
   ═══════════════════════════════════════════ */
function ProfileTab({ onLogout }: { onLogout: () => void }) {
  const menuItems = [
    { icon: <HeartIcon />, label: "Sevimli taomlar", badge: "3", color: "#ec4899" },
    { icon: <SettingsIcon />, label: "Sozlamalar", color: "#6366f1" },
    { icon: <ShieldIcon />, label: "Maxfiylik", color: "#16a34a" },
    { icon: <InfoIcon />, label: "Ilova haqida", color: "#0ea5e9" },
  ]

  return (
    <div>
      {/* Profile card */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        marginBottom: "16px",
        textAlign: "center",
      }}>
        {/* Avatar */}
        <div style={{
          width: "80px", height: "80px", borderRadius: "24px",
          background: "linear-gradient(135deg, #14532d 0%, #16a34a 60%, #22c55e 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
          boxShadow: "0 8px 24px rgba(22,163,74,0.25)",
          fontSize: "36px", color: "white",
        }}>
          👤
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a3a2a", marginBottom: "4px" }}>
          Foydalanuvchi
        </h3>
        <p style={{ fontSize: "13px", color: "#6b8f7b" }}>
          +998 90 *** ** 67
        </p>

        {/* Stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: "12px", marginTop: "20px",
          padding: "16px", borderRadius: "14px",
          background: "#f8faf9",
        }}>
          {[
            { label: "Buyurtmalar", value: "12" },
            { label: "Sevimli", value: "3" },
            { label: "Ball", value: "240" },
          ].map((s) => (
            <div key={s.label}>
              <p style={{ fontSize: "20px", fontWeight: 800, color: "#16a34a" }}>{s.value}</p>
              <p style={{ fontSize: "11px", fontWeight: 500, color: "#6b8f7b", marginTop: "2px" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div style={{
        background: "white",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        marginBottom: "16px",
      }}>
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            style={{
              width: "100%",
              display: "flex", alignItems: "center", gap: "14px",
              padding: "16px 20px",
              background: "transparent",
              border: "none",
              borderBottom: i < menuItems.length - 1 ? "1px solid #f0f2f1" : "none",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s ease",
            }}
          >
            <div style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: `${item.color}12`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: item.color, flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <span style={{ flex: 1, textAlign: "left", fontSize: "14px", fontWeight: 600, color: "#1a3a2a" }}>
              {item.label}
            </span>
            {item.badge && (
              <span style={{
                padding: "2px 8px", borderRadius: "100px",
                fontSize: "11px", fontWeight: 700,
                background: "#f0fdf4", color: "#16a34a",
              }}>
                {item.badge}
              </span>
            )}
            <span style={{ color: "#c8d0cc" }}><ChevronRightIcon /></span>
          </button>
        ))}
      </div>

      {/* Logout button */}
      <button
        onClick={onLogout}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "8px", padding: "16px",
          borderRadius: "16px",
          fontSize: "14px", fontWeight: 600, fontFamily: "inherit",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          color: "#dc2626",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <LogOutIcon />
        Hisobdan chiqish
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════
   HOME PAGE (MAIN)
   ═══════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"menu" | "cart" | "profile">("menu")
  const [cart, setCart] = useState<{ id: number; qty: number }[]>([])
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { navigate("/"); return }

    const h = new Date().getHours()
    if (h < 6) setGreeting("Xayrli tun")
    else if (h < 12) setGreeting("Xayrli tong")
    else if (h < 17) setGreeting("Xayrli kun")
    else setGreeting("Xayrli kech")
  }, [navigate])

  const handleAddToCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id)
      if (existing) return prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { id, qty: 1 }]
    })
  }

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((c) => c.id !== id))
  }

  const handleClearCart = () => setCart([])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  const tabs = [
    { id: "menu" as const, label: "Menyu", icon: (a: boolean) => <MenuIcon active={a} /> },
    { id: "cart" as const, label: "Korzinka", icon: (a: boolean) => <CartIcon active={a} count={cartCount} /> },
    { id: "profile" as const, label: "Profil", icon: (a: boolean) => <ProfileIcon active={a} /> },
  ]

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f7f6",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* ─── Header ─── */}
      <header style={{
        background: "white",
        padding: "16px 20px",
        borderBottom: "1px solid #eff1f0",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "14px",
              background: "linear-gradient(135deg, #14532d, #16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(22,163,74,0.2)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "#6b8f7b", fontWeight: 500 }}>{greeting} 👋</p>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#1a3a2a", letterSpacing: "-0.02em" }}>Meal Time</p>
            </div>
          </div>

          <button style={{
            width: "40px", height: "40px", borderRadius: "14px",
            background: "#f5f7f6", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#4a6a5a", position: "relative",
            transition: "all 0.15s ease",
          }}>
            <BellIcon />
            <span style={{
              position: "absolute", top: "8px", right: "10px",
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#22c55e", border: "2px solid white",
            }} />
          </button>
        </div>
      </header>

      {/* ─── Content ─── */}
      <main style={{
        flex: 1,
        maxWidth: "600px",
        width: "100%",
        margin: "0 auto",
        padding: "20px 16px 100px",
      }}>
        {activeTab === "menu" && <MenuTab onAddToCart={handleAddToCart} />}
        {activeTab === "cart" && <CartTab cart={cart} onRemove={handleRemoveFromCart} onClear={handleClearCart} />}
        {activeTab === "profile" && <ProfileTab onLogout={handleLogout} />}
      </main>

      {/* ─── Bottom Tab Bar ─── */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "white",
        borderTop: "1px solid #eff1f0",
        padding: "8px 0 env(safe-area-inset-bottom, 8px)",
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  padding: "8px 20px",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: isActive ? "rgba(34,197,94,0.08)" : "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.icon(isActive)}
                <span style={{
                  fontSize: "11px",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#16a34a" : "#94a3b8",
                  transition: "all 0.2s ease",
                }}>
                  {tab.label}
                </span>
                {isActive && (
                  <div style={{
                    width: "4px", height: "4px", borderRadius: "50%",
                    background: "#22c55e",
                    marginTop: "-2px",
                  }} />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
