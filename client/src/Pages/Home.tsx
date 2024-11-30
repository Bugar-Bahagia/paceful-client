import { useState } from "react"
import GeminiAi from "../components/Gemini"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Dashboard from "../components/DashboardData"
import ChartCarousel from '../components/ChartCarousel'

export default function Home() {
  const [showGemini, setShowGemini] = useState(false)

  const handleOpenGemini = () => setShowGemini(true)
  const handleCloseGemini = () => setShowGemini(false)
  

  return (
    <div className="relative">
      <h1>Welcome to Home Page</h1>

      <Dashboard />
      
      {/* Floating Button with Image */}
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

      {/* Gemini AI Modal centered */}
      {showGemini && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-opacity-50 bg-black">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <GeminiAi onClose={handleCloseGemini} />
          </div>
        </div>
      )}
    </div>
  )
}
