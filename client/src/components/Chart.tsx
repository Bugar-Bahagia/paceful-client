import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js"
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
  options?: ChartOptions<"bar"> // Gunakan tipe yang spesifik dari Chart.js
}

const ChartComponent: React.FC<ChartProps> = ({ labels, datasets, options }) => {
  const data = {
    labels,
    datasets,
  }

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Bar
        data={data}
        options={{
          ...options,
          responsive: true,
          maintainAspectRatio: false, // Menyesuaikan chart agar tidak mengikuti rasio aspek default
        }}
      />
    </div>
  )
}

export default ChartComponent
