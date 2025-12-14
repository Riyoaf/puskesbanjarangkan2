import { createClient } from '@/utils/supabase/server'
import { addVaccine, updateStock, deleteVaccine } from './actions'
import styles from './page.module.css'

export default async function VaccinesPage() {
  const supabase = await createClient()
  
  const { data: vaccines } = await supabase
    .from('vaccines')
    .select('*')
    .order('name')

  return (
    <div>
      <h1 className={styles.title}>Kelola Vaksin</h1>
      
      <div className={styles.grid}>
        {/* Add New Vaccine Form */}
        <div className={`card ${styles.addCard}`}>
          <h3>Tambah Vaksin Baru</h3>
          <form action={addVaccine} className={styles.form}>
            <div className={styles.field}>
              <label>Nama Vaksin</label>
              <input name="name" required placeholder="Contoh: Sinovac" />
            </div>
            <div className={styles.field}>
              <label>Stok Awal</label>
              <input name="stock" type="number" required min="0" />
            </div>
            <div className={styles.field}>
              <label>Deskripsi</label>
              <textarea name="description" placeholder="Keterangan singkat..." />
            </div>
            <button type="submit" className="btn btn-primary">Tambah</button>
          </form>
        </div>

        {/* List Vaccines */}
        <div className={styles.list}>
          {vaccines?.map((v) => (
            <div key={v.id} className={`card ${styles.vaccineCard}`}>
              <div className={styles.vaccineHeader}>
                <h3>{v.name}</h3>
                <form action={deleteVaccine} className={styles.deleteForm}>
                  <input type="hidden" name="id" value={v.id} />
                  <button className={styles.deleteBtn} title="Hapus">🗑️</button>
                </form>
              </div>
              <p className={styles.desc}>{v.description || 'Tidak ada deskripsi'}</p>
              
              <div className={styles.stockControl}>
                <label>Stok:</label>
                <form action={updateStock} className={styles.stockForm}>
                  <input type="hidden" name="id" value={v.id} />
                  <input 
                    name="stock" 
                    type="number" 
                    defaultValue={v.stock} 
                    className={styles.stockInput}
                  />
                  <button className="btn btn-outline">Update</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
