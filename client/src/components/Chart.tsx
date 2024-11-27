
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

// Register komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartProps {
  labels?: string[] // Label untuk sumbu X
  data?: number[]   // Data batang
}

// interface ChartDataProps {
//   id?: number
//   UserId?: number
//   typeName?: string
//   duration?: string
//   distance?: string
//   caloriesBurned?: number
//   activityDate?: string
//   notes?: string
//   createdAt?: string
//   updatedAt?: string
// }

const ChartComponent: React.FC<ChartProps> = ({ labels, data }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Data",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  }

  return <Bar data={chartData} options={options} />
}

export default ChartComponent
