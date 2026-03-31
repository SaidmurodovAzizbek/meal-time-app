import { BrowserRouter, Routes, Route } from "react-router-dom"
import Welcome from "./pages/Welcome"
import AuthLayout from "./pages/auth/AuthLayout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Verify from "./pages/auth/Verify"
import Setup from "./pages/auth/Setup"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify" element={<Verify />} />
          <Route path="setup" element={<Setup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
