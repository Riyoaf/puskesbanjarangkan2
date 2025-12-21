'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import { signout } from '@/app/auth/actions'
import styles from './Navbar.module.css'

export default function Navbar({ user, role }: { user: any, role: string | null }) {
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logoWrapper}>
          <Image 
            src="/Logo2.png" 
            alt="SIVAKSI Logo" 
            width={150} 
            height={50} 
            className={styles.logoImage}
            priority
          />
        </Link>

        {/* Mobile Toggle Button */}
        <button 
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={isMobileMenuOpen ? styles.barOpen : styles.bar}></span>
          <span className={isMobileMenuOpen ? styles.barOpen : styles.bar}></span>
          <span className={isMobileMenuOpen ? styles.barOpen : styles.bar}></span>
        </button>

        {/* Desktop Menu */}
        <div className={`${styles.menu} ${isMobileMenuOpen ? styles.menuOpen : ''}`}>
          <Link 
            href="/" 
            className={`${styles.link} ${isActive('/') ? styles.active : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          {user && role === 'patient' && (
            <>
              <Link 
                href="/vaccination" 
                className={`${styles.link} ${isActive('/vaccination') ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Vaksinasi
              </Link>
              <Link 
                href="/schedule" 
                className={`${styles.link} ${isActive('/schedule') ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Jadwal
              </Link>
              <Link 
                href="/history" 
                className={`${styles.link} ${isActive('/history') ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                History
              </Link>
            </>
          )}

          {user && role === 'admin' && (
            <Link 
              href="/dashboard" 
              className={`${styles.link} ${isActive('/dashboard') ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
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
                    <p className={styles.userName}>{user.user_metadata?.full_name || 'User'}</p>
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
