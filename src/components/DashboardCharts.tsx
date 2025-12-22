'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function DashboardCharts({ visits }: { visits: any[] }) {
  // Format data for chart (ensure we have last 7 days)
  const chartData = []
  const today = new Date()
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    const visitEntry = visits.find((v: any) => v.visit_date === dateStr)
    
    chartData.push({
      date: d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' }),
      visits: visitEntry ? visitEntry.count : 0
    })
  }

  return (
    <div style={{ width: '100%', marginTop: '2rem', background: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <h3 style={{ marginBottom: '1rem', color: '#333' }}>Statistik Kunjungan (7 Hari Terakhir)</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" name="Jumlah Kunjungan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
