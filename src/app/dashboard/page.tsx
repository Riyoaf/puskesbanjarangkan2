import { createClient } from '@/utils/supabase/server'
import styles from './page.module.css'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single()

  return (
    <div>
      <h1 className={styles.title}>Selamat Datang, {profile?.full_name}</h1>
      <div className={styles.stats}>
        <div className="card">
          <h3>Status Akun</h3>
          <p>{profile?.role === 'admin' ? 'Administrator' : 'Pasien Terdaftar'}</p>
        </div>
        {/* Add more stats here later */}
      </div>
    </div>
  )
}
