import { useState } from "react";
import GeminiAi from "../components/Gemini";

export default function Home() {
  const [showGemini, setShowGemini] = useState(false);

  const handleOpenGemini = () => {
    setShowGemini(true);
  };

  const handleCloseGemini = () => {
    setShowGemini(false);
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      
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
  );
}
