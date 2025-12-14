import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cancelSchedule } from './actions'
import styles from './page.module.css'
import CancelButton from './CancelButton'

export default async function SchedulePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: registrations } = await supabase
    .from('registrations')
    .select(`
      *,
      vaccines (name)
    `)
    .eq('user_id', user?.id)
    .neq('status', 'cancelled') // Don't show cancelled
    .neq('status', 'rejected')  // Don't show rejected
    .neq('status', 'completed') // Don't show completed (maybe move to history?)
    // User said "Jadwal Mendatang", so likely only pending/approved
    .order('scheduled_date', { ascending: true })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Jadwal Vaksinasi Saya</h1>
          <p className={styles.subtitle}>Kelola dan pantau jadwal vaksinasi anda</p>
        </div>
        <Link href="/vaccination" className={styles.btnNew}>
          ➕ Daftar Baru
        </Link>
      </div>

      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Jadwal Mendatang</h2>
        <p className={styles.sectionSubtitle}>
          {registrations?.length || 0} jadwal yang perlu anda hadiri
        </p>

        <div className={styles.list}>
          {Array.isArray(registrations) && registrations.length > 0 ? (
            registrations.map((reg) => (
              <div key={reg.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.vaccineInfo}>
                    <h3 className={styles.vaccineName}>{reg.vaccines?.name}</h3>
                    <span className={`${styles.badge} ${styles[reg.status]}`}>
                      {reg.status === 'pending' ? 'Menunggu' : 'Terjadwal'}
                    </span>
                  </div>
                  <div className={styles.queueBox}>
                    <span className={styles.queueNumber}># {reg.queue_number || 'A-???'}</span>
                    <span className={styles.queueLabel}>Antrian</span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.icon}>📅</span>
                      <div>
                        <p className={styles.infoLabel}>Tanggal</p>
                        <p className={styles.infoValue}>
                          {reg.scheduled_date 
                            ? new Date(reg.scheduled_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                            : 'Menunggu Jadwal'}
                        </p>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.icon}>🕒</span>
                      <div>
                        <p className={styles.infoLabel}>Waktu</p>
                        <p className={styles.infoValue}>{reg.vaccination_time || '00.00 WITA'}</p>
                      </div>
                    </div>
                    <div className={styles.infoItemFull}>
                      <span className={styles.icon}>📍</span>
                      <div>
                        <p className={styles.infoLabel}>Lokasi</p>
                        <p className={styles.infoValue}>Puskesmas Banjarangkan II</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  {(reg.status === 'pending' || reg.status === 'approved') && (
                    <CancelButton id={reg.id} />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Tidak ada jadwal vaksinasi mendatang.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
