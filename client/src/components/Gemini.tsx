import { useState, useRef, useEffect } from 'react'
import axiosClient from '../utils/axiosClient' // Ensure this is correctly configured to export axios instance
import ReactMarkdown from 'react-markdown'

type GeminiAiProps = {
  onClose: () => void
}

export default function GeminiAi({ onClose }: GeminiAiProps) {
  const [response, setResponse] = useState<string>('')
  const [genre, setGenre] = useState<string>('')
  const formRef = useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    try {
      // Ensure the 'genre' is URL-encoded to handle special characters or spaces
      const encodedGenre = encodeURIComponent(genre)

      // Send the GET request with the genre as a query parameter
      const { data } = await axiosClient.get('/gemini', {
        params: { genre: encodedGenre }, // Pass genre as query param
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach token
        },
      })

      // Handle the response
      if (data?.result) {
        setResponse(data.result) // Display the 'result' returned from the server
      } else {
        setResponse('No response received.')
      }
    } catch (error) {
      console.error('🚀 ~ handleSend ~ error:', error)
      setResponse('An error occurred while fetching the instructions.')
    }
  }

  // Close the form if a click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={formRef} className="bg-white rounded-lg shadow-lg max-w-sm md:max-w-2xl w-full mx-4">
        <div className="p-4 md:p-6">
          <h2 className="text-black text-xl font-semibold mb-4 text-center">
            Gemini AI Work Out Instructions
          </h2>


          <input
            type="text"
            placeholder="Enter work out genre (e.g., run, swim)"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-sm sm:text-base"
          />
          <button
            onClick={handleSend}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Generate Instructions
          </button>
          {response && (
            <div className="mt-4 p-2 bg-gray-50 border rounded prose max-w-2xl max-h-64 overflow-y-auto">
              <h3 className="font-semibold mb-2">Instructions:</h3>
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )

}
