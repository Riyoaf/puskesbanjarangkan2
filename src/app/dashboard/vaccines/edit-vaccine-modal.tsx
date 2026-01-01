"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Description, Heading1 } from "@/components/atoms/typography";
import CardBody from "@/components/molecules/card-body";
import { EditVaccineForm } from "@/components/organisms/edit-vaccine-form";
import { Button } from "@/components/ui/button";
import { TVaccine } from "@/schema/vaccine-schema";

export default function EditVaccineModal({ vaccine }: { vaccine: TVaccine }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant={"link"}>
        <Pencil />
      </Button>

      {isOpen && (
        <div className="top-0 right-0 bottom-0 left-0 fixed flex justify-center items-center bg-black/20">
          <CardBody>
            <Heading1 text="Edit Vaksin" />
            <Description text="Edit vaksin yang akan ditangani oleh Puskesmas" />

            <EditVaccineForm payload={vaccine} />
            <Button
              onClick={() => setIsOpen(false)}
              variant={"outline"}
              className="mt-4 w-full">
              Batal
            </Button>
          </CardBody>
        </div>
      )}
    </>
  );
}
