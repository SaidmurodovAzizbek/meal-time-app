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
  {
    id: 1, name: "Osh (Palov)", price: 32000, calories: 540, category: "tushlik", rating: 4.8, time: "30-40 min", image: "🍚",
    fats: 25, proteins: 18, carbs: 60, ingredients: ["Guruch", "Go'sht", "Sabzi", "Piyoz", "Yog'"],
    description: "An'anaviy o'zbek milliy taomi. Asosiy tarkibi darchin va zira bilan to'ldirilgan beqiyos maza."
  },
  {
    id: 2, name: "Qaymoqli sho'rva", price: 22000, calories: 320, category: "tushlik", rating: 4.6, time: "20-30 min", image: "🍲",
    fats: 15, proteins: 12, carbs: 20, ingredients: ["Qaymoq", "Tovuq go'shti", "Qo'ziqorin", "Ko'katlar"],
    description: "Yengil va mazali qaymoqli sho'rva. Ayniqsa sovuq kunlarda isinish uchun juda mos."
  },
  {
    id: 3, name: "Tuxum va non", price: 15000, calories: 280, category: "nonushta", rating: 4.5, time: "10-15 min", image: "🍳",
    fats: 18, proteins: 16, carbs: 25, ingredients: ["Tuxum", "Non", "Sariyog'", "Pishloq"],
    description: "Erta tongdan kuchli energiya beruvchi oson va tez tayyorlanadigan nonushta."
  },
  {
    id: 4, name: "Suli bo'tqasi", price: 18000, calories: 220, category: "nonushta", rating: 4.3, time: "15-20 min", image: "🥣",
    fats: 6, proteins: 8, carbs: 40, ingredients: ["Suli yormasi", "Sut", "Asal", "Yong'oq", "Mevalar"],
    description: "Sog'lom va to'yimli nonushta. Sutda pishirilgan toza suli bo'tqasi rezavorlar bilan."
  },
  {
    id: 5, name: "Meva salati", price: 25000, calories: 180, category: "kechki", rating: 4.9, time: "10 min", image: "🥗",
    fats: 2, proteins: 3, carbs: 35, ingredients: ["Olma", "Banan", "Kivi", "Qulupnay", "Asal", "Yalpiz"],
    description: "Tabiiy vitaminlarga boy, shirin mevalarning ajoyib uyg'unlashgan to'plami."
  },
  {
    id: 6, name: "Grillangan tovuq", price: 38000, calories: 420, category: "kechki", rating: 4.7, time: "25-35 min", image: "🍗",
    fats: 22, proteins: 45, carbs: 5, ingredients: ["Tovuq felesi", "Ziravorlar", "Limon", "Zaytun yog'i"],
    description: "Oqsillarga boy maxsus pishirilgan tovuq felesi. Sportchilar va dietadagilar uchun tavsiya etiladi."
  },
  {
    id: 7, name: "Yashil smoothie", price: 20000, calories: 150, category: "ichimlik", rating: 4.8, time: "5 min", image: "🥤",
    fats: 1, proteins: 4, carbs: 28, ingredients: ["Ismaloq", "Olma", "Apelsin", "Zanjabil", "Kivi"],
    description: "Organizm uchun ajoyib detoks ta'sirga ega, quvvat beruvchi vitaminli smuzis."
  },
  {
    id: 8, name: "Limonad", price: 12000, calories: 90, category: "ichimlik", rating: 4.4, time: "3 min", image: "🍋",
    fats: 0, proteins: 0, carbs: 22, ingredients: ["Limon xaroti", "Yalpiz", "Muz", "Shakar qiyomi"],
    description: "Chanqoqni bosuvchi maxsus yangi siqilgan limon sharbati yalpiz barglari bn."
  },
  {
    id: 9, name: "Lag'mon", price: 28000, calories: 480, category: "tushlik", rating: 4.7, time: "25-35 min", image: "🍜",
    fats: 20, proteins: 15, carbs: 55, ingredients: ["Xamir", "Go'sht", "Sabzavotlar", "Xitoy karami"],
    description: "Milliy uyg'ur uslubida pishirilgan maxsus cho'zma lag'mon sous bilan birlashgan."
  },
  {
    id: 10, name: "Qovoqli tortilla", price: 24000, calories: 350, category: "kechki", rating: 4.5, time: "20 min", image: "🌮",
    fats: 12, proteins: 10, carbs: 45, ingredients: ["Qovoq", "Tortilla", "Pishloq", "Ziravorlar"],
    description: "Qovoq asosli yengil ishtahaochar maza va chiroyli kechki ovqat opsiyasi."
  },
]

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */
const MenuIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
)

const CartIcon = ({ active, count }: { active: boolean; count: number }) => (
  <div style={{ position: "relative" }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
    {count > 0 && (
      <span style={{
        position: "absolute", top: "-6px", right: "-8px",
        width: "18px", height: "18px", borderRadius: "50%",
        background: "#16a34a", color: "white",
        fontSize: "10px", fontWeight: 800,
        display: "flex", alignItems: "center", justifyContent: "center",
        border: "2px solid #ffffff",
      }}>{count}</span>
    )}
  </div>
)

const ProfileIcon = ({ active }: { active: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#16a34a" : "#94a3b8"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24" stroke="#fbbf24" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
)

const FireIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const LogOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
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
  const [selectedMeal, setSelectedMeal] = useState<typeof meals[0] | null>(null)

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
        marginBottom: "24px",
      }}>
        <div style={{
          position: "absolute", left: "16px", top: "50%",
          transform: "translateY(-50%)", color: "#6b8f7b",
          display: "flex", alignItems: "center",
        }}>
          <SearchIcon />
        </div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Taom izlash..."
          style={{
            width: "100%", height: "52px", borderRadius: "16px",
            fontSize: "15px", fontWeight: 600, fontFamily: "inherit",
            paddingLeft: "48px", paddingRight: "16px",
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(22,163,74,0.15)",
            color: "#1a3a2a", outline: "none",
            backdropFilter: "blur(12px)",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(22,163,74,0.4)"
            e.target.style.background = "rgba(255,255,255,0.95)"
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(22,163,74,0.15)"
            e.target.style.background = "rgba(255,255,255,0.7)"
          }}
        />
      </div>

      {/* Categories */}
      <div style={{
        display: "flex", gap: "10px", overflowX: "auto",
        paddingBottom: "8px", marginBottom: "24px",
        scrollbarWidth: "none",
      }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "12px 20px", borderRadius: "100px",
                fontSize: "14px", fontWeight: 700, fontFamily: "inherit",
                whiteSpace: "nowrap", cursor: "pointer",
                border: isActive ? "1px solid rgba(22,163,74,0.3)" : "1px solid rgba(34,197,94,0.1)",
                background: isActive ? "#ffffff" : "rgba(255,255,255,0.6)",
                color: isActive ? "#16a34a" : "#4b6b55",
                boxShadow: isActive ? "0 8px 20px rgba(22,163,74,0.15)" : "0 4px 12px rgba(34,197,94,0.05)",
                backdropFilter: isActive ? "none" : "blur(10px)",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "16px" }}>{cat.emoji}</span>
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Meal cards - TWO COLUMN GRID WITH WHITE BACKGROUND */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
        {filtered.map((meal) => (
          <div
            key={meal.id}
            onClick={() => setSelectedMeal(meal)}
            style={{
              background: "#fcfbfa",
              borderRadius: "24px",
              padding: "20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              border: "1px solid rgba(255,255,255,1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "none"
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"
            }}
          >
            {/* Meal emoji / image */}
            <div style={{
              width: "88px", height: "88px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
              border: "1px solid rgba(34,197,94,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "44px", flexShrink: 0,
            }}>
              {meal.image}
            </div>

            {/* Content right */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                <p style={{
                  fontSize: "17px", fontWeight: 800,
                  color: "#1a3a2a", letterSpacing: "-0.01em",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {meal.name}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 700, color: "#fbbf24" }}>
                  <StarIcon /> {meal.rating}
                </div>
              </div>

              {/* Meta info */}
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                marginBottom: "12px",
              }}>
                <span style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  fontSize: "12px", color: "#6b8f7b", fontWeight: 600,
                }}>
                  <ClockIcon /> {meal.time}
                </span>
                <span style={{
                  display: "flex", alignItems: "center", gap: "4px",
                  fontSize: "12px", color: "#6b8f7b", fontWeight: 600,
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
                  fontSize: "16px", fontWeight: 800,
                  color: "#16a34a",
                }}>
                  {formatPrice(meal.price)}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); onAddToCart(meal.id) }}
                  style={{
                    width: "36px", height: "36px", borderRadius: "12px",
                    border: "none", cursor: "pointer",
                    background: "linear-gradient(135deg, #16a34a, #22c55e)",
                    color: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(22,163,74,0.3)",
                    transition: "all 0.15s ease",
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <PlusIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontSize: "48px", marginBottom: "16px", opacity: 0.5 }}>🔍</p>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#1a3a2a" }}>
            Hech narsa topilmadi
          </p>
          <p style={{ fontSize: "14px", color: "#6b8f7b", marginTop: "6px" }}>
            Boshqa so'z bilan izlab ko'ring
          </p>
        </div>
      )}

      {/* Modal */}
      {selectedMeal && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          background: "rgba(15, 38, 24, 0.4)", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
          animation: "fade-in 0.2s ease",
        }} onClick={() => setSelectedMeal(null)}>
          <div style={{
            background: "#fff", borderRadius: "32px", padding: "24px",
            width: "100%", maxWidth: "420px", maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
            animation: "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative",
          }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedMeal(null)}
              style={{
                position: "absolute", top: "16px", right: "16px",
                width: "36px", height: "36px", borderRadius: "12px",
                background: "rgba(0,0,0,0.05)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#1a3a2a", transition: "background 0.2s", zIndex: 2
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.1)"}
              onMouseOut={(e) => e.currentTarget.style.background = "rgba(0,0,0,0.05)"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>

            <div style={{
              textAlign: "center"
            }}>
              <div style={{
                width: "100px", height: "100px", borderRadius: "24px", margin: "0 auto 20px",
                background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "56px",
                boxShadow: "0 8px 24px rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.2)",
              }}>
                {selectedMeal.image}
              </div>

              <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2618", textAlign: "center", marginBottom: "8px" }}>
                {selectedMeal.name}
              </h2>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#fbbf24", display: "flex", alignItems: "center", gap: "4px" }}><StarIcon /> {selectedMeal.rating} ({(selectedMeal.id * 123) % 400 + 40} baho)</span>
                <span style={{ opacity: 0.3 }}>•</span>
                <span style={{ fontSize: "14px", fontWeight: 600, color: "#6b8f7b", display: "flex", alignItems: "center", gap: "4px" }}><ClockIcon /> {selectedMeal.time}</span>
              </div>

              <p style={{ fontSize: "14px", color: "#4b6b55", textAlign: "center", lineHeight: 1.5, marginBottom: "24px" }}>
                {selectedMeal.description}
              </p>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "24px" }}>
              {[
                { label: "Kaloriya", val: selectedMeal.calories, unit: "kcal" },
                { label: "Oqsillar", val: selectedMeal.proteins, unit: "g" },
                { label: "Yog'lar", val: selectedMeal.fats, unit: "g" },
                { label: "Uglevod", val: selectedMeal.carbs, unit: "g" },
              ].map(mac => (
                <div key={mac.label} style={{ textAlign: "center", flex: 1, background: "rgba(34,197,94,0.05)", borderRadius: "16px", padding: "10px 4px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 800, color: "#16a34a" }}>{mac.val}<span style={{ fontSize: "10px", marginLeft: "2px" }}>{mac.unit}</span></p>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "#6b8f7b", marginTop: "2px" }}>{mac.label}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f2618", marginBottom: "12px" }}>Tarkibidagi masalliqlar:</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedMeal.ingredients?.map(ing => (
                  <span key={ing} style={{ background: "#f3f4f6", padding: "6px 14px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, color: "#4b5563" }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "20px" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#6b8f7b", fontWeight: 600, marginBottom: "2px" }}>Umumiy narx</p>
                <span style={{ fontSize: "22px", fontWeight: 800, color: "#0f2618" }}>
                  {formatPrice(selectedMeal.price)}
                </span>
              </div>
              <button
                onClick={() => { onAddToCart(selectedMeal.id); setSelectedMeal(null) }}
                style={{
                  background: "#16a34a", color: "white", border: "none", padding: "14px 24px",
                  borderRadius: "16px", fontSize: "14px", fontWeight: 800, cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(22,163,74,0.25)", transition: "transform 0.15s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Savatga qo'shish
              </button>
            </div>
          </div>
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
        padding: "80px 20px",
      }}>
        <div style={{
          width: "120px", height: "120px", borderRadius: "32px",
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(255,255,255,1)",
          backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "56px", margin: "0 auto 32px",
          boxShadow: "0 12px 32px rgba(34,197,94,0.08)",
        }}>
          🛒
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f2618", marginBottom: "12px", letterSpacing: "-0.01em" }}>
          Korzinka bo'sh
        </h3>
        <p style={{ fontSize: "15px", color: "#4b6b55", maxWidth: "260px", margin: "0 auto", lineHeight: 1.5 }}>
          Menyu bo'limidan sevimli taomlaringizni qo'shing va buyurtma bering
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
      <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#1a3a2a", marginBottom: "20px", letterSpacing: "-0.02em" }}>Sizning buyurtmangiz</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
        {cartItems.map((item) => (
          <div key={item.id} style={{
            display: "flex", alignItems: "center", gap: "16px",
            background: "rgba(255,255,255,0.85)", borderRadius: "20px", padding: "16px",
            boxShadow: "0 8px 32px rgba(34,197,94,0.06)",
            border: "1px solid rgba(255,255,255,1)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{
              width: "60px", height: "60px", borderRadius: "16px",
              background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
              border: "1px solid rgba(34,197,94,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "32px", flexShrink: 0,
            }}>
              {item.image}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#1a3a2a" }}>{item.name}</p>
              <p style={{ fontSize: "13px", color: "#6b8f7b", marginTop: "4px" }}>
                <span style={{ fontWeight: 600 }}>{formatPrice(item.price)}</span>
                <span style={{ margin: "0 6px", opacity: 0.3 }}>•</span>
                <span style={{ fontWeight: 600, color: "#16a34a" }}>{item.qty} ta</span>
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
              <p style={{ fontSize: "15px", fontWeight: 800, color: "#16a34a" }}>{formatPrice(item.price * item.qty)}</p>
              <button
                onClick={() => onRemove(item.id)}
                style={{
                  width: "28px", height: "28px", borderRadius: "8px",
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "#ef4444", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"}
                onMouseOut={(e) => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}
              >
                <MinusIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div style={{
        background: "rgba(255,255,255,0.75)", borderRadius: "24px", padding: "24px",
        boxShadow: "0 8px 32px rgba(34,197,94,0.06)", border: "1px solid rgba(255,255,255,1)",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "8px",
        }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#6b8f7b" }}>Jami qiymat:</span>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a2a" }}>{formatPrice(total)}</span>
        </div>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "20px",
          paddingBottom: "16px", borderBottom: "1px dashed rgba(34,197,94,0.2)"
        }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#6b8f7b" }}>Yetkazib berish:</span>
          <span style={{ fontSize: "14px", fontWeight: 700, color: "#1a3a2a" }}>{formatPrice(10000)}</span>
        </div>

        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "24px",
        }}>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#0f2618" }}>To'lanadigan summa:</span>
          <span style={{ fontSize: "24px", fontWeight: 900, color: "#16a34a" }}>{formatPrice(total + 10000)}</span>
        </div>

        <button style={{
          width: "100%", height: "56px", borderRadius: "18px",
          fontSize: "16px", fontWeight: 800, fontFamily: "inherit",
          color: "white", border: "none", cursor: "pointer",
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          boxShadow: "0 12px 32px rgba(22,163,74,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)"
            e.currentTarget.style.boxShadow = "0 16px 40px rgba(22,163,74,0.4)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "none"
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(22,163,74,0.3)"
          }}
        >
          Buyurtma berish 🚀
        </button>

        <button
          onClick={onClear}
          style={{
            width: "100%", marginTop: "12px",
            fontSize: "14px", fontWeight: 700, color: "#94a3b8",
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "inherit", padding: "12px",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => e.currentTarget.style.color = "#ef4444"}
          onMouseOut={(e) => e.currentTarget.style.color = "#94a3b8"}
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
function ProfileTab({ onLogout, navigate }: { onLogout: () => void, navigate: any }) {
  const menuItems = [
    { icon: "👤", label: "Shaxsiy ma'lumotlar", color: "#16a34a", path: "/profile/info" },
    { icon: "📜", label: "Buyurtmalar tarixi", color: "#f59e0b", path: "/profile/history" },
    { icon: "⚙️", label: "Sozlamalar", color: "#818cf8", path: "/profile/settings" },
    { icon: "🛡️", label: "Maxfiylik", color: "#16a34a", path: "/profile/privacy" },
    { icon: "ℹ️", label: "Ilova haqida", color: "#38bdf8", path: "/profile/about" },
  ]

  const topMeals = meals.slice(0, 5)

  return (
    <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
      {/* LEFT COLUMN */}
      <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "20px", minWidth: 0 }}>
        {/* Profile Card (Glassmorphism) */}
        <div style={{
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          borderRadius: "26px",
          padding: "24px",
          boxShadow: "0 12px 32px rgba(34,197,94,0.06)",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,1)",
          position: "relative",
        }}>
          {/* Tarif Reja - Top Right */}
          <div style={{
            position: "absolute",
            top: "16px", right: "16px",
            background: "rgba(34,197,94,0.1)",
            padding: "6px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#0f2618",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            border: "1px solid rgba(34,197,94,0.2)"
          }}>
            Oddiy 🌱
          </div>

          {/* Avatar */}
          <div style={{
            width: "90px", height: "90px", borderRadius: "28px",
            background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 8px 24px rgba(34,197,94,0.1), inset 0 2px 4px rgba(255,255,255,0.9)",
            fontSize: "44px", color: "#0f2618",
            border: "1px solid rgba(34,197,94,0.2)",
          }}>
            👨🏻‍💻
          </div>

          <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#1a3a2a", marginBottom: "6px", letterSpacing: "-0.01em" }}>
            Foydalanuvchi
          </h3>
          <p style={{ fontSize: "14px", color: "#6b8f7b", fontWeight: 600 }}>
            +998 90 *** ** 67
          </p>
        </div>

        {/* Menu items */}
        <div style={{
          background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)",
          borderRadius: "26px", overflow: "hidden", boxShadow: "0 12px 32px rgba(34,197,94,0.06)",
          border: "1px solid rgba(255,255,255,1)",
        }}>
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "16px",
                padding: "20px 24px", background: "transparent", border: "none",
                borderBottom: i < menuItems.length - 1 ? "1px solid rgba(34,197,94,0.1)" : "none",
                cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s ease",
              }}
              onMouseOver={(e) => e.currentTarget.style.background = "rgba(34,197,94,0.05)"}
              onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
            >
              <div style={{
                width: "44px", height: "44px", borderRadius: "14px", background: "rgba(255,255,255,0.9)",
                border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "20px", flexShrink: 0,
                boxShadow: "0 4px 12px rgba(34,197,94,0.05)"
              }}>
                {item.icon}
              </div>
              <span style={{ flex: 1, textAlign: "left", fontSize: "16px", fontWeight: 700, color: "#1a3a2a" }}>
                {item.label}
              </span>
              <span style={{ color: "#94a3b8" }}><ChevronRightIcon /></span>
            </button>
          ))}
        </div>

        {/* Logout button */}
        <button
          onClick={onLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
            gap: "10px", padding: "20px", borderRadius: "22px",
            fontSize: "16px", fontWeight: 800, fontFamily: "inherit",
            background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444",
            cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 8px 24px rgba(239,68,68,0.08)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"
            e.currentTarget.style.transform = "translateY(-1px)"
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(239,68,68,0.15)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.7)"
            e.currentTarget.style.transform = "none"
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(239,68,68,0.08)"
          }}
        >
          <LogOutIcon />
          Hisobdan chiqish
        </button>
      </div>

      {/* RIGHT COLUMN: Sevimli taomlar (Top 5) */}
      <div style={{
        flex: "1 1 350px",
        background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)",
        borderRadius: "26px", padding: "24px",
        boxShadow: "0 12px 32px rgba(34,197,94,0.06)", border: "1px solid rgba(255,255,255,1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <span style={{ fontSize: "28px" }}>❤️</span>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f2618", letterSpacing: "-0.01em", lineHeight: 1.2 }}>Sevimli taomlar</h2>
            <p style={{ fontSize: "13px", color: "#6b8f7b", marginTop: "2px", fontWeight: 600 }}>Eng ko'p buyurtma qilinganlari</p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {topMeals.map((meal, index) => (
            <div key={meal.id} style={{
              display: "flex", alignItems: "center", gap: "16px", padding: "16px",
              background: "rgba(255,255,255,0.9)", borderRadius: "20px",
              border: "1px solid rgba(255,255,255,1)", transition: "transform 0.2s ease, box-shadow 0.2s ease", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(34,197,94,0.04)",
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(34,197,94,0.08)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "none"
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(34,197,94,0.04)"
              }}
            >
              <div style={{ fontSize: "32px", width: "56px", height: "56px", background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", border: "1px solid rgba(34,197,94,0.2)" }}>
                {meal.image}
                <div style={{ position: "absolute", top: "-6px", left: "-6px", width: "24px", height: "24px", borderRadius: "50%", background: "#16a34a", color: "white", fontSize: "12px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #ffffff", boxShadow: "0 2px 8px rgba(22,163,74,0.3)" }}>
                  {index + 1}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "15px", fontWeight: 800, color: "#1a3a2a" }}>{meal.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                  <span style={{ fontSize: "12px", color: "#6b8f7b", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px" }}><StarIcon /> {meal.rating}</span>
                  <span style={{ color: "rgba(34,197,94,0.3)", fontSize: "10px" }}>•</span>
                  <span style={{ fontSize: "12px", color: "#6b8f7b", fontWeight: 600, display: "flex", alignItems: "center", gap: "2px" }}><FireIcon /> {meal.calories}</span>
                </div>
              </div>
              <p style={{ fontSize: "15px", fontWeight: 800, color: "#16a34a" }}>{formatPrice(meal.price)}</p>
            </div>
          ))}
        </div>
      </div>
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
      background: "linear-gradient(160deg, #f0fdf4 0%, #bbf7d0 50%, #8dd8b4 100%)",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>
      {/* ── Fixed Global Grid & Glows ── */}
      <div style={{
        position: "fixed", top: "-150px", left: "-100px", width: "500px", height: "500px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 65%)",
        filter: "blur(60px)", zIndex: 0, pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "100px", right: "-100px", width: "450px", height: "450px",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 60%)",
        filter: "blur(50px)", zIndex: 0, pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", inset: 0, opacity: 0.4, pointerEvents: "none", zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(34,197,94,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,197,94,0.06) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }} />

      {/* ─── Header ─── */}
      <header style={{
        background: "#27bf61ff",
        padding: "16px 20px",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
      }}>
        <div style={{
          maxWidth: "1024px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "16px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.1)",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.7)", fontWeight: 600 }}>{greeting} 👋</p>
              <p style={{ fontSize: "17px", fontWeight: 900, color: "white", letterSpacing: "-0.02em" }}>Meal Time</p>
            </div>
          </div>

          <button style={{
            width: "44px", height: "44px", borderRadius: "16px",
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", position: "relative",
            transition: "all 0.15s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)"
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)"
            }}
          >
            <BellIcon />
            <span style={{
              position: "absolute", top: "10px", right: "12px",
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#ef4444", border: "2px solid #ffffff",
            }} />
          </button>
        </div>
      </header>

      {/* ─── Content ─── */}
      <main style={{
        flex: 1,
        maxWidth: "1024px",
        width: "100%",
        margin: "0 auto",
        padding: "24px 16px 100px",
        position: "relative",
        zIndex: 1,
      }}>
        {activeTab === "menu" && <MenuTab onAddToCart={handleAddToCart} />}
        {activeTab === "cart" && <CartTab cart={cart} onRemove={handleRemoveFromCart} onClear={handleClearCart} />}
        {activeTab === "profile" && <ProfileTab onLogout={() => navigate("/")} navigate={navigate} />}
      </main>

      {/* ─── Bottom Tab Bar ─── */}
      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255, 255, 255, 1)",
        padding: "12px 0 env(safe-area-inset-bottom, 12px)",
        zIndex: 50,
        boxShadow: "0 -4px 32px rgba(34,197,94,0.06)",
      }}>
        <div style={{
          maxWidth: "1024px",
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
                  gap: "6px",
                  padding: "8px 20px",
                  borderRadius: "16px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  background: isActive ? "rgba(34,197,94,0.08)" : "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.icon(isActive)}
                <span style={{
                  fontSize: "12px",
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? "#16a34a" : "#94a3b8",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.02em"
                }}>
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
