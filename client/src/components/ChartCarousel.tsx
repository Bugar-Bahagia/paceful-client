import { useEffect, useState } from 'react'
import { Carousel } from "react-responsive-carousel"
import ChartComponent from './Chart'
import axios from 'axios'
const baseURL = 'http://localhost:3000'

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

const ChartCarousel = () => {
  const [activities, setActivities] = useState<ChartDataProps[]>([])

  // Fungsi untuk mendapatkan rentang tanggal
  const getDateRange = () => {
    if (activities.length === 0) return []

    const firstDate = new Date(activities[0].activityDate)

    const range = []
    for (let i = -2;i <= 2;i++) {
      const date = new Date(firstDate)
      date.setDate(firstDate.getDate() + i)
      range.push(date.toISOString().split('T')[0]) // Format: YYYY-MM-DD
    }
    return range
  }

  // Ambil data aktivitas yang ada
  const fetchActivity = async () => {
    const access_token = await localStorage.getItem("token")
    const responseActivities = await axios.get(`${baseURL}/activities`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    setActivities(responseActivities.data)
  }

  useEffect(() => {
    fetchActivity()
  }, [])

  // Tentukan rentang tanggal (labels) untuk sumbu X
  const activityDates = getDateRange()

  // Menyusun data untuk grafik
  const caloriesBurnedArray = activityDates.map(date => {
    const activity = activities.find(activity => activity.activityDate === date)
    return activity ? activity.caloriesBurned ?? 0 : 0
  })

  const durationActivityArray = activityDates.map(date => {
    const activity = activities.find(activity => activity.activityDate === date)
    return activity ? Number(activity.duration) || 0 : 0
  })

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Carousel */}
      <Carousel showArrows={true} infiniteLoop={false} autoPlay={false} showThumbs={false}>
        {/* Slide 1: Calories Burned */}
        <div>
          <h2>Calories Burned</h2>
          <ChartComponent labels={activityDates} data={caloriesBurnedArray} />
        </div>

        {/* Slide 2: Activities Duration */}
        <div>
          <h2>Activities Duration (Minutes)</h2>
          <ChartComponent labels={activityDates} data={durationActivityArray} />
        </div>
      </Carousel>
    </div>
  )
}

export default ChartCarousel
