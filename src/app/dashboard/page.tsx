import { createClient } from '@/utils/supabase/server'
import styles from './page.module.css'
import DashboardCharts from '@/components/DashboardCharts'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  // Fetch stats
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // Fetch visits for last 7 days
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const { data: visits } = await supabase
    .from('site_visits')
    .select('*')
    .gte('visit_date', sevenDaysAgo.toISOString().split('T')[0])
    .order('visit_date', { ascending: true })

  // Calculate total visits today
  const today = new Date().toISOString().split('T')[0]
  const todayVisits = visits?.find((v: any) => v.visit_date === today)?.count || 0

  return (
    <div>
      <h1 className={styles.title}>Selamat Datang, {profile?.full_name}</h1>
      
      <div className={styles.stats}>
        <div className="card">
          <h3>Status Akun</h3>
          <p>{profile?.role === 'admin' ? 'Administrator' : 'Pasien Terdaftar'}</p>
        </div>
        
        {profile?.role === 'admin' && (
          <>
            <div className="card">
              <h3>Total Pengguna</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>{totalUsers || 0}</p>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Terdaftar di sistem</span>
            </div>
            <div className="card">
              <h3>Kunjungan Hari Ini</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>{todayVisits}</p>
              <span style={{ fontSize: '0.8rem', color: '#666' }}>Website views</span>
            </div>
          </>
        )}
      </div>

      {profile?.role === 'admin' && (
        <DashboardCharts visits={visits || []} />
      )}
    </div>
  )
}
