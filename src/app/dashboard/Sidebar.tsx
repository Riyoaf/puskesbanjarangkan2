'use client'

import Link from 'next/link'
import { useState } from 'react'
import styles from './layout.module.css'
import { signout } from '@/app/auth/actions'

export default function Sidebar({ profile }: { profile: any }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <h2>Admin Panel</h2>
          <button 
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem} onClick={() => setIsOpen(false)}>
            🏠 Dashboard
          </Link>
          <Link href="/dashboard/activities" className={styles.navItem} onClick={() => setIsOpen(false)}>
            📅 Kelola Kegiatan
          </Link>
          <Link href="/dashboard/news" className={styles.navItem} onClick={() => setIsOpen(false)}>
            📰 Kelola Berita
          </Link>
          <Link href="/dashboard/registrations" className={styles.navItem} onClick={() => setIsOpen(false)}>
            📝 Verifikasi Pendaftaran
          </Link>
          <Link href="/dashboard/patients" className={styles.navItem} onClick={() => setIsOpen(false)}>
            👥 Data Pasien
          </Link>
          <Link href="/dashboard/vaccines" className={styles.navItem} onClick={() => setIsOpen(false)}>
            💉 Kelola Vaksin
          </Link>
          <Link href="/dashboard/reports" className={styles.navItem} onClick={() => setIsOpen(false)}>
            📊 Laporan
          </Link>
        </nav>

        <div className={styles.user}>
          <p>{profile?.full_name}</p>
          <form action={signout}>
            <button className={styles.logoutBtn}>Keluar</button>
          </form>
        </div>
      </aside>
      
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
      )}
    </>
  )
}
