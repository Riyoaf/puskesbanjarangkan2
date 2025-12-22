import { NextResponse } from 'next/server'
import { getHealthNews } from '@/lib/news'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Fetch news with no-store to get fresh data
    const news = await getHealthNews({ cache: 'no-store' })
    return NextResponse.json(news)
  } catch (error) {
    console.error('Error in news API:', error)
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 })
  }
}
