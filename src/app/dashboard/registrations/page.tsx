'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { updateRegistrationStatus } from './actions'
import styles from './page.module.css'
import { 
  MagnifyingGlassIcon, 
  HashtagIcon, 
  UserIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  CheckIcon, 
  XMarkIcon, 
  NoSymbolIcon 
} from '@heroicons/react/24/outline'

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
        <div style={{ position: 'relative', flex: 1 }}>
          <MagnifyingGlassIcon className="w-5 h-5" style={{ width: 20, height: 20, position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Cari nama, NIK, atau no antrian..." 
            className={styles.searchInput}
            style={{ paddingLeft: '2.5rem' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                      <HashtagIcon className="w-4 h-4" style={{ width: 16, height: 16 }} />
                      <span className={styles.queueNumber}>{reg.queue_number || '-'}</span>
                    </div>
                  </div>
                  <div className={styles.headerInfo}>
                    <h3 className={styles.patientName} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <UserIcon className="w-5 h-5" style={{ width: 20, height: 20 }} /> {reg.patient_name || 'Tanpa Nama'}
                    </h3>
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
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                  >
                    {expandedId === reg.id ? (
                      <>Tutup Detail <ChevronUpIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /></>
                    ) : (
                      <>Lihat Detail <ChevronDownIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /></>
                    )}
                  </button>
                  
                  {/* Status Actions */}
                  {reg.status === 'pending' && (
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleStatusUpdate(reg.id, 'approved')} className={styles.btnApprove} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <CheckIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Setujui
                      </button>
                      <button onClick={() => handleStatusUpdate(reg.id, 'rejected')} className={styles.btnReject} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <XMarkIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Tolak
                      </button>
                      <button onClick={() => handleStatusUpdate(reg.id, 'cancelled')} className={styles.btnCancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <NoSymbolIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Batalkan
                      </button>
                    </div>
                  )}
                  {reg.status === 'approved' && (
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleStatusUpdate(reg.id, 'completed')} className={styles.btnComplete} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <CheckIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Selesai
                      </button>
                      <button onClick={() => handleStatusUpdate(reg.id, 'cancelled')} className={styles.btnCancel} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                        <NoSymbolIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Batalkan
                      </button>
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
