import { createClient } from '@/utils/supabase/server'
import { updateNews } from '../../actions'
import styles from '../../../activities/page.module.css' // Correct path to activities styles
import { redirect } from 'next/navigation'

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: news } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (!news) {
    redirect('/dashboard/news')
  }

  return (
    <div>
      <h1 className={styles.title}>Edit Berita</h1>
      
      <div className={`card ${styles.addCard}`} style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form action={async (formData) => {
          'use server'
          await updateNews(formData)
          redirect('/dashboard/news')
        }} className={styles.form}>
          <input type="hidden" name="id" value={news.id} />
          
          <div className={styles.field}>
            <label>Judul Berita</label>
            <input name="title" defaultValue={news.title} required />
          </div>
          <div className={styles.field}>
            <label>Konten Berita</label>
            <textarea name="content" rows={10} defaultValue={news.content} required />
          </div>
          <div className={styles.field}>
            <label>Ganti Gambar (Opsional)</label>
            {news.image_url && (
              <div style={{ marginBottom: '0.5rem' }}>
                <img src={news.image_url} alt="Current" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }} />
                <p style={{ fontSize: '0.8rem', color: '#666' }}>Gambar saat ini</p>
              </div>
            )}
            <input type="file" name="image" accept="image/*" />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
            <a href="/dashboard/news" className="btn" style={{ background: '#ccc' }}>Batal</a>
          </div>
        </form>
      </div>
    </div>
  )
}
