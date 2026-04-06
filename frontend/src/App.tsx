import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"

import PersonalInfo from "./pages/profile/PersonalInfo"
import OrderHistory from "./pages/profile/OrderHistory"
import Settings from "./pages/profile/Settings"
import Privacy from "./pages/profile/Privacy"
import About from "./pages/profile/About"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/info" element={<PersonalInfo />} />
        <Route path="/profile/history" element={<OrderHistory />} />
        <Route path="/profile/settings" element={<Settings />} />
        <Route path="/profile/privacy" element={<Privacy />} />
        <Route path="/profile/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
