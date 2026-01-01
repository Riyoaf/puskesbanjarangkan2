"use client";

import { useMemo } from "react";

import { Description, Heading1 } from "@/components/atoms/typography";
import CardBody from "@/components/molecules/card-body";
import { AddVaccineForm } from "@/components/organisms/add-vaccine-form";
import { DeleteVaccineButton } from "@/components/organisms/delete-vaccine-form";
import { useVaccines } from "@/hooks/use-vaccines";
import { TVaccine } from "@/schema/vaccine-schema";

import EditVaccineModal from "./edit-vaccine-modal";
import styles from "./page.module.css";

export default function VaccinesPage() {
  const { data, isLoading } = useVaccines();
  const vaccinesData: TVaccine[] | null | undefined = useMemo(
    () => data?.data,
    [data]
  );

  return (
    <div>
      <div className="mb-6">
        <Heading1 text="Kelola Data Vaksin" />
        <Description text="Kelola vaksin yang akan ditangani oleh Puskesmas" />
      </div>

      <div className="md:gap-4 space-y-4 grid grid-cols-1 md:grid-cols-3">
        <CardBody className="">
          <AddVaccineForm />
        </CardBody>
        <div className="gap-4 grid md:col-span-2">
          {vaccinesData?.map((v) => (
            <CardBody key={v.id} className="h-fit">
              <div className="flex flex-wrap justify-between items-center gap-4">
                <h3 className="font-semibold text-sm">{v.name}</h3>
                <div className="flex items-center">
                  <EditVaccineModal vaccine={v} />
                  <DeleteVaccineButton id={v.id as string} />
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                {v.description || "Tidak ada deskripsi"}
              </p>
            </CardBody>
          ))}
        </div>
      </div>
    </div>
  );
}
