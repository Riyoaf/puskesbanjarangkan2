import { createClient } from '@/utils/supabase/server'
import { updateActivity } from '../../actions'
import styles from '../../page.module.css'
import { redirect } from 'next/navigation'

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: activity } = await supabase
    .from('activities')
    .select('*')
    .eq('id', id)
    .single()

  if (!activity) {
    redirect('/dashboard/activities')
  }

  return (
    <div>
      <h1 className={styles.title}>Edit Kegiatan</h1>
      
      <div className={`card ${styles.addCard}`} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form action={async (formData) => {
          'use server'
          await updateActivity(formData)
          redirect('/dashboard/activities')
        }} className={styles.form}>
          <input type="hidden" name="id" value={activity.id} />
          
          <div className={styles.field}>
            <label>Judul Kegiatan</label>
            <input name="title" defaultValue={activity.title} required />
          </div>
          <div className={styles.field}>
            <label>Tanggal</label>
            <input name="date" type="date" defaultValue={activity.date} required />
          </div>
          <div className={styles.field}>
            <label>Lokasi</label>
            <input name="location" defaultValue={activity.location} required />
          </div>
          <div className={styles.field}>
            <label>Deskripsi</label>
            <textarea name="description" rows={5} defaultValue={activity.description} />
          </div>
          <div className={styles.field}>
            <label>Ganti Gambar (Opsional)</label>
            {activity.image_url && (
              <div style={{ marginBottom: '0.5rem' }}>
                <img src={activity.image_url} alt="Current" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                <p style={{ fontSize: '0.8rem', color: '#666' }}>Gambar saat ini</p>
              </div>
            )}
            <input type="file" name="image" accept="image/*" />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
            <a href="/dashboard/activities" className="btn" style={{ background: '#ccc' }}>Batal</a>
          </div>
        </form>
      </div>
    </div>
  )
}
