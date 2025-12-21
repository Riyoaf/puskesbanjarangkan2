import { createClient } from '@/utils/supabase/server'
import { updateVaccine } from '../../actions'
import styles from '../../page.module.css'
import Link from 'next/link'

export default async function EditVaccinePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { id } = await params

  const { data: vaccine } = await supabase
    .from('vaccines')
    .select('*')
    .eq('id', id)
    .single()

  if (!vaccine) {
    return <div>Vaksin tidak ditemukan</div>
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/dashboard/vaccines" style={{ color: '#666', textDecoration: 'none' }}>
          &larr; Kembali
        </Link>
      </div>
      
      <div className={`card ${styles.addCard}`}>
        <h3>Edit Vaksin</h3>
        <form action={updateVaccine} className={styles.form}>
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
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Simpan Perubahan</button>
            <Link href="/dashboard/vaccines" className="btn" style={{ background: '#e5e7eb', color: '#374151', textDecoration: 'none', textAlign: 'center' }}>
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
