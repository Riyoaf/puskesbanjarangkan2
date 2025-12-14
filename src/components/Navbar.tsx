'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signout } from '@/app/auth/actions'
import styles from './Navbar.module.css'

export default function Navbar({ user, role }: { user: any, role: string | null }) {
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          BANJARANGKAN
        </Link>

        {/* Desktop Menu */}
        <div className={styles.menu}>
          <Link href="/" className={`${styles.link} ${isActive('/') ? styles.active : ''}`}>
            Home
          </Link>
          
          {user && role === 'patient' && (
            <>
              <Link href="/vaccination" className={`${styles.link} ${isActive('/vaccination') ? styles.active : ''}`}>
                Vaksinasi
              </Link>
              <Link href="/schedule" className={`${styles.link} ${isActive('/schedule') ? styles.active : ''}`}>
                Jadwal
              </Link>
              <Link href="/history" className={`${styles.link} ${isActive('/history') ? styles.active : ''}`}>
                History
              </Link>
            </>
          )}

          {user && role === 'admin' && (
            <Link href="/dashboard" className={`${styles.link} ${isActive('/dashboard') ? styles.active : ''}`}>
              Dashboard Admin
            </Link>
          )}

          <div className={styles.auth}>
            {user ? (
              <div 
                className={`${styles.profile} ${isProfileOpen ? styles.profileActive : ''}`}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className={styles.avatar}>
                  {user.email?.[0].toUpperCase()}
                </div>
                <div className={styles.dropdown}>
                  <div className={styles.userInfo}>
                    <p className={styles.userEmail}>{user.email}</p>
                    <p className={styles.userRole}>{role}</p>
                  </div>
                  <form action={signout}>
                    <button className={styles.logoutBtn}>Logout</button>
                  </form>
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
