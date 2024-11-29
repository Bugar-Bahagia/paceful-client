import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartProps {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
    borderColor: string
    borderWidth: number
  }[]
}

const ChartComponent: React.FC<ChartProps> = ({ labels, datasets }) => {
  const data = {
    labels,
    datasets,
  }

  return <Bar data={data} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
}

export default ChartComponent
