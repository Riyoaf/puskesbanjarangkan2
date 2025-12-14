'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function PatientsPage() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [registrations, setRegistrations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState<any | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data: profs } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'patient')
    
    const { data: regs } = await supabase
      .from('registrations')
      .select('*, vaccines(name)')
      .order('created_at', { ascending: false })

    if (profs) setProfiles(profs)
    if (regs) setRegistrations(regs)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah anda yakin ingin menghapus data pasien ini?')) return

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Gagal menghapus: ' + error.message)
    } else {
      fetchData()
    }
  }

  const handleEdit = (profile: any) => {
    setEditingProfile(profile)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProfile) return

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: editingProfile.full_name }) // Only full_name is editable in profiles for now
      .eq('id', editingProfile.id)

    if (error) {
      alert('Gagal menyimpan: ' + error.message)
    } else {
      setEditingProfile(null)
      fetchData()
    }
  }

  return (
    <div>
      <h1 className={styles.title}>Data Pasien</h1>
      
      {loading ? <p>Loading...</p> : (
        <div className={styles.grid}>
          {profiles.map((profile) => {
            const patientRegs = registrations.filter(r => r.user_id === profile.id) || []
            const completedCount = patientRegs.filter(r => r.status === 'completed').length
            
            return (
              <div key={profile.id} className={styles.card}>
                <div className={styles.header}>
                  <div className={styles.avatar}>
                    {profile.email?.[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className={styles.name}>{profile.full_name || 'Tanpa Nama'}</h3>
                    <p className={styles.email}>{profile.email}</p>
                  </div>
                </div>
                
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Total Vaksinasi</span>
                    <span className={styles.statValue}>{completedCount}</span>
                  </div>
                </div>

                <div className={styles.history}>
                  <h4 className={styles.historyTitle}>Riwayat Vaksinasi</h4>
                  {patientRegs.length > 0 ? (
                    <ul className={styles.historyList}>
                      {patientRegs.filter(r => r.status === 'completed').map(reg => (
                        <li key={reg.id} className={styles.historyItem}>
                          <div className={styles.historyDetail}>
                            <span className={styles.vaccineName}>{reg.vaccines?.name}</span>
                            <span className={styles.patientNameDetail}>({reg.patient_name})</span>
                          </div>
                          <span className={`${styles.badge} ${styles[reg.status]}`}>
                            {reg.status}
                          </span>
                          <span className={styles.date}>
                            {new Date(reg.created_at).toLocaleDateString('id-ID')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.emptyHistory}>Belum ada riwayat.</p>
                  )}
                </div>

                <div className={styles.actions}>
                  <button onClick={() => handleEdit(profile)} className={styles.btnEdit}>Edit</button>
                  <button onClick={() => handleDelete(profile.id)} className={styles.btnDelete}>Hapus</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingProfile && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Pasien</h2>
            <form onSubmit={handleSave}>
              <div className={styles.field}>
                <label>Nama Lengkap</label>
                <input 
                  value={editingProfile.full_name || ''} 
                  onChange={e => setEditingProfile({...editingProfile, full_name: e.target.value})}
                  className={styles.input}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setEditingProfile(null)} className={styles.btnCancel}>Batal</button>
                <button type="submit" className={styles.btnSave}>Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
