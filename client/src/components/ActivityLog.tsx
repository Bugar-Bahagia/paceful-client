import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" // Impor useNavigate

const baseURL = "https://hacktiv.fathanabds.online"

interface Activity {
  typeName: string
  duration: string
  distance: string
  caloriesBurned: string
  activityDate: string
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
  const formatDuration = (duration: string): string => {
    const totalMinutes = parseInt(duration, 10)
    if (isNaN(totalMinutes)) return "Invalid Duration"

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours} hours ${minutes} minutes`
  }
  const formatDistance = (distance: string): string => {
    const totalMeters = parseFloat(distance)
    if (isNaN(totalMeters)) return "Invalid Distance"

    const kilometers = totalMeters / 1000
    return `${kilometers.toFixed(2)} km`
  }
  const formatCalories = (calories: string): string => {
    const totalCalories = parseFloat(calories)
    if (isNaN(totalCalories)) return "Invalid Calories"

    // Konversi kalori ke kilokalori dengan dua desimal
    const kilocalories = totalCalories / 1000
    return `${kilocalories.toFixed(2)} kcal`
  }

  return (
    <div className="mb-10 w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-center sm:text-left">Activity Log</h2>
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded mt-4 sm:mt-0"
          onClick={() => navigate("/activity-log")}
        >
          + Add New Activity
        </button>
      </div>

      <table className="min-w-full table-auto overflow-x-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 py-1 text-left text-xs sm:text-xs md:text-sm">Activity Type</th>
            <th className="px-2 py-1 text-left text-xs sm:text-xs md:text-sm">Duration</th>
            <th className="px-2 py-1 text-left text-xs sm:text-xs md:text-sm">Distance</th>
            <th className="px-2 py-1 text-left text-xs sm:text-xs md:text-sm">Calories Burned</th>
            <th className="px-2 py-1 text-left text-xs sm:text-xs md:text-sm">Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => {
            const formattedDate = formatDate(activity.activityDate || '')
            const formattedDuration = formatDuration(activity.duration || "0")
            const formattedDistance = formatDistance(activity.distance || "0")
            const formattedCalories = formatCalories(activity.caloriesBurned || "0")
            return (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-2 py-1 text-xs sm:text-xs md:text-sm">{activity.typeName || 'N/A'}</td>
                <td className="px-2 py-1 text-xs sm:text-xs md:text-sm">{formattedDuration || '0'}</td>
                <td className="px-2 py-1 text-xs sm:text-xs md:text-sm">{formattedDistance || '0'}</td>
                <td className="px-2 py-1 text-xs sm:text-xs md:text-sm">{formattedCalories || '0'}</td>
                <td className="px-2 py-1 text-xs sm:text-xs md:text-sm">{formattedDate || 'No Date'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          className="bg-gray-200 text-blue-600 px-4 py-2 rounded"
          onClick={() => navigate("/activity-log")}
        >
          See More
        </button>
      </div>
    </div>

  )
}
