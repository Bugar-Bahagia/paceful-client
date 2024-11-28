
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
  activityDate?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}

const ChartCarousel = () => {
  const [activities, setActivities] = useState<ChartDataProps[]>([])

  const caloriesBurnedArray = activities.map(activity => activity?.caloriesBurned || 0)
  const durationActivityArray = activities.map(activity => (Number(activity?.duration || 0)))
  const calorieLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  const fetchActivity = async () => {

    const access_token = await localStorage.getItem("token")
    const responseActivities = await axios.get(`${baseURL}/activities`, {
      headers: {
        Authorization: `Bearer ${access_token}`, // Pass the Bearer token here
      },
    })

    setActivities(responseActivities.data)

  }

  useEffect(() => {
    fetchActivity()
  }, [])

  console.log(activities)

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      {/* Carousel */}
      <Carousel showArrows={true} infiniteLoop={false} autoPlay={false} showThumbs={false}>
        {/* Slide 1: Calories Burned */}
        <div>
          <h2>Calories Burned</h2>
          <ChartComponent labels={calorieLabels} data={caloriesBurnedArray} />
        </div>

        {/* Slide 2: Activities Duration */}
        <div>
          <h2>Activities Duration (Minutes)</h2>
          <ChartComponent labels={calorieLabels} data={durationActivityArray} />
        </div>
      </Carousel>
    </div>
  )
}

export default ChartCarousel
