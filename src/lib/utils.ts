import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format tanggal ke format "1 Januari 2000"
 * @param {string|Date} date - Tanggal yang akan diformat
 * @returns {string} Tanggal dalam format "1 Januari 2000"
 */
export function formatDate(date: string | Date): string {
  // Handle jika date adalah string atau Date object
  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Validasi tanggal
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    console.error("Invalid date provided to formatDate:", date);
    return "Tanggal tidak valid";
  }

  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  // Nama bulan dalam bahasa Indonesia
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return `${day} ${monthNames[month]} ${year}`;
}
