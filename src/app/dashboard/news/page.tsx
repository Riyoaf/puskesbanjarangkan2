import { createClient } from '@/utils/supabase/server'
import { addNews, deleteNews } from './actions'
import styles from '../activities/page.module.css' // Reusing styles from activities

export default async function NewsPage() {
  const supabase = await createClient()
  
  const { data: newsList } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className={styles.title}>Kelola Berita Puskesmas</h1>
      
      <div className={styles.grid}>
        <div className={`card ${styles.addCard}`}>
          <h3>Tambah Berita</h3>
          <form action={addNews} className={styles.form}>
            <div className={styles.field}>
              <label>Judul Berita</label>
              <input name="title" required placeholder="Contoh: Vaksinasi Massal..." />
            </div>
            <div className={styles.field}>
              <label>Konten Berita</label>
              <textarea name="content" rows={5} required placeholder="Isi berita..." />
            </div>
            <div className={styles.field}>
              <label>Gambar (Opsional)</label>
              <input type="file" name="image" accept="image/*" />
            </div>
            <button type="submit" className="btn btn-primary">Simpan</button>
          </form>
        </div>

        <div className={styles.list}>
          {newsList?.map((news) => (
            <div key={news.id} className={`card ${styles.activityCard}`}>
              <div className={styles.header}>
                <h3>{news.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a href={`/dashboard/news/${news.id}/edit`} className={styles.editBtn} style={{ textDecoration: 'none', fontSize: '1.2rem' }} title="Edit">
                    ✏️
                  </a>
                  <form action={deleteNews}>
                    <input type="hidden" name="id" value={news.id} />
                    <button className={styles.deleteBtn} title="Hapus">🗑️</button>
                  </form>
                </div>
              </div>
              {news.image_url && (
                <img src={news.image_url} alt={news.title} className={styles.activityImage} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />
              )}
              <p className={styles.date}>
                📅 {new Date(news.created_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className={styles.desc}>{news.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
