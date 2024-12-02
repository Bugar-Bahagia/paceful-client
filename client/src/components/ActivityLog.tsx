import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" // Impor useNavigate

const baseURL = "http://localhost:3000"

interface Activity {
  typeName: string
  duration: string
  distance: string
  caloriesBurned: string
  createdAt?: string
  updatedAt?: string
}

export default function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([])
  const navigate = useNavigate() // Inisialisasi navigate

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          console.error("No token found. Please log in.")
          return
        }

        const headers = { Authorization: `Bearer ${token}` }

        const response = await fetch(`${baseURL}/activities`, { headers })
        const data = await response.json()

        console.log(data.activities, 'client')

        setActivities(data.activities || [])
      } catch (error) {
        console.error("Error fetching activities:", error)
      }
    }

    fetchActivities()
  }, [])

  // Fungsi untuk format tanggal agar sesuai dengan format yang diinginkan
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toISOString().split("T")[0]
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Activity Log</h2>
        {/* Tombol navigasi ke halaman Activity Log */}
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded"
          onClick={() => navigate("/activity-log")} // Navigasi ke halaman Activity Log
        >
          + Add New Activity
        </button>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Activity Type</th>
            <th className="px-4 py-2 text-left">Duration</th>
            <th className="px-4 py-2 text-left">Distance</th>
            <th className="px-4 py-2 text-left">Calories Burned</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => {
            const formattedDate = formatDate(activity.createdAt || activity.updatedAt || '')  // Menggunakan createdAt atau updatedAt
            return (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{activity.typeName || 'N/A'}</td>
                <td className="px-4 py-2">{activity.duration || '0'}</td>
                <td className="px-4 py-2">{activity.distance || '0'}</td>
                <td className="px-4 py-2">{activity.caloriesBurned || '0'}</td>
                <td className="px-4 py-2">{formattedDate || 'No Date'}</td>  {/* Tampilkan tanggal yang diformat */}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-200 text-blue-600 px-4 py-2 rounded"
          onClick={() => navigate("/activity-log")} // Navigasi ke halaman lebih banyak aktivitas
        >
          See More
        </button>
      </div>
    </div>
  )
}
