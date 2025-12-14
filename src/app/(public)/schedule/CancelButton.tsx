'use client'

import { useState } from 'react'
import { cancelSchedule } from './actions'
import styles from './page.module.css'

export default function CancelButton({ id }: { id: string }) {
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancel = async () => {
    if (confirm('Apakah anda yakin ingin membatalkan jadwal vaksinasi ini?')) {
      setIsCancelling(true)
      const formData = new FormData()
      formData.append('id', id)
      
      await cancelSchedule(formData)
      setIsCancelling(false)
    }
  }

  return (
    <button 
      onClick={handleCancel} 
      className={styles.btnCancel}
      disabled={isCancelling}
    >
      {isCancelling ? 'Memproses...' : '❎ Batalkan jadwal'}
    </button>
  )
}
