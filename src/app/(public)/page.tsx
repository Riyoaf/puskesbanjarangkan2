import { createClient } from '@/utils/supabase/server'
import { getHealthNews } from '@/lib/news'
import Link from 'next/link'
import styles from './page.module.css'

export default async function Home() {
  const supabase = await createClient()
  
  // Fetch activities
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: true })
    .limit(4)

  // Fetch internal news
  const { data: internalNews } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4)

  // Combine activities and internal news for "Information" section
  const informationList = [
    ...(activities || []).map(a => ({ ...a, type: 'activity', date: a.date })),
    ...(internalNews || []).map(n => ({ ...n, type: 'news', date: n.created_at }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   .slice(0, 4)

  // Fetch external news for "Berita Terkini"
  const externalNews = await getHealthNews()

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroContainer}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleBlue}>VAKSIN UNTUK SEMUA.</span><br />
              <span className={styles.titleBlue}>LINDUNGI DIRI, </span>
              <span className={styles.titleGreen}>LINDUNGI NEGERI.</span>
            </h1>
          </div>
          {/* <div className={styles.heroImageContainer}>
             <div className={styles.heroCircle}>
                <div className={styles.plantPlaceholder}>🌿</div>
             </div>
          </div> */}
        </div>
      </section>

      {/* Information Section (Internal Updates) */}
      <section className={styles.infoSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Information</h2>
          <div className={styles.grid}>
            {informationList.map((item: any) => (
              <div key={item.id} className={styles.infoCard}>
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className={styles.cardImage} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                ) : (
                  <div className={styles.cardImagePlaceholder}></div>
                )}
                <div className={styles.cardContent}>
                  <div className={styles.cardText}>
                    <strong>{item.title}</strong><br/>
                    <span style={{ fontSize: '0.9em', color: '#666' }}>
                      📅 {new Date(item.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span><br/>
                    {item.type === 'activity' && (
                      <>
                        <span style={{ fontSize: '0.9em', color: '#666' }}>
                          📍 {item.location}
                        </span><br/>
                      </>
                    )}
                    <br/>
                    <div className={styles.cardDescription}>
                      {item.description || item.content || "Informasi terkini dari Puskesmas."}
                    </div>
                    
                    <Link href={`/information/${item.type}/${item.id}`} className={styles.readMoreLink}>
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {informationList.length === 0 && Array(4).fill(0).map((_, i) => (
              <div key={i} className={styles.infoCard}>
                <div className={styles.cardImagePlaceholder}></div>
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>
                    Belum ada informasi terbaru.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section (External API) */}
       <section className={styles.infoSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Berita Terkini</h2>
          <div className={styles.grid}>
            {externalNews.map((article: any, index: number) => (
              <a 
                key={index} 
                href={article.url} 
                className={styles.infoCard}
              >
                {article.urlToImage ? (
                  <img src={article.urlToImage} alt={article.title} className={styles.cardImage} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                ) : (
                  <div className={styles.cardImagePlaceholder}></div>
                )}
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>
                    <strong>{article.title}</strong><br/>
                    <span style={{ fontSize: '0.85em', color: '#666' }}>
                      {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </span>
                  </p>
                </div>
              </a>
            ))}

            {(!externalNews || externalNews.length === 0) && <p>Belum ada berita terkini.</p>}
          </div>
        </div>
      </section>
    </main>
  )
}
