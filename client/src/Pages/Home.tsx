import { useState } from "react"
import GeminiAi from "../components/Gemini"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Dashboard from "../components/DashboardData"

export default function Home() {
  const [showGemini, setShowGemini] = useState(false)

  const handleOpenGemini = () => setShowGemini(true)
  const handleCloseGemini = () => setShowGemini(false)

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <Dashboard />
      <button
        onClick={handleOpenGemini}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-full shadow-lg"
        style={{ background: "none", border: "none" }}
      >
        <img
          src="https://premiercloud.com/wp-content/uploads/2024/07/google-gemini-icon.png"
          alt="Gemini AI"
          className="w-12 h-12"
        />
      </button>
      {showGemini && <GeminiAi onClose={handleCloseGemini} />}
    </div>
  )
}
