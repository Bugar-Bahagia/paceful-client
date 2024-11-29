import { useState, useRef, useEffect } from "react";
import axiosClient from "../utils/axiosClient"; // Ensure this is correctly configured to export axios instance

type GeminiAiProps = {
  onClose: () => void;
};

export default function GeminiAi({ onClose }: GeminiAiProps) {
  const [response, setResponse] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const formRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    try {
      // Ensure the 'genre' is URL-encoded to handle special characters or spaces
      const encodedGenre = encodeURIComponent(genre);

      // Send the GET request with the genre as a query parameter
      const { data } = await axiosClient.get("http://localhost:3000/gemini", {
        params: { genre: encodedGenre }, // Pass genre as query param
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach token
        },
      });

      // Handle the response
      if (data?.result) {
        setResponse(data.result);  // Display the 'result' returned from the server
      } else {
        setResponse("No response received.");
      }
    } catch (error) {
      console.error("🚀 ~ handleSend ~ error:", error);
      setResponse("An error occurred while fetching the instructions.");
    }
  };

  // Close the form if a click happens outside of it
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="flex justify-center p-4">
      <div ref={formRef} className="w-full max-w-md p-4 bg-white rounded-md shadow-md px-12">
        <h2 className="text-black text-lg font-semibold mb-2 text-center">
          Gemini AI Work Out Instructions
        </h2>

        <input
          type="text"
          placeholder="Enter work out genre (e.g., run, swim)"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
        <button
          onClick={handleSend}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-4"
        >
          Generate Instructions
        </button>
        {response && (
          <div className="mt-4 p-2 bg-black border rounded text-white">
            <h3 className="font-semibold">Instructions:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
