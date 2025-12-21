'use client'

import { useState } from 'react'
import { updateVaccine } from './actions'
import styles from './page.module.css'

type Vaccine = {
  id: string
  name: string
  stock: number
  description: string | null
}

export default function EditVaccineModal({ vaccine }: { vaccine: Vaccine }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    await updateVaccine(formData)
    setIsOpen(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="btn-icon" 
        title="Edit" 
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
      >
        ✏️
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#1f2937' }}>Edit Vaksin</h3>
            
            <form action={handleSubmit} className={styles.form}>
              <input type="hidden" name="id" value={vaccine.id} />
              
              <div className={styles.field}>
                <label>Nama Vaksin</label>
                <input name="name" required defaultValue={vaccine.name} />
              </div>
              
              <div className={styles.field}>
                <label>Stok</label>
                <input name="stock" type="number" required min="0" defaultValue={vaccine.stock} />
              </div>
              
              <div className={styles.field}>
                <label>Deskripsi</label>
                <textarea 
                  name="description" 
                  defaultValue={vaccine.description || ''} 
                  rows={4}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Simpan</button>
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="btn" 
                  style={{ background: '#e5e7eb', color: '#374151', border: 'none', cursor: 'pointer' }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
