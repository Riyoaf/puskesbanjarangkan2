import { Heading3 } from "lucide-react";

import {
  Description,
  Heading1,
  Heading2,
  Title,
} from "@/components/atoms/typography";
/* eslint-disable @typescript-eslint/no-explicit-any */
import DashboardCharts from "@/components/DashboardCharts";
import CardBody from "@/components/molecules/card-body";
import { createClient } from "@/utils/supabase/server";

import styles from "./page.module.css";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id)
    .single();

  const { count: totalUsers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data: visits } = await supabase
    .from("site_visits")
    .select("*")
    .gte("visit_date", sevenDaysAgo.toISOString().split("T")[0])
    .order("visit_date", { ascending: true });

  const today = new Date().toISOString().split("T")[0];
  const todayVisits =
    visits?.find((v: any) => v.visit_date === today)?.count || 0;

  return (
    <div>
      <div className="mb-4">
        <Title text="Dashboard" />
        <Description text="Selamat datang di halaman dashboard" />
      </div>

      <Heading2 text={`Selamat Datang, ${profile?.full_name}`} />

      <div className="gap-4 grid grid-cols-1 md:grid-cols-3 mt-4">
        <CardBody>
          <h3 className={styles.cardTitle}>Status Akun</h3>
          <p>
            {profile?.role === "admin" ? "Administrator" : "Pasien Terdaftar"}
          </p>
        </CardBody>

        {profile?.role === "admin" && (
          <>
            <CardBody>
              <h3 className={styles.cardTitle}>Total Pengguna</h3>
              <p className={`${styles.cardValue} ${styles.valueBlue}`}>
                {totalUsers || 0}
              </p>
              <span className={styles.cardLabel}>Terdaftar di sistem</span>
            </CardBody>
            <CardBody>
              <h3 className={styles.cardTitle}>Kunjungan Hari Ini</h3>
              <p className={`${styles.cardValue} ${styles.valueGreen}`}>
                {todayVisits}
              </p>
              <span className={styles.cardLabel}>Website views</span>
            </CardBody>
          </>
        )}
      </div>

      {profile?.role === "admin" && <DashboardCharts visits={visits || []} />}
    </div>
  );
}
