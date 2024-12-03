import { useState } from "react"
import GeminiAi from "../components/Gemini"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Dashboard from "../components/DashboardData"
import ActivityLog from '../components/ActivityLog'


export default function Home() {
  const [showGemini, setShowGemini] = useState(false)

  const handleOpenGemini = () => setShowGemini(true)
  const handleCloseGemini = () => setShowGemini(false)

  return (
    <div className="relative">
      <h1 className="text-center mt-10 text-3xl font-bold">Your Adventure Starts Here</h1>


      <Dashboard />

      <ActivityLog />

     {/* Floating Button with Tooltip */}
<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
  <div className="relative group">
    <button
      onClick={handleOpenGemini}
      className="p-4 rounded-full shadow-lg"
      style={{ background: 'none', border: 'none' }}
    >
      <img
        src="https://premiercloud.com/wp-content/uploads/2024/07/google-gemini-icon.png"
        alt="Gemini AI"
        className="w-12 h-12"
      />
    </button>
    {/* Tooltip */}
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
      I am Gemini
    </div>
  </div>
</div>

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
