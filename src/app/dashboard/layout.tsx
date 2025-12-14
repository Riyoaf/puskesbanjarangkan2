import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { signout } from '@/app/auth/actions'
import styles from '@/app/dashboard/layout.module.css'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user profile to check role
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Admin Panel</h2>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem}>
            🏠 Dashboard
          </Link>
          <Link href="/dashboard/activities" className={styles.navItem}>
            📅 Kelola Kegiatan
          </Link>
          <Link href="/dashboard/registrations" className={styles.navItem}>
            📝 Verifikasi Pendaftaran
          </Link>
          <Link href="/dashboard/patients" className={styles.navItem}>
            👥 Data Pasien
          </Link>
          <Link href="/dashboard/vaccines" className={styles.navItem}>
            💉 Kelola Vaksin
          </Link>
          <Link href="/dashboard/reports" className={styles.navItem}>
            📊 Laporan
          </Link>
          
          <Link href="/" className={styles.navItem}>
            🌐 Lihat Website
          </Link>
        </nav>

        <div className={styles.user}>
          <p>{profile?.full_name}</p>
          <form action={signout}>
            <button className={styles.logoutBtn}>Keluar</button>
          </form>
        </div>
      </aside>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  )
}
