import { useState } from "react"
import GeminiAi from "../components/Gemini"
// import ChartComponent from '../components/Chart'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import ChartCarousel from '../components/ChartCarousel'
// import { Carousel } from "react-responsive-carousel"

export default function Home() {
  const [showGemini, setShowGemini] = useState(false)
  // const calorieLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  // const calorieData = [4, 0, 0, 0, 0]

  // // Data untuk Activities Duration
  // const durationLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  // const durationData = [30, 45, 20, 35, 50, 70, 100, 20, 30] // dalam menit


  const handleOpenGemini = () => {
    setShowGemini(true)
  }

  const handleCloseGemini = () => {
    setShowGemini(false)
  }

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <ChartCarousel />
      {/* Floating Button with Image */}
      <button
        onClick={handleOpenGemini}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-full shadow-lg"
        style={{ background: "none", border: "none" }}
      >
        <img
          src="https://premiercloud.com/wp-content/uploads/2024/07/google-gemini-icon.png"
          alt="Gemini AI"
          className="w-12 h-12" // Adjust size as needed
        />
      </button>

      {/* Gemini AI Modal */}
      {showGemini && <GeminiAi onClose={handleCloseGemini} />}
    </div>
  )
}
