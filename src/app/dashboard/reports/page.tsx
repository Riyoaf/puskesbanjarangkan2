import { createClient } from '@/utils/supabase/server'
import styles from './page.module.css'

export default async function ReportsPage() {
  const supabase = await createClient()

  // Fetch summary stats
  const { count: totalPatients } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'patient')

  const { count: totalVaccinations } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'completed')

  // Fetch vaccine types
  const { data: vaccines } = await supabase
    .from('vaccines')
    .select('id, name')

  // Fetch completed registrations with vaccine_id
  const { data: completedRegs } = await supabase
    .from('registrations')
    .select('vaccine_id')
    .eq('status', 'completed')

  // Calculate doses per vaccine
  const vaccineStats = vaccines?.map(v => {
    const count = completedRegs?.filter(r => r.vaccine_id === v.id).length || 0
    return { name: v.name, count }
  }) || []

  return (
    <div>
      <h1 className={styles.title}>Laporan</h1>
      
      <div className={styles.statsGrid}>
        <div className="card">
          <h3>Total Pasien</h3>
          <p className={styles.statValue}>{totalPatients || 0}</p>
        </div>
        <div className="card">
          <h3>Imunisasi Selesai</h3>
          <p className={styles.statValue}>{totalVaccinations || 0}</p>
        </div>
        <div className="card">
          <h3>Total Dosis per Jenis</h3>
          <div style={{ marginTop: '1rem' }}>
            {vaccineStats.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {vaccineStats.map((stat, idx) => (
                  <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.25rem' }}>
                    <span>{stat.name}</span>
                    <span style={{ fontWeight: 'bold' }}>{stat.count}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '0.9rem', color: '#666' }}>Belum ada data</p>
            )}
          </div>
        </div>
      </div>

      <div className={`card ${styles.exportCard}`}>
        <h3>Export Data</h3>
        <p>Unduh laporan lengkap data imunisasi dalam format CSV.</p>
        {/* Simple CSV download link/button logic would go here. 
            For MVP, we can just show the button or implement a simple client-side download if needed.
            Since this is a server component, we'd need a client component or route handler for the download.
        */}
        <button className="btn btn-primary" disabled title="Fitur akan segera hadir">
          Download Laporan (CSV)
        </button>
      </div>
    </div>
  )
}
