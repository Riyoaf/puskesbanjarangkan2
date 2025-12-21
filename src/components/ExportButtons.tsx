'use client'

import { useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function ExportButtons() {
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const res = await fetch('/api/reports/export')
    if (!res.ok) throw new Error('Failed to fetch data')
    return res.json()
  }

  const handleDownloadCSV = async () => {
    try {
      setLoading(true)
      const data = await fetchData()
      
      if (!data || data.length === 0) {
        alert('Tidak ada data untuk diexport')
        return
      }

      // Define headers
      const headers = ['Nama Pasien', 'NIK', 'Tanggal Lahir', 'Vaksin', 'Tanggal Vaksin', 'Waktu', 'Status']
      const keys = ['patient_name', 'nik', 'birth_date', 'vaccine_name', 'scheduled_date', 'vaccination_time', 'status']

      // Convert to CSV
      const csvContent = [
        headers.join(','),
        ...data.map((row: any) => keys.map(key => `"${row[key] || ''}"`).join(','))
      ].join('\n')

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', `laporan_imunisasi_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export CSV Error:', error)
      alert('Gagal mengexport CSV')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      setLoading(true)
      const data = await fetchData()

      if (!data || data.length === 0) {
        alert('Tidak ada data untuk diexport')
        return
      }

      const doc = new jsPDF()

      // Add title
      doc.setFontSize(18)
      doc.text('Laporan Imunisasi Puskesmas Banjarangkan', 14, 22)
      doc.setFontSize(11)
      doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`, 14, 30)

      // Define columns and rows
      const tableColumn = ["Nama Pasien", "NIK", "Vaksin", "Tanggal", "Waktu"]
      const tableRows = data.map((row: any) => [
        row.patient_name,
        row.nik,
        row.vaccine_name,
        new Date(row.scheduled_date).toLocaleDateString('id-ID'),
        row.vaccination_time
      ])

      // Generate table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [22, 160, 133] }
      })

      doc.save(`laporan_imunisasi_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Export PDF Error:', error)
      alert('Gagal mengexport PDF')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <button 
        onClick={handleDownloadCSV} 
        className="btn" 
        style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Download CSV'}
      </button>
      <button 
        onClick={handleDownloadPDF} 
        className="btn" 
        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Download PDF'}
      </button>
    </div>
  )
}
