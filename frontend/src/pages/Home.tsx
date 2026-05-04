import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */
interface Meal {
  id: number
  name: string
  price: number
  calories: string
  category: string
  rating: number
  time: string
  image: string
  fats: number
  proteins: string
  carbs: number
  ingredients: string[]
  description: string
  vitamins: string[]
}

/* ═══════════════════════════════════════════
   MENU DATA (from Mealtime images)
   ═══════════════════════════════════════════ */
const categories = [
  { id: "all", label: "Barchasi", emoji: "🍽️" },
  { id: "salat", label: "Salatlar", emoji: "🥗" },
  { id: "asosiy", label: "Asosiy taom", emoji: "🍛" },
  { id: "choy", label: "Choylar", emoji: "🍵" },
  { id: "ichimlik", label: "Ichimliklar", emoji: "🥤" },
]

const meals: Meal[] = [
  {
    id: 1,
    name: "Achiq-chuchuk Salati",
    price: 18000,
    calories: "50 – 100",
    category: "salat",
    rating: 4.7,
    time: "10 min",
    image: "/images/achiq_chuchuk_salati.png",
    fats: 2,
    proteins: "1 – 2",
    carbs: 8,
    ingredients: ["Pomidor", "Piyoz", "Qalampir", "Ko'katlar", "Tuz", "Limon"],
    description: "Yangi sabzavotlardan tayyorlangan achiq chuchuk salati. Vitaminlarga boy, yengil va tetik ta'mga ega. Har qanday asosiy taomga go'zal qo'shimcha.",
    vitamins: ["Vitamin C (Pomidor, qalampir)", "Kapsaitsin (Qalampir)", "B-guruhi vitaminlari (Piyoz)"]
  },
  {
    id: 2,
    name: "Premium Salati",
    price: 42000,
    calories: "200 – 250",
    category: "salat",
    rating: 4.9,
    time: "15 min",
    image: "/images/tuna_kinoa_salati.png",
    fats: 8,
    proteins: "28 – 30",
    carbs: 22,
    ingredients: ["Tuna", "Kinoa", "Ismaloq", "Pomidor", "Qalampir", "Zaytun", "Zaytun yog'i"],
    description: "Oqsillarga boy premium salat. Tuna baliq felesi va kinoa donlari bilan tayyorlangan to'yimli va foydali taom. Sportchilar uchun ideal tanlov.",
    vitamins: ["Vitamin A, C va E (Sabzavotlar va moy)", "Antioksidantlar", "Omega-3 (Tuna)"]
  },
  {
    id: 3,
    name: "Go'shtli to'plar va Guruch",
    price: 38000,
    calories: "300 – 400",
    category: "asosiy",
    rating: 4.8,
    time: "30-40 min",
    image: "/images/goshtli_toplar.png",
    fats: 18,
    proteins: "22 – 30",
    carbs: 45,
    ingredients: ["Go'sht to'plari", "Qo'ziqorin", "Guruch", "Sabzavotlar", "Qalampir", "Ziravorlar"],
    description: "Go'shtli to'plar qo'ziqorin sousi va rangli sabzavotlar bilan. Oq guruch bilan servis qilinadi. To'yimli va mazali asosiy taom.",
    vitamins: ["Vitamin C (Sabzavotlar)", "Vitamin D (Qo'ziqorin)", "B-guruhi vitaminlari (Guruch)"]
  },
  {
    id: 4,
    name: "Green Blend Choy",
    price: 15000,
    calories: "120 – 150",
    category: "choy",
    rating: 4.6,
    time: "5-7 min",
    image: "/images/maxsus_choylar.png",
    fats: 0,
    proteins: "2 – 3",
    carbs: 12,
    ingredients: ["Ismaloq", "Olma", "Bodring", "Ko'k choy"],
    description: "Mealtime maxsus yashil choy. Ismaloq va ko'k choy asosida tayyorlangan detoks ichimlik. Organizmni tozalash va kuchli antioksidant ta'siriga ega.",
    vitamins: ["Vitamin C", "Vitamin A", "Vitamin K (Ismaloq, olma, bodring, ko'k choy)"]
  },
  {
    id: 5,
    name: "Red Fusion Choy",
    price: 15000,
    calories: "100 – 130",
    category: "choy",
    rating: 4.5,
    time: "5-7 min",
    image: "/images/maxsus_choylar.png",
    fats: 0,
    proteins: "1 – 2",
    carbs: 10,
    ingredients: ["Lavlagi", "Malina", "Zanjabil", "Hibiskus"],
    description: "Mealtime maxsus qizil choy. Lavlagi va giyohlar asosida tayyorlangan antioksidantlarga boy ichimlik. Qon bosimini tartibga soladi.",
    vitamins: ["Vitamin C", "Antioksidantlar (Lavlagi, malina, zanjabil, hibiskus)"]
  },
  {
    id: 6,
    name: "Golden Brew Choy",
    price: 15000,
    calories: "110 – 140",
    category: "choy",
    rating: 4.7,
    time: "5-7 min",
    image: "/images/maxsus_choylar.png",
    fats: 0,
    proteins: "1 – 2",
    carbs: 11,
    ingredients: ["Kurkuma", "Sabzi", "Apelsin", "Ziravorlar"],
    description: "Mealtime maxsus oltin choy. Kurkuma va giyohlar asosida tayyorlangan yallig'lanishga qarshi ichimlik. Immunitetni mustahkamlaydi.",
    vitamins: ["Vitamin C", "B-guruhi", "Kurkumin (Kurkuma, sabzi, apelsin, ziravorlar)"]
  },
  {
    id: 7,
    name: "Green Blend Ichimlik",
    price: 22000,
    calories: "120 – 150",
    category: "ichimlik",
    rating: 4.8,
    time: "3-5 min",
    image: "/images/maxsus_ichimliklar.png",
    fats: 1,
    proteins: "2 – 3",
    carbs: 18,
    ingredients: ["Ismaloq", "Olma", "Bodring"],
    description: "Mealtime maxsus yashil ichimlik. Ismaloq asosida tayyorlangan sovuq pressli sharbat. Detoks va energiya berish uchun ideal.",
    vitamins: ["Vitamin C", "Vitamin A", "Vitamin K (Ismaloq, olma, bodring)"]
  },
  {
    id: 8,
    name: "Red Fusion Ichimlik",
    price: 22000,
    calories: "100 – 130",
    category: "ichimlik",
    rating: 4.6,
    time: "3-5 min",
    image: "/images/maxsus_ichimliklar.png",
    fats: 0,
    proteins: "1 – 2",
    carbs: 15,
    ingredients: ["Lavlagi", "Malina", "Zanjabil"],
    description: "Mealtime maxsus qizil ichimlik. Lavlagi asosida tayyorlangan sovuq pressli sharbat. Antioksidantlarga boy va yurak uchun foydali.",
    vitamins: ["Vitamin C", "Antioksidantlar (Lavlagi, malina, zanjabil)"]
  },
  {
    id: 9,
    name: "Golden Brew Ichimlik",
    price: 22000,
    calories: "110 – 140",
    category: "ichimlik",
    rating: 4.7,
    time: "3-5 min",
    image: "/images/maxsus_ichimliklar.png",
    fats: 0,
    proteins: "1 – 2",
    carbs: 16,
    ingredients: ["Kurkuma", "Sabzi", "Apelsin"],
    description: "Mealtime maxsus oltin ichimlik. Kurkuma asosida tayyorlangan sovuq pressli sharbat. Yallig'lanishga qarshi va immunitetni oshiradi.",
    vitamins: ["Vitamin C", "B-guruhi", "Kurkumin (Kurkuma, sabzi, apelsin)"]
  },
  {
    id: 10,
    name: "Fit Salat Mix",
    price: 28000,
    calories: "120 – 180",
    category: "salat",
    rating: 4.8,
    time: "10 min",
    image: "/images/achiq_chuchuk_salati.png",
    fats: 4,
    proteins: "5 – 8",
    carbs: 15,
    ingredients: ["Aralash sabzavotlar", "Yong'oq", "Zaytun yog'i", "Limon", "Ko'katlar"],
    description: "Fit-Taom kolleksiyasidan maxsus aralash sabzavot salati. Dietaga mos, vitamin va mineral moddalarga boy yengil taom.",
    vitamins: ["Vitamin A", "Vitamin C", "Vitamin E", "Foliy kislotasi"]
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
function MenuTab({ onAddToCart, onSelectMeal }: { onAddToCart: (id: number) => void; onSelectMeal: (meal: Meal) => void }) {
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
            onClick={() => onSelectMeal(meal)}
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
            {/* Meal image */}
            <div style={{
              width: "88px", height: "88px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(34,197,94,0.1)",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}>
              <img
                src={meal.image}
                alt={meal.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
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
              overflow: "hidden",
              border: "1px solid rgba(34,197,94,0.1)",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}>
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
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
   MEAL DETAIL MODAL (shared)
   ═══════════════════════════════════════════ */
function MealDetailModal({ meal, onClose, onAddToCart }: { meal: Meal; onClose: () => void; onAddToCart?: (id: number) => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(15, 38, 24, 0.5)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      animation: "fade-in 0.2s ease",
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: "32px", padding: "24px",
        width: "100%", maxWidth: "420px", maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
        animation: "slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
      }} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            width: "36px", height: "36px", borderRadius: "12px",
            background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#1a3a2a", transition: "background 0.2s", zIndex: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,1)"}
          onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.85)"}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        {/* Hero image */}
        <div style={{
          width: "100%", height: "220px", borderRadius: "24px",
          overflow: "hidden", marginBottom: "20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}>
          <img src={meal.image} alt={meal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0f2618", textAlign: "center", marginBottom: "8px" }}>
            {meal.name}
          </h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#fbbf24", display: "flex", alignItems: "center", gap: "4px" }}><StarIcon /> {meal.rating} ({(meal.id * 123) % 400 + 40} baho)</span>
            <span style={{ opacity: 0.3 }}>•</span>
            <span style={{ fontSize: "14px", fontWeight: 600, color: "#6b8f7b", display: "flex", alignItems: "center", gap: "4px" }}><ClockIcon /> {meal.time}</span>
          </div>
          <p style={{ fontSize: "14px", color: "#4b6b55", textAlign: "center", lineHeight: 1.5, marginBottom: "24px" }}>
            {meal.description}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", gap: "8px", marginBottom: "24px" }}>
          {[
            { label: "Kaloriya", val: meal.calories, unit: "kcal" },
            { label: "Oqsillar", val: meal.proteins, unit: "g" },
            { label: "Yog'lar", val: meal.fats, unit: "g" },
            { label: "Uglevod", val: meal.carbs, unit: "g" },
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
            {meal.ingredients?.map(ing => (
              <span key={ing} style={{ background: "#f3f4f6", padding: "6px 14px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, color: "#4b5563" }}>
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Vitaminlar */}
        {meal.vitamins && meal.vitamins.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f2618", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px" }}>💊</span> Vitaminlar:
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {meal.vitamins.map(vit => (
                <div key={vit} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  background: "rgba(34,197,94,0.06)", padding: "10px 14px",
                  borderRadius: "14px", border: "1px solid rgba(34,197,94,0.1)",
                }}>
                  <div style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #16a34a, #22c55e)",
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#2d5a3e", lineHeight: 1.4 }}>
                    {vit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "20px" }}>
          <div>
            <p style={{ fontSize: "12px", color: "#6b8f7b", fontWeight: 600, marginBottom: "2px" }}>Umumiy narx</p>
            <span style={{ fontSize: "22px", fontWeight: 800, color: "#0f2618" }}>
              {formatPrice(meal.price)}
            </span>
          </div>
          {onAddToCart ? (
            <button
              onClick={() => { onAddToCart(meal.id); onClose() }}
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
          ) : (
            <button
              onClick={onClose}
              style={{
                background: "rgba(34,197,94,0.1)", color: "#16a34a", border: "1px solid rgba(34,197,94,0.2)",
                padding: "14px 24px", borderRadius: "16px", fontSize: "14px", fontWeight: 800,
                cursor: "pointer", transition: "transform 0.15s"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
            >
              Yopish
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   PROFILE TAB
   ═══════════════════════════════════════════ */
function ProfileTab({ onLogout, navigate, onSelectMeal }: { onLogout: () => void, navigate: any, onSelectMeal: (meal: Meal) => void }) {
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
            <div key={meal.id} onClick={() => onSelectMeal(meal)} style={{
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
              <div style={{ width: "56px", height: "56px", borderRadius: "16px", overflow: "hidden", position: "relative", border: "1px solid rgba(34,197,94,0.2)", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <img src={meal.image} alt={meal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "-4px", left: "-4px", width: "22px", height: "22px", borderRadius: "50%", background: "#16a34a", color: "white", fontSize: "11px", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #ffffff", boxShadow: "0 2px 8px rgba(22,163,74,0.3)" }}>
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
  const [menuSelectedMeal, setMenuSelectedMeal] = useState<Meal | null>(null)
  const [profileSelectedMeal, setProfileSelectedMeal] = useState<Meal | null>(null)

  // Computed: is any modal open?
  const isModalOpen = menuSelectedMeal !== null || profileSelectedMeal !== null

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { navigate("/"); return }

    // Check URL for tab param (used by profile sub-pages back button)
    const params = new URLSearchParams(window.location.search)
    const tabParam = params.get("tab")
    if (tabParam === "profile" || tabParam === "cart" || tabParam === "menu") {
      setActiveTab(tabParam)
    }

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
        zIndex: isModalOpen ? 1 : 50,
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
        {activeTab === "menu" && <MenuTab onAddToCart={handleAddToCart} onSelectMeal={(meal) => setMenuSelectedMeal(meal)} />}
        {activeTab === "cart" && <CartTab cart={cart} onRemove={handleRemoveFromCart} onClear={handleClearCart} />}
        {activeTab === "profile" && <ProfileTab onLogout={() => navigate("/")} navigate={navigate} onSelectMeal={(meal) => setProfileSelectedMeal(meal)} />}

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
        zIndex: isModalOpen ? 1 : 50,
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

      {/* ─── Global Modals (rendered outside header/main/footer stacking context) ─── */}
      {menuSelectedMeal && (
        <MealDetailModal
          meal={menuSelectedMeal}
          onClose={() => setMenuSelectedMeal(null)}
          onAddToCart={(id) => { handleAddToCart(id); setMenuSelectedMeal(null) }}
        />
      )}
      {profileSelectedMeal && (
        <MealDetailModal
          meal={profileSelectedMeal}
          onClose={() => setProfileSelectedMeal(null)}
        />
      )}
    </div>
  )
}
