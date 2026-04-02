import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SignIn from "./pages/SignIn"
import Welcome from "./pages/Welcome"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
