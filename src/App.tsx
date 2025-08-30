import { Routes, Route, Navigate } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* Add more routes here as needed */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
