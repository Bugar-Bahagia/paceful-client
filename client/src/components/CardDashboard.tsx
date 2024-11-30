interface CardDashboardProps {
  title: string
  value: number
  color: string
  details?: Record<string, number> // Tambahan untuk aktivitas per tipe
}

export default function CardDashboard({ title, value, color, details }: CardDashboardProps) {
  return (
    <div className={`p-4 rounded shadow ${color}`}>
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-2xl">{value}</p>

      {/* Render detail jika ada */}
      {details && (
        <div className="mt-2">
          <h3 className="text-sm font-semibold">Activities by:</h3>
          <ul className="text-sm">
            {Object.entries(details).map(([typeName, count]) => (
              <li key={typeName}>
                {typeName}: {count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
