/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState } from "react";

import { signout } from "@/app/auth/actions";
import {
  Bars3Icon,
  BeakerIcon,
  CalendarIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  NewspaperIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import styles from "./layout.module.css";

export default function Sidebar({ profile }: { profile: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar">
        <Bars3Icon className="w-6 h-6" style={{ width: 24, height: 24 }} />
      </button>

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logo}>
          <h2>Admin Panel</h2>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <XMarkIcon className="w-6 h-6" style={{ width: 24, height: 24 }} />
          </button>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/dashboard"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}>
            <HomeIcon
              className="w-5 h-5"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />{" "}
            Dashboard
          </Link>
          <Link
            href="/dashboard/activities"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}>
            <CalendarIcon
              className="w-5 h-5"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />{" "}
            Kelola Kegiatan
          </Link>
          <Link
            href="/dashboard/news"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}>
            <NewspaperIcon
              className="w-5 h-5"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />{" "}
            Kelola Berita
          </Link>
          <Link
            href="/dashboard/registrations"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}>
            <ClipboardDocumentCheckIcon
              className="w-5 h-5"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />{" "}
            Verifikasi Pendaftaran
          </Link>
          <Link
            href="/dashboard/patients"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}>
            <UsersIcon
              className="w-5 h-5"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />{" "}
            Data Pasien
          </Link>
          <Link
            href="/dashboard/vaccines"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}>
            <BeakerIcon
              className="w-5 h-5"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />{" "}
            Kelola Vaksin
          </Link>
          <Link
            href="/dashboard/reports"
            className={styles.navItem}
            onClick={() => setIsOpen(false)}>
            <ChartBarIcon
              className="w-5 h-5"
              style={{ width: 20, height: 20, marginRight: 8 }}
            />{" "}
            Laporan
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
  );
}
