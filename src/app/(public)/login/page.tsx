'use client'

import { login, signup } from '@/app/auth/actions'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import styles from './auth.module.css'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  useEffect(() => {
    if (message) {
      toast.success(message)
      // Remove the message from URL to prevent duplicate toasts
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete('message')
      window.history.replaceState({}, '', newUrl.toString())
    }
  }, [message])

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
              placeholder="nama@gmail.com"
              pattern=".*@gmail\.com$"
              title="Harap gunakan email @gmail.com"
            />
          </div>
          
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <div className={styles.passwordWrapper}>
              <input 
                id="password" 
                name="password" 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••"
                minLength={6}
              />
              <button
                type="button"
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                ) : (
                  <EyeIcon className="w-5 h-5" style={{ width: 20, height: 20 }} />
                )}
              </button>
            </div>
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
