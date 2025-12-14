'use client'

import { login, signup } from '@/app/auth/actions'
import { useState } from 'react'
import styles from './auth.module.css'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    const action = isLogin ? login : signup
    const result = await action(formData)
    
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
    // If success, redirect happens in action
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {isLogin ? 'Login ke Puskesmas' : 'Daftar Akun Baru'}
        </h1>
        
        <form action={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.field}>
              <label htmlFor="fullName">Nama Lengkap</label>
              <input 
                id="fullName" 
                name="fullName" 
                type="text" 
                required 
                placeholder="Masukkan nama lengkap"
              />
            </div>
          )}
          
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="nama@email.com"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="••••••••"
              minLength={6}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Memproses...' : (isLogin ? 'Masuk' : 'Daftar')}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            {isLogin ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button 
              className={styles.linkBtn}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Daftar sekarang' : 'Login disini'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
