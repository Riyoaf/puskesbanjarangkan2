import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import styles from './page.module.css'
import { notFound } from 'next/navigation'

export default async function InformationDetailPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>
}) {
  const { type, id } = await params
  const supabase = await createClient()

  let data = null
  let tableName = ''

  if (type === 'activity') {
    tableName = 'activities'
  } else if (type === 'news') {
    tableName = 'news'
  } else {
    return notFound()
  }

  const { data: item, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', id)
    .single()

  if (error || !item) {
    console.error('Error fetching item:', error)
    return notFound()
  }

  const title = item.title
  const date = item.date || item.created_at
  const image = item.image_url
  const content = item.description || item.content
  const location = item.location // Only for activities

  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        <Link href="/" className={styles.backLink}>
          ← Kembali ke Beranda
        </Link>

        <article className={styles.article}>
          <h1 className={styles.title}>{title}</h1>
          
          <div className={styles.meta}>
            <span className={styles.date}>
              📅 {new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {location && <span className={styles.location}>📍 {location}</span>}
            <span className={styles.typeBadge}>
              {type === 'activity' ? 'Kegiatan' : 'Berita Internal'}
            </span>
          </div>

          {type === 'activity' && (
            <div className={styles.calendarAction}>
              <a 
                href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${new Date(date).toISOString().replace(/-|:|\.\d\d\d/g, "").substring(0,8)}/${new Date(new Date(date).getTime() + 86400000).toISOString().replace(/-|:|\.\d\d\d/g, "").substring(0,8)}&details=${encodeURIComponent(content || '')}&location=${encodeURIComponent(location || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.calendarBtn}
              >
                📅 Simpan ke Google Calendar
              </a>
            </div>
          )}

          {image && (
            <div className={styles.imageContainer}>
              <img src={image} alt={title} className={styles.image} />
            </div>
          )}

          <div className={styles.body}>
            <p className={styles.content}>{content}</p>
          </div>
        </article>
      </div>
    </main>
  )
}
