'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useRef } from 'react'

export default function VisitTracker() {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const logVisit = async () => {
      const supabase = createClient()
      // Check if we already logged a visit for this session to avoid double counting on reloads (optional but good)
      const lastVisit = sessionStorage.getItem('last_visit_date')
      const today = new Date().toISOString().split('T')[0]

      if (lastVisit !== today) {
        try {
          await supabase.rpc('increment_visit')
          sessionStorage.setItem('last_visit_date', today)
          console.log('Visit logged')
        } catch (error) {
          console.error('Error logging visit:', error)
        }
      }
    }

    logVisit()
  }, [])

  return null
}
