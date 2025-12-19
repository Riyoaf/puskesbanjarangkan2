export async function getHealthNews() {
  const apiKey = process.env.NEWS_API_KEY
  
  console.log('Fetching news... API Key present:', !!apiKey)

  // Mock data for fallback with images
  const mockNews = [
    {
      title: "Pentingnya Vaksinasi untuk Kekebalan Tubuh",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1632053001856-429949667746?w=800&auto=format&fit=crop&q=60",
      description: "Vaksinasi adalah cara paling efektif untuk mencegah penyakit menular."
    },
    {
      title: "Jadwal Imunisasi Rutin Lengkap",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=60",
      description: "Pastikan buah hati anda mendapatkan imunisasi dasar lengkap."
    },
    {
      title: "Tips Menjaga Kesehatan di Musim Pancaroba",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60",
      description: "Konsumsi vitamin dan istirahat cukup untuk menjaga daya tahan tubuh."
    },
    {
      title: "Layanan Kesehatan Puskesmas Banjarangkan",
      url: "#",
      urlToImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=60",
      description: "Kami melayani poli umum, gigi, kia, dan vaksinasi."
    }
  ]

  if (!apiKey) {
    console.warn('NEWS_API_KEY is missing, using mock data.')
    return mockNews
  }

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=${apiKey}&pageSize=12`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )
    
    if (!res.ok) {
      console.error(`Failed to fetch news: ${res.status} ${res.statusText}`)
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    console.log(`Fetched ${data.articles?.length} articles from API`)
    return data.articles && data.articles.length > 0 ? data.articles : mockNews
  } catch (error) {
    console.warn('Error fetching news, using mock data:', error)
    return mockNews
  }
}
