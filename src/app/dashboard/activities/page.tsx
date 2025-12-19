import { createClient } from '@/utils/supabase/server'
import { addActivity, deleteActivity } from './actions'
import styles from './page.module.css'

export default async function ActivitiesPage() {
  const supabase = await createClient()
  
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: true })

  return (
    <div>
      <h1 className={styles.title}>Kelola Kegiatan Puskesmas</h1>
      
      <div className={styles.grid}>
        <div className={`card ${styles.addCard}`}>
          <h3>Tambah Kegiatan</h3>
          <form action={addActivity} className={styles.form}>
            <div className={styles.field}>
              <label>Judul Kegiatan</label>
              <input name="title" required placeholder="Contoh: Posyandu Lansia" />
            </div>
            <div className={styles.field}>
              <label>Tanggal</label>
              <input name="date" type="date" required />
            </div>
            <div className={styles.field}>
              <label>Lokasi</label>
              <input name="location" required placeholder="Contoh: Balai Banjar X" />
            </div>
            <div className={styles.field}>
              <label>Deskripsi</label>
              <textarea name="description" rows={3} />
            </div>
            <div className={styles.field}>
              <label>Gambar (Opsional)</label>
              <input type="file" name="image" accept="image/*" />
            </div>
            <button type="submit" className="btn btn-primary">Simpan</button>
          </form>
        </div>

        <div className={styles.list}>
          {activities?.map((activity) => (
            <div key={activity.id} className={`card ${styles.activityCard}`}>
              <div className={styles.header}>
                <h3>{activity.title}</h3>
                <form action={deleteActivity}>
                  <input type="hidden" name="id" value={activity.id} />
                  <button className={styles.deleteBtn}>🗑️</button>
                </form>
              </div>
              {activity.image_url && (
                <img src={activity.image_url} alt={activity.title} className={styles.activityImage} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
              )}
              <p className={styles.date}>
                📅 {new Date(activity.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className={styles.location}>📍 {activity.location}</p>
              <p className={styles.desc}>{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
