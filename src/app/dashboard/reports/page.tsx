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

  const { count: pendingRegistrations } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  return (
    <div>
      <h1 className={styles.title}>Laporan & Statistik</h1>
      
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
          <h3>Menunggu Verifikasi</h3>
          <p className={styles.statValue}>{pendingRegistrations || 0}</p>
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
