import React from "react"

interface CardDashboardProps {
  title: string
  value: number
  color: string // Warna background card
  details?: Record<string, number> // Data tambahan (opsional)
}

const CardDashboard: React.FC<CardDashboardProps> = ({ title, value, color, details }) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${color} w-60`}>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {details && (
        <div className="mt-2 text-sm text-gray-700">
          <h4 className="font-semibold mb-1">Details:</h4>
          <ul className="list-disc list-inside">
            {Object.entries(details).map(([type, count]) => (
              <li key={type}>
                {type}: <span className="font-bold">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default CardDashboard
