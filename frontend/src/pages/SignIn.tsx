import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

/* ─── Icons ─── */
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

const SpinnerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "spin 1s linear infinite" }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
)

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
)

/* ─── Custom Input ─── */
function FormInput({
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  suffix,
}: {
  label: string
  icon: React.ReactNode
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  error?: string
  suffix?: React.ReactNode
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{
        display: "block",
        fontSize: "13px",
        fontWeight: 600,
        color: "#1a3a2a",
        marginBottom: "8px",
        letterSpacing: "-0.01em",
      }}>
        {label}
      </label>
      <div style={{
        position: "relative",
        borderRadius: "14px",
        transition: "all 0.3s ease",
        boxShadow: focused
          ? "0 0 0 3px rgba(34, 197, 94, 0.15), 0 4px 16px rgba(34, 197, 94, 0.1)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}>
        <div style={{
          position: "absolute",
          left: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: error ? "#ef4444" : focused ? "#16a34a" : "#94a3b8",
          transition: "color 0.2s ease",
          display: "flex",
          alignItems: "center",
        }}>
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%",
            height: "52px",
            borderRadius: "14px",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "inherit",
            paddingLeft: "48px",
            paddingRight: suffix ? "52px" : "16px",
            background: focused ? "#ffffff" : "#f8faf9",
            border: `2px solid ${error ? "rgba(239,68,68,0.5)" : focused ? "rgba(34,197,94,0.5)" : "#e8eeeb"}`,
            color: "#1a3a2a",
            outline: "none",
            transition: "all 0.2s ease",
          }}
        />
        {suffix && (
          <div style={{
            position: "absolute",
            right: "4px",
            top: "50%",
            transform: "translateY(-50%)",
          }}>
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p style={{
          fontSize: "12px",
          fontWeight: 500,
          color: "#ef4444",
          marginTop: "6px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          <AlertIcon />
          {error}
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   SIGN IN PAGE
   ═══════════════════════════════════════════ */
export default function SignIn() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState("+998")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      navigate("/home")
      return
    }
    setMounted(true)
  }, [navigate])

  const validate = () => {
    let valid = true
    setPhoneError("")
    setPasswordError("")
    setGeneralError("")

    if (!/^\+998\d{9}$/.test(phone)) {
      setPhoneError("Telefon raqam +998XXXXXXXXX formatida bo'lishi kerak")
      valid = false
    }
    if (password.length < 6) {
      setPasswordError("Parol kamida 6 belgidan iborat bo'lishi kerak")
      valid = false
    }
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setGeneralError("")
    await new Promise((r) => setTimeout(r, 1200))

    if (phone === "+998901234567" && password === "password123") {
      localStorage.setItem("token", "meal-time-auth-token")
      navigate("/home")
    } else {
      setGeneralError("Telefon raqam yoki parol noto'g'ri!")
      setIsLoading(false)
    }
  }

  if (!mounted) return null

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
      {/* ── Background decorations ── */}
      <div style={{
        position: "absolute",
        top: "-150px",
        right: "-100px",
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
        left: "-80px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 60%)",
        filter: "blur(50px)",
        animation: "float-slow 12s ease-in-out 3s infinite",
      }} />
      <div style={{
        position: "absolute",
        top: "40%",
        left: "20%",
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(134,239,172,0.08) 0%, transparent 60%)",
        filter: "blur(40px)",
        animation: "float 8s ease-in-out 2s infinite",
      }} />
      {/* Grid pattern */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: 0.04,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }} />

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "640px",
        zIndex: 1,
      }}>
        {/* ─── Brand Header ─── */}
        <div style={{
          textAlign: "center",
          marginBottom: "32px",
          animation: "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}>
          {/* Logo icon */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}>
            <div style={{ position: "relative" }}>
              <div style={{
                width: "72px",
                height: "72px",
                borderRadius: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/>
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
              {/* Sparkle */}
              <div style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "#22c55e",
                border: "3px solid #166534",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(34,197,94,0.5)",
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                </svg>
              </div>
            </div>
          </div>

          <h1 style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.03em",
            marginBottom: "6px",
          }}>
            Meal Time
          </h1>
          <p style={{
            fontSize: "14px",
            color: "rgba(187, 247, 208, 0.7)",
            fontWeight: 400,
          }}>
            Sog'lom ovqatlanish — yangi hayot tarzi
          </p>
        </div>

        {/* ─── Form Card ─── */}
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "36px 32px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15)",
          position: "relative",
          overflow: "hidden",
          animation: "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both",
        }}>
          {/* Top accent */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #22c55e, #4ade80, #86efac, #4ade80, #22c55e)",
            backgroundSize: "200% 100%",
            animation: "gradient-shift 3s ease infinite",
          }} />

          {/* Heading */}
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#1a3a2a",
              letterSpacing: "-0.02em",
            }}>
              Hisobingizga kiring
            </h2>
            <p style={{
              fontSize: "14px",
              color: "#6b8f7b",
              marginTop: "4px",
            }}>
              Telefon raqam va parolingizni kiriting
            </p>
          </div>

          {/* General error */}
          {generalError && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 16px",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 600,
              marginBottom: "24px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              animation: "slide-down 0.4s ease both",
            }}>
              <AlertIcon />
              {generalError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Telefon raqam"
              icon={<PhoneIcon />}
              value={phone}
              onChange={(v) => { setPhone(v); setPhoneError(""); setGeneralError("") }}
              placeholder="+998 90 123 45 67"
              error={phoneError}
            />

            <FormInput
              label="Parol"
              icon={<LockIcon />}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(v) => { setPassword(v); setPasswordError(""); setGeneralError("") }}
              placeholder="Parolingizni kiriting"
              error={passwordError}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#94a3b8",
                    transition: "all 0.15s ease",
                  }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />

            {/* Forgot password */}
            <div style={{ textAlign: "right", marginTop: "-8px", marginBottom: "24px" }}>
              <button type="button" style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#16a34a",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "none",
                fontFamily: "inherit",
              }}>
                Parolni unutdingizmi?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                height: "52px",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: 700,
                fontFamily: "inherit",
                color: "white",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                background: "linear-gradient(135deg, #14532d 0%, #16a34a 60%, #22c55e 100%)",
                boxShadow: isLoading
                  ? "none"
                  : "0 6px 24px rgba(22, 163, 74, 0.4), 0 2px 8px rgba(22, 163, 74, 0.2)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                opacity: isLoading ? 0.85 : 1,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  <span>Kirilmoqda...</span>
                </>
              ) : (
                <>
                  <span>Kirish</span>
                  <ArrowRightIcon />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            margin: "28px 0 20px",
          }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)" }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Demo hisob</span>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)" }} />
          </div>

          {/* Demo credentials */}
          <div style={{
            padding: "16px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
            border: "1px solid rgba(34,197,94,0.15)",
          }}>
            <p style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#15803d",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              ✨ Test ma'lumotlari
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}>
              <div style={{
                padding: "10px 12px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.8)",
              }}>
                <p style={{ fontSize: "10px", fontWeight: 600, color: "#16a34a", marginBottom: "2px" }}>Telefon</p>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#1a3a2a", fontFamily: "monospace" }}>+998901234567</p>
              </div>
              <div style={{
                padding: "10px 12px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.8)",
              }}>
                <p style={{ fontSize: "10px", fontWeight: 600, color: "#16a34a", marginBottom: "2px" }}>Parol</p>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#1a3a2a", fontFamily: "monospace" }}>password123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          fontSize: "11px",
          color: "rgba(187, 247, 208, 0.4)",
          marginTop: "28px",
          animation: "fade-in 0.5s ease 0.6s both",
        }}>
          © 2025 Meal Time. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  )
}
