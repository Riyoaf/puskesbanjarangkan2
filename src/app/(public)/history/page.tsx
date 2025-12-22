import { createClient } from '@/utils/supabase/server'
import styles from './page.module.css'
import { 
  CheckIcon, 
  CheckBadgeIcon, 
  UserIcon, 
  IdentificationIcon, 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline'

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
                      <CheckIcon className="w-4 h-4" style={{ width: 14, height: 14, color: 'white' }} />
                    </div>
                  </div>
                  <h3 className={styles.vaccineTitle}>{reg.vaccines?.name}</h3>
                </div>
                
                {/* Card Body - White */}
                <div className={styles.cardBody}>
                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>
                      <UserIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                    </span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>Nama Pasien</span>
                      <span className={styles.rowValue}>{reg.patient_name}</span>
                    </div>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>
                      <IdentificationIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                    </span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>NIK</span>
                      <span className={styles.rowValue}>{reg.nik}</span>
                    </div>
                  </div>

                  <div className={styles.divider}></div>

                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>
                      <CalendarIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                    </span>
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
                    <span className={styles.rowIcon}>
                      <MapPinIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                    </span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>Tempat Vaksinasi</span>
                      <span className={styles.rowValue}>Puskesmas Banjarangkan 2</span>
                    </div>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.rowIcon}>
                      <ClockIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                    </span>
                    <div className={styles.rowContent}>
                      <span className={styles.rowLabel}>Waktu</span>
                      <span className={styles.rowValue}>{reg.vaccination_time || '-'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer - Verified */}
                <div className={styles.cardFooter}>
                  <CheckBadgeIcon className={styles.verifiedIcon} style={{ width: 20, height: 20 }} />
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
