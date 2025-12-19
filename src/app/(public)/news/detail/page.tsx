import styles from './page.module.css'
import Link from 'next/link'

export default async function NewsDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const title = params.title as string
  const date = params.date as string
  const image = params.image as string
  const description = params.description as string
  const sourceUrl = params.sourceUrl as string
  const sourceName = params.sourceName as string
  const content = params.content as string

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
              📅 {date ? new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''}
            </span>
            {sourceName && <span className={styles.source}>📰 {sourceName}</span>}
          </div>

          {image && (
            <div className={styles.imageContainer}>
              <img src={image} alt={title} className={styles.image} />
            </div>
          )}

          <div className={styles.body}>
            <p className={styles.description}>{description}</p>
            {content && <p className={styles.content}>{content}</p>}
            
            <div className={styles.readMore}>
              <p>Untuk membaca artikel selengkapnya, silakan kunjungi sumber asli:</p>
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Baca Selengkapnya di {sourceName || 'Sumber Asli'} ↗
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}
