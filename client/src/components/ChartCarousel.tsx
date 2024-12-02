import React, { useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
import ChartComponent from "./Chart"
import axios from "axios"

const baseURL = "http://localhost:3000"



interface ChartDataProps {
  id?: number
  UserId?: number
  typeName?: string
  duration?: string
  distance?: string
  caloriesBurned?: number
  activityDate: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}

interface APIResponse {
  totalActivity: number
  totalPage: number
  currPage: number
  activities: ChartDataProps[]
}

const ChartCarousel: React.FC = () => {
  const [activities, setActivities] = useState<ChartDataProps[]>([])
  const [selectedDataType, setSelectedDataType] = useState<string>("caloriesBurned")

  const fetchActivity = async () => {
    try {
      const access_token = localStorage.getItem("token")
      const { data }: { data: APIResponse } = await axios.get(`${baseURL}/activities`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      const sortedActivities = data.activities
        .sort(
          (a: ChartDataProps, b: ChartDataProps) =>
            new Date(b.activityDate).getTime() - new Date(a.activityDate).getTime()
        )
        .slice(0, 5)
        .reverse()
      setActivities(sortedActivities)
    } catch (error) {
      console.error("Failed to fetch activities:", error)
    }
  }

  useEffect(() => {
    fetchActivity()
  }, [])

  const activityDates = activities.map((activity) =>
    new Date(activity.activityDate).toISOString().split("T")[0]
  )

  // const getDataByType = () => {
  //   switch (selectedDataType) {
  //     case "caloriesBurned":
  //       return activities.map((activity) => activity.caloriesBurned || 0)
  //     case "duration":
  //       return activities.map((activity) => Number(activity.duration) || 0)
  //     default:
  //       return []
  //   }
  // }
  const getDataByType = () => {
    return activities.map((activity) =>
      selectedDataType === "caloriesBurned"
        ? activity.caloriesBurned || 0
        : Number(activity.duration) || 0
    )
  }

  // const chartLabel =
  //   selectedDataType === "caloriesBurned" ? "Calories Burned" : "Activities Duration (Minutes)"
  const chartLabel =
    selectedDataType === "caloriesBurned"
      ? "Calories Burned"
      : "Activities Duration (Minutes)"

  const chartData = {
    labels: activityDates,
    datasets: [
      {
        label: chartLabel,
        data: getDataByType(),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,         // Membuat chart responsif terhadap ukuran pembungkus
    maintainAspectRatio: false, // Agar chart bisa disesuaikan dengan ukuran pembungkus
    plugins: {
      legend: {
        onClick: () => { },
        labels: {
          font: { size: 14 },
          color: "#000",
          textDecoration: "none",
        },
      },
    },
  }


  return (
    <div className="max-w-full mx-auto p-4" style={{ maxWidth: "600px", margin: "0 auto", overflow: "hidden" }}>
      <div className="my-4">
        <select
          id="dataType"
          value={selectedDataType}
          onChange={(e) => setSelectedDataType(e.target.value)}
          className="p-2 border"
        >
          <option value="caloriesBurned">Calories Burned</option>
          <option value="duration">Activities Duration</option>
        </select>
      </div>


      <Carousel showArrows={true} infiniteLoop={false} autoPlay={false} showThumbs={false}>
        {
          [<div key={chartLabel}>
            <h2 style={{ textDecoration: "none" }}>{chartLabel}</h2>
            <ChartComponent labels={activityDates} datasets={chartData.datasets} options={chartOptions} />
          </div>]
        }
      </Carousel>
    </div>
  )
}

export default ChartCarousel
