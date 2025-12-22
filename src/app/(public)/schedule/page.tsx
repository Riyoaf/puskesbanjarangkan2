import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cancelSchedule } from './actions'
import styles from './page.module.css'
import CancelButton from './CancelButton'

import { 
  PlusIcon, 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  HashtagIcon 
} from '@heroicons/react/24/outline'

export default async function SchedulePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: allRegistrations } = await supabase
    .from('registrations')
    .select(`
      *,
      vaccines (name)
    `)
    .eq('user_id', user?.id)
    .order('scheduled_date', { ascending: true })

  const upcoming = allRegistrations?.filter(r => ['pending', 'approved'].includes(r.status)) || []
  const history = allRegistrations?.filter(r => ['completed', 'cancelled', 'rejected'].includes(r.status)) || []

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Jadwal Vaksinasi Saya</h1>
          <p className={styles.subtitle}>Kelola dan pantau jadwal vaksinasi anda</p>
        </div>
        <Link href="/vaccination" className={styles.btnNew}>
          <PlusIcon className="w-5 h-5" style={{ width: 20, height: 20, marginRight: 8 }} /> Daftar Baru
        </Link>
      </div>

      <div className={styles.content}>
        <h2 className={styles.sectionTitle}>Jadwal Mendatang</h2>
        <p className={styles.sectionSubtitle}>
          {upcoming.length || 0} jadwal yang perlu anda hadiri
        </p>

        <div className={styles.list}>
          {upcoming.length > 0 ? (
            upcoming.map((reg) => (
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
                      <span className={styles.icon}>
                        <CalendarIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                      </span>
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
                      <span className={styles.icon}>
                        <ClockIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                      </span>
                      <div>
                        <p className={styles.infoLabel}>Waktu</p>
                        <p className={styles.infoValue}>{reg.vaccination_time || '00.00 WITA'}</p>
                      </div>
                    </div>
                    <div className={styles.infoItemFull}>
                      <span className={styles.icon}>
                        <MapPinIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                      </span>
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

        {/* History Section */}
        <div className={styles.historySection}>
          <h2 className={styles.sectionTitle}>Riwayat Jadwal</h2>
          <p className={styles.sectionSubtitle}>Jadwal yang telah selesai atau dibatalkan</p>

          <div className={styles.historyList}>
            {history.length > 0 ? (
              history.map((reg) => (
                <div key={reg.id} className={styles.historyCard}>
                  <div className={styles.historyHeader}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <h3 className={styles.historyVaccineName}>{reg.vaccines?.name}</h3>
                      <span className={`${styles.badge} ${styles[reg.status]}`}>
                        {reg.status === 'completed' ? 'Selesai' : 
                         reg.status === 'cancelled' ? 'Dibatalkan' : 'Ditolak'}
                      </span>
                    </div>
                  </div>
                  
                  <div className={styles.historyBody}>
                    <div className={styles.historyItem}>
                      <CalendarIcon className="w-4 h-4" style={{ width: 16, height: 16 }} />
                      <span>
                        {reg.scheduled_date 
                          ? new Date(reg.scheduled_date).toLocaleDateString('id-ID')
                          : '-'}
                      </span>
                    </div>
                    <div className={styles.historyItem}>
                      <ClockIcon className="w-4 h-4" style={{ width: 16, height: 16 }} />
                      <span>{reg.vaccination_time || '00.00 WITA'}</span>
                    </div>
                    <div className={styles.historyItem}>
                      <HashtagIcon className="w-4 h-4" style={{ width: 16, height: 16 }} />
                      <span>{reg.queue_number || '-'}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.emptyText}>Belum ada riwayat jadwal.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
