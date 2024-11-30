import { useEffect, useState } from "react"
import CardDashboard from "./CardDashboard"
import ChartCarousel from "./ChartCarousel"

const baseURL = "http://localhost:3000"

interface DashboardData {
  totalGoals: number
  totalActivities: number
  totalGoalsAchieved: number
  typeNameCounts: Record<string, number> // Jumlah aktivitas berdasarkan typeName
}

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalGoals: 0,
    totalActivities: 0,
    totalGoalsAchieved: 0,
    typeNameCounts: {}, // Awalnya kosong
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token")

        if (!token) {
          console.error("No token found. Please log in.")
          return
        }

        const headers = { Authorization: `Bearer ${token}` }

        // Fetch total goals
        const goalsResponse = await fetch(`${baseURL}/goals`, { headers })
        const goalsData = await goalsResponse.json()
        const totalGoals = goalsData.length

        // Fetch total activities
        const activitiesResponse = await fetch(`${baseURL}/activities`, { headers })
        const activitiesData = await activitiesResponse.json()

        const totalActivities = activitiesData.length

        // Group activities by typeName
        const typeNameCounts: Record<string, number> = activitiesData.reduce(
          (acc: Record<string, number>, activity: { typeName: string }) => {
            acc[activity.typeName] = (acc[activity.typeName] || 0) + 1
            return acc
          },
          {}
        )

        // Fetch achieved goals
        const achievedGoalsResponse = await fetch(`${baseURL}/goals/achieved`, { headers })
        const achievedGoalsData = await achievedGoalsResponse.json()
        const totalGoalsAchieved = achievedGoalsData.length

        setDashboardData({ totalGoals, totalActivities, totalGoalsAchieved, typeNameCounts })
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-4 justify-center">
        <CardDashboard
          title="Total Goals"
          value={dashboardData.totalGoals}
          color="bg-blue-200"
        />
        <CardDashboard
          title="Total Activities"
          value={dashboardData.totalActivities}
          color="bg-green-200"
          details={dashboardData.typeNameCounts} // Kirimkan data aktivitas berdasarkan tipe
        />
        <CardDashboard
          title="Total Goals Achieved"
          value={dashboardData.totalGoalsAchieved}
          color="bg-yellow-200"
        />
      </div>

      <ChartCarousel />
    </div>
  )
}
