import { useEffect, useState } from "react"
import CardDashboard from "./CardDashboard"
import ChartCarousel from "./ChartCarousel"

const baseURL = "https://hacktiv.fathanabds.online"

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
        const totalGoals = goalsData.totalGoal

        // Fetch total activities
        const activitiesResponse = await fetch(`${baseURL}/activities`, { headers })
        const activitiesData = await activitiesResponse.json()

        const totalActivities = activitiesData.totalActivity

        // Group activities by typeName
        const typeNameCounts: Record<string, number> = activitiesData.activities.reduce(
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
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <CardDashboard
          title="Total Goals"
          value={dashboardData.totalGoals}
          color="bg-blue-200"
        />
        <CardDashboard
          title="Total Activities"
          value={dashboardData.totalActivities}
          color="bg-green-200"
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
