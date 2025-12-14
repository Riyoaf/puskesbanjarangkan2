'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { updateRegistrationStatus } from './actions'
import styles from './page.module.css'

// Client component for interactivity (Search/Filter)
export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<any[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !session) {
      console.error('No active session found:', sessionError)
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('registrations')
      .select(`
        *,
        profiles (email),
        vaccines (name)
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching registrations:', error.message, error.details, error.hint)
    } else {
      console.log('Fetched registrations:', data)
    }
    
    if (data) setRegistrations(data)
    setLoading(false)
  }

  // Stats
  const total = registrations.length
  const pending = registrations.filter(r => r.status === 'pending').length
  const completed = registrations.filter(r => r.status === 'completed').length

  // Filter & Search
  const filteredRegistrations = registrations.filter(reg => {
    const matchesStatus = filterStatus === 'all' || reg.status === filterStatus
    const query = searchQuery.toLowerCase()
    const matchesSearch = 
      reg.patient_name?.toLowerCase().includes(query) ||
      reg.nik?.includes(query) ||
      reg.queue_number?.toLowerCase().includes(query) ||
      reg.profiles?.email?.toLowerCase().includes(query)
    
    return matchesStatus && matchesSearch
  })

  const handleStatusUpdate = async (id: string, status: string) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('status', status)
    
    await updateRegistrationStatus(formData)
    fetchRegistrations()
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className={styles.container}>
      {/* Stats Section */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Pendaftar</h3>
          <p className={styles.statValue}>{total}</p>
        </div>
        <div className={`${styles.statCard} ${styles.statPending}`}>
          <h3>Menunggu</h3>
          <p className={styles.statValue}>{pending}</p>
        </div>
        <div className={`${styles.statCard} ${styles.statCompleted}`}>
          <h3>Selesai</h3>
          <p className={styles.statValue}>{completed}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className={styles.controls}>
        <input 
          type="text" 
          placeholder="Cari nama, NIK, atau no antrian..." 
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select 
          className={styles.filterSelect}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">Semua Status</option>
          <option value="pending">Menunggu</option>
          <option value="approved">Disetujui</option>
          <option value="completed">Selesai</option>
          <option value="rejected">Ditolak</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
      </div>

      {/* List Section */}
      <div className={styles.listContainer}>
        <h2 className={styles.sectionTitle}>Daftar Pendaftaran</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : filteredRegistrations.length === 0 ? (
          <p className={styles.empty}>Tidak ada data ditemukan.</p>
        ) : (
          <div className={styles.grid}>
            {filteredRegistrations.map((reg) => (
              <div key={reg.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.queueBox}>
                    <span className={styles.queueLabel}>Antrian</span>
                    <span className={styles.queueNumber}>{reg.queue_number || '-'}</span>
                  </div>
                  <div className={styles.headerInfo}>
                    <h3 className={styles.patientName}>{reg.patient_name || 'Tanpa Nama'}</h3>
                    <span className={`${styles.badge} ${styles[reg.status]}`}>
                      {reg.status}
                    </span>
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <p><strong>Vaksin:</strong> {reg.vaccines?.name}</p>
                  <p><strong>Jadwal:</strong> {reg.scheduled_date ? new Date(reg.scheduled_date).toLocaleDateString('id-ID') : '-'}</p>
                  <p><strong>Waktu:</strong> {reg.vaccination_time || '-'}</p>
                  <p><strong>No HP:</strong> {reg.phone_number || '-'}</p>
                </div>

                <div className={styles.cardActions}>
                  <button 
                    className={styles.btnDetail}
                    onClick={() => toggleExpand(reg.id)}
                  >
                    {expandedId === reg.id ? 'Tutup Detail' : 'Lihat Detail'}
                  </button>
                  
                  {/* Status Actions */}
                  {reg.status === 'pending' && (
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleStatusUpdate(reg.id, 'approved')} className={styles.btnApprove}>Setujui</button>
                      <button onClick={() => handleStatusUpdate(reg.id, 'rejected')} className={styles.btnReject}>Tolak</button>
                      <button onClick={() => handleStatusUpdate(reg.id, 'cancelled')} className={styles.btnCancel}>Batalkan</button>
                    </div>
                  )}
                  {reg.status === 'approved' && (
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleStatusUpdate(reg.id, 'completed')} className={styles.btnComplete}>Selesai</button>
                      <button onClick={() => handleStatusUpdate(reg.id, 'cancelled')} className={styles.btnCancel}>Batalkan</button>
                    </div>
                  )}
                </div>

                {/* Expanded Detail */}
                {expandedId === reg.id && (
                  <div className={styles.detailSection}>
                    <h4>Detail Lengkap</h4>
                    <p><strong>NIK:</strong> {reg.nik}</p>
                    <p><strong>Tgl Lahir:</strong> {reg.birth_date}</p>
                    <p><strong>Email:</strong> {reg.email || reg.profiles?.email || '-'}</p>
                    <p><strong>Tgl Daftar:</strong> {new Date(reg.created_at).toLocaleString('id-ID')}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
