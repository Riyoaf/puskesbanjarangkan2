'use client'

import { useState } from 'react'
import styles from './page.module.css'
import { registerVaccine } from './actions'
import { 
  PencilSquareIcon, 
  ArrowPathIcon, 
  InformationCircleIcon, 
  UserIcon, 
  CalendarIcon, 
  IdentificationIcon, 
  PhoneIcon, 
  BeakerIcon, 
  ClockIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline'

type Props = {
  vaccines: any[]
  lastReg: any
  userEmail?: string
}

export default function RegistrationForm({ vaccines, lastReg, userEmail }: Props) {
  const [mode, setMode] = useState<'new' | 'existing'>(lastReg ? 'existing' : 'new')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    const result = await registerVaccine(formData)
    if (result?.error) {
      alert('Gagal mendaftar: ' + result.error)
      setIsSubmitting(false)
    }
    // If success, the server action redirects, so we don't need to do anything here.
  }

  return (
    <div className={styles.wrapper}>
      {/* Toggle Options - Outside Card */}
      <div className={styles.toggleContainer}>
        <button 
          type="button"
          className={`${styles.toggleBtn} ${mode === 'new' ? styles.active : ''}`}
          onClick={() => setMode('new')}
        >
          <PencilSquareIcon className="w-5 h-5" style={{ width: 20, height: 20, marginRight: 8 }} /> Daftar Baru
        </button>
        <button 
          type="button"
          className={`${styles.toggleBtn} ${mode === 'existing' ? styles.active : ''}`}
          onClick={() => setMode('existing')}
          disabled={!lastReg}
          title={!lastReg ? "Belum ada data pendaftaran sebelumnya" : ""}
        >
          <ArrowPathIcon className="w-5 h-5" style={{ width: 20, height: 20, marginRight: 8 }} /> Daftar Ulang (Data Lama)
        </button>
      </div>

      {/* Main Card */}
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Daftar Vaksinasi</h1>
          <p className={styles.subtitle}>Pilih opsi pendaftaran dan jadwal yang anda inginkan</p>
        </div>

        {mode === 'existing' && lastReg && (
          <div className={styles.infoBox}>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <InformationCircleIcon className="w-5 h-5" style={{ width: 20, height: 20 }} /> 
              Data formulir telah diisi otomatis berdasarkan pendaftaran terakhir anda.
            </p>
          </div>
        )}

        <form action={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="fullName" className={styles.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <UserIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Nama Pasien *
              </div>
            </label>
            <input 
              id="fullName" 
              name="fullName" 
              required 
              placeholder="ex : Bagus Satriya"
              className={styles.input}
              defaultValue={mode === 'existing' ? lastReg?.patient_name : ''}
              key={`name-${mode}`} // Force re-render when mode changes
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="birthDate" className={styles.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CalendarIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Tanggal Lahir *
              </div>
            </label>
            <input 
              id="birthDate" 
              name="birthDate" 
              type="date"
              required 
              className={styles.input}
              defaultValue={mode === 'existing' ? lastReg?.birth_date : ''}
              key={`dob-${mode}`}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="nik" className={styles.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <IdentificationIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Nomor Induk Kependudukan (NIK)*
              </div>
            </label>
            <input 
              id="nik" 
              name="nik" 
              required 
              placeholder="1234567890987654"
              className={styles.input}
              minLength={16}
              maxLength={16}
              defaultValue={mode === 'existing' ? lastReg?.nik : ''}
              key={`nik-${mode}`}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="phoneNumber" className={styles.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <PhoneIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Nomor HP *
              </div>
            </label>
            <input 
              id="phoneNumber" 
              name="phoneNumber" 
              required 
              placeholder="08123456789"
              className={styles.input}
              type="tel"
              defaultValue={mode === 'existing' ? lastReg?.phone_number : ''}
              key={`phone-${mode}`}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="vaccineId" className={styles.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <BeakerIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Jenis Vaksin *
              </div>
            </label>
            <select id="vaccineId" name="vaccineId" required className={styles.select}>
              <option value="">pilih jenis vaksin</option>
              {vaccines?.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} {v.description ? `- ${v.description}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CalendarIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Tanggal Vaksin
              </div>
            </label>
            <input 
              disabled 
              value="Setiap Senin" 
              className={styles.inputDisabled}
            />
            <input type="hidden" name="scheduleDay" value="monday" />
          </div>

          <div className={styles.field}>
            <label htmlFor="time" className={styles.label}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <ClockIcon className="w-4 h-4" style={{ width: 16, height: 16 }} /> Pilih Waktu *
              </div>
            </label>
            <select id="time" name="time" required className={styles.select}>
              <option value="">pilih jam vaksin</option>
              <option value="08:00 - 09:00">08:00 - 09:00</option>
              <option value="09:00 - 10:00">09:00 - 10:00</option>
              <option value="10:00 - 11:00">10:00 - 11:00</option>
              <option value="11:00 - 12:00">11:00 - 12:00</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Lokasi vaksinasi</label>
            <div className={styles.locationBox}>
              Puskesmas Banjarangkan 2
            </div>
          </div>

          <div className={styles.warningBox}>
            <p className={styles.warningTitle} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ExclamationTriangleIcon className="w-5 h-5" style={{ width: 20, height: 20 }} /> Perhatian:
            </p>
            <ul className={styles.warningList}>
              <li>Harap datang 15 menit sebelum jadwal</li>
              <li>Gunakan masker dan patuhi protokol kesehatan</li>
              <li>Jika berhalangan, segera batalkan jadwal anda</li>
            </ul>
          </div>

          <div className={styles.actions}>
            <button type="reset" className={styles.btnCancel} onClick={() => setMode('new')}>Reset</button>
            <button type="submit" className={styles.btnSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Memproses...' : 'Konfirmasi Pendaftaran'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
