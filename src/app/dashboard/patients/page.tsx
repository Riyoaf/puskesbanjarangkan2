/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";

import { Description, Heading1 } from "@/components/atoms/typography";
import { EditProfileForm } from "@/components/organisms/edit-profile-form";
import { Button } from "@/components/ui/button";
import { usePatiens } from "@/hooks/use-profiles";
import { useRegistrations } from "@/hooks/use-registrations";
import { formatDate } from "@/lib/utils";
import { TProfile } from "@/schema/profile-schema";
import { TRegistration } from "@/schema/registration-schema";
import { createClient } from "@/utils/supabase/client";

import styles from "./page.module.css";

export default function Page() {
  const { data: patients, isLoading: isLoadingPatients } = usePatiens();
  const { data: registrations, isLoading: isLoadingRegistrations } =
    useRegistrations();
  const [editingProfile, setEditingProfile] = useState<any | null>(null);

  const patientsData: TProfile[] | null | undefined = useMemo(
    () => patients?.data,
    [patients]
  );
  const registrationsData: TRegistration[] | null | undefined = useMemo(
    () => registrations?.data,
    [registrations]
  );
  const supabase = createClient();

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah anda yakin ingin menghapus data pasien ini?")) return;

    const { error } = await supabase.from("profiles").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      // fetchData();
    }
  };

  const handleEdit = (profile: any) => {
    setEditingProfile(profile);
  };

  const loading = isLoadingPatients || isLoadingRegistrations;

  return (
    <div>
      <div className="mb-6">
        <Heading1 text="Kelola Data Pasien" />
        <Description text="Kelola pasien yang akan ditangani oleh Puskesmas" />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {patientsData &&
            patientsData.map((profile) => {
              const patientRegs =
                (registrationsData &&
                  registrationsData.filter((r) => r.user_id === profile.id)) ||
                [];
              const completedCount = patientRegs.filter(
                (r) => r.status === "completed"
              ).length;

              return (
                <div key={profile.id} className={styles.card}>
                  <div className={styles.header}>
                    <div className={styles.avatar}>
                      {profile.email?.[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className={styles.name}>
                        {profile.full_name || "Tanpa Nama"}
                      </h3>
                      <p className={styles.email}>{profile.email}</p>
                    </div>
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Total Vaksinasi</span>
                      <span className={styles.statValue}>{completedCount}</span>
                    </div>
                  </div>

                  <div className={styles.history}>
                    <h4 className={styles.historyTitle}>Riwayat Vaksinasi</h4>
                    {patientRegs.length > 0 ? (
                      <ul className="space-y-2">
                        {patientRegs
                          .filter((r) => r.status === "completed")
                          .map((reg) => (
                            <li
                              key={reg.id}
                              className="flex flex-wrap items-center gap-2">
                              <div className={styles.historyDetail}>
                                <span className={styles.vaccineName}>
                                  {reg.vaccines?.name}
                                </span>
                                <span className={styles.patientNameDetail}>
                                  ({reg.patient_name})
                                </span>
                              </div>
                              <span
                                className={`${styles.badge} ${
                                  styles[reg.status]
                                }`}>
                                {reg.status}
                              </span>
                              <span className={styles.date}>
                                {formatDate(
                                  reg.created_at?.toString() as string
                                )}
                              </span>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className={styles.emptyHistory}>Belum ada riwayat.</p>
                    )}
                  </div>

                  <div className={styles.actions}>
                    <button
                      onClick={() => handleEdit(profile)}
                      className={styles.btnEdit}>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(profile.id as string)}
                      className={styles.btnDelete}>
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {editingProfile && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Pasien</h2>
            <EditProfileForm payload={editingProfile} />

            <Button
              variant={"outline"}
              onClick={() => setEditingProfile(null)}
              className="mt-2 w-full">
              Batal
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
