import { createClient } from '@/utils/supabase/server'
import styles from './page.module.css'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: registrations } = await supabase
    .from('registrations')
    .select(`
      *,
      vaccines (name)
    `)
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className={styles.title}>Riwayat Imunisasi</h1>
      
      <div className={styles.list}>
        {registrations && registrations.filter(r => r.status === 'completed').length > 0 ? (
          registrations.filter(r => r.status === 'completed').map((reg) => (
            <div key={reg.id} className={`card ${styles.card}`}>
              <div className={styles.header}>
                <h3>{reg.vaccines?.name}</h3>
                <span className={`${styles.badge} ${styles.completed}`}>
                  Selesai
                </span>
              </div>
              
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Nama Pasien:</span>
                  <span className={styles.value}>{reg.patient_name}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>NIK:</span>
                  <span className={styles.value}>{reg.nik}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Tanggal Vaksinasi:</span>
                  <span className={styles.value}>
                    {reg.scheduled_date 
                      ? new Date(reg.scheduled_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                      : '-'
                    }
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Waktu:</span>
                  <span className={styles.value}>{reg.vaccination_time || '-'}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Belum ada riwayat imunisasi yang selesai.</p>
        )}
      </div>
    </div>
  )
}
