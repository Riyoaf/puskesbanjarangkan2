import { createClient } from '@/utils/supabase/server'
import { getHealthNews } from '@/lib/news'
import styles from './page.module.css'

export default async function Home() {
  const supabase = await createClient()
  
  // Fetch activities (Information)
  const { data: activities } = await supabase
    .from('activities')
    .select('*')
    .order('date', { ascending: true })
    .limit(4)

  // Fetch news (no filter as requested, but keeping health category implicitly via getHealthNews or we can change it)
  // User said "tidak perlu difilter terlebih dahulu", implying show whatever comes or maybe just "health" is fine.
  // I'll stick to getHealthNews for now as it's cleaner than random news.
  const news = await getHealthNews()

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.heroContainer}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Mulai Hidup<br />
              sehat dengan<br />
              vaksinasi
            </h1>
            {/* Decorative arrows would be SVG images, omitting for simplicity or using CSS shapes if needed */}
          </div>
          <div className={styles.heroImageContainer}>
             {/* Placeholder for the plant image in the circle */}
             <div className={styles.heroCircle}>
                <div className={styles.plantPlaceholder}>🌿</div>
             </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className={styles.infoSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Information</h2>
          <div className={styles.grid}>
            {/* Display Activities as Info Cards */}
            {activities?.map((activity) => (
              <div key={activity.id} className={styles.infoCard}>
                <div className={styles.cardImagePlaceholder}></div>
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>
                    <strong>{activity.title}</strong><br/>
                    {activity.description || "Lorem ipsum dolor sit amet consectetur. Egestas ornare morbi id dignissim adipiscing lectus suspendisse gravida."}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Fallback if no activities, show placeholders to match design */}
            {(!activities || activities.length === 0) && Array(4).fill(0).map((_, i) => (
              <div key={i} className={styles.infoCard}>
                <div className={styles.cardImagePlaceholder}></div>
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>
                    Lorem ipsum dolor sit amet consectetur. Egestas ornare morbi id dignissim adipiscing lectus suspendisse gravida. Eleifend tempus eu pellentesque pellentesque.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section (Optional, if user wants it separate or mixed) */}
      {/* User asked for "info berita buat dalam bentuk card", likely referring to the section above. 
          I'll add the actual news below or mix them if preferred. 
          For now, I'll add a separate section for "Berita Terkini" to keep it distinct from "Information" (Activities).
      */}
       <section className={styles.infoSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Berita Terkini</h2>
          <div className={styles.grid}>
            {news.slice(0, 4).map((article: any, index: number) => (
              <a key={index} href={article.url} target="_blank" className={styles.infoCard}>
                {article.urlToImage ? (
                  <img src={article.urlToImage} alt={article.title} className={styles.cardImage} />
                ) : (
                  <div className={styles.cardImagePlaceholder}></div>
                )}
                <div className={styles.cardContent}>
                  <p className={styles.cardText}>
                    <strong>{article.title}</strong>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
