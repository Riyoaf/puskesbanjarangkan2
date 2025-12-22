'use client'

import { useState, useEffect } from 'react'
import styles from '@/app/(public)/page.module.css'

export default function NewsList({ initialNews }: { initialNews: any[] }) {
  const [news, setNews] = useState(initialNews)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/news')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data) && data.length > 0) {
            setNews(data)
          }
        }
      } catch (error) {
        // Ignore network errors during development/reloads
        console.warn('News polling failed (likely server restart or network issue):', error)
      } finally {
        setLoading(false)
      }
    }

    // Poll every 60 seconds
    const interval = setInterval(fetchNews, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleImageError = (e: any) => {
    e.target.onerror = null // Prevent infinite loop
    e.target.src = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60' // Fallback image
  }

  return (
    <div className={styles.grid}>
      {news.map((article: any, index: number) => (
        <a 
          key={`${article.url}-${index}`}
          href={article.url} 
          className={styles.infoCard}
        >
          {article.urlToImage ? (
            <img 
              src={article.urlToImage} 
              alt={article.title} 
              className={styles.cardImage} 
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              onError={handleImageError}
            />
          ) : (
            <div className={styles.cardImagePlaceholder} style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
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

      {(!news || news.length === 0) && <p>Belum ada berita terkini.</p>}
    </div>
  )
}
