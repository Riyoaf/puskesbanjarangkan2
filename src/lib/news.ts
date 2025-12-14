export async function getHealthNews() {
  const apiKey = process.env.NEWS_API_KEY
  
  // Mock data for fallback
  const mockNews = [
    {
      title: "Pentingnya Vaksinasi untuk Kekebalan Tubuh",
      url: "#",
      urlToImage: null,
      description: "Vaksinasi adalah cara paling efektif untuk mencegah penyakit menular."
    },
    {
      title: "Jadwal Imunisasi Rutin Lengkap",
      url: "#",
      urlToImage: null,
      description: "Pastikan buah hati anda mendapatkan imunisasi dasar lengkap."
    },
    {
      title: "Tips Menjaga Kesehatan di Musim Pancaroba",
      url: "#",
      urlToImage: null,
      description: "Konsumsi vitamin dan istirahat cukup untuk menjaga daya tahan tubuh."
    },
    {
      title: "Layanan Kesehatan Puskesmas Banjarangkan",
      url: "#",
      urlToImage: null,
      description: "Kami melayani poli umum, gigi, kia, dan vaksinasi."
    }
  ]

  if (!apiKey) {
    console.warn('NEWS_API_KEY is missing, using mock data.')
    return mockNews
  }

  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=id&category=health&apiKey=${apiKey}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    )
    
    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data.articles && data.articles.length > 0 ? data.articles : mockNews
  } catch (error) {
    console.warn('Error fetching news, using mock data:', error)
    return mockNews
  }
}
