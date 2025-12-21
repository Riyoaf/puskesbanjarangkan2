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

  const completedRegistrations = registrations?.filter(r => r.status === 'completed') || []

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Riwayat Vaksinasi</h1>
        <p className={styles.pageSubtitle}>Riwayat vaksinasi yang telah anda terima</p>
      </div>

      <div className={styles.contentWrapper}>
        <h2 className={styles.sectionTitle}>Kartu Vaksinasi</h2>
        <p className={styles.sectionSubtitle}>{completedRegistrations.length} vaksinasi telah selesai</p>
        
        <div className={styles.list}>
          {completedRegistrations.length > 0 ? (
            completedRegistrations.map((reg) => (
              <div key={reg.id} className={styles.card}>
                {/* Card Header - Green */}
                <div className={styles.cardHeader}>
                  <div className={styles.badgeContainer}>
                    <span className={styles.headerBadge}>Kartu Vaksin</span>
                    <div className={styles.checkIcon}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <h3 className={styles.vaccineTitle}>{reg.vaccines?.name}</h3>
                </div>
                
                {/* Card Body - White */}
                <div className={styles.cardBody}>
                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>👤</span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>Nama Pasien</span>
                      <span className={styles.rowValue}>{reg.patient_name}</span>
                    </div>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>🆔</span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>NIK</span>
                      <span className={styles.rowValue}>{reg.nik}</span>
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>📅</span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>Tanggal Vaksinasi</span>
                      <span className={styles.rowValue}>
                        {reg.scheduled_date 
                          ? new Date(reg.scheduled_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                          : '-'
                        }
                      </span>
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>📍</span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>Tempat Vaksinasi</span>
                      <span className={styles.rowValue}>Puskesmas Banjarangkan 2</span>
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>⏰</span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>Waktu</span>
                      <span className={styles.rowValue}>{reg.vaccination_time || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer - Verified */}
                <div className={styles.cardFooter}>
                  <svg className={styles.verifiedIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Terverifikasi</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>Belum ada riwayat imunisasi yang selesai.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
