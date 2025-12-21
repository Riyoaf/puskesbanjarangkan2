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
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.headerLink}>
              Buka di Sumber Asli ↗
            </a>
          </div>

          <div className={styles.body}>
            {/* Iframe for full article - Main Focus */}
            {sourceUrl ? (
              <div className={styles.iframeContainer}>
                <iframe 
                  src={sourceUrl} 
                  className={styles.iframe} 
                  title="Full Article" 
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
                <div className={styles.fallbackOverlay}>
                  <p>Memuat artikel...</p>
                </div>
              </div>
            ) : (
              <div className={styles.error}>
                <p>URL sumber tidak tersedia.</p>
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  )
}
