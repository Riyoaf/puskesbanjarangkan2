"use client";

import { useMemo } from "react";

import { useActivityById } from "@/hooks/use-activity";
import { TActivity } from "@/schema/activity-schema";

import ButtonBack from "../atoms/button-back";
import { Description, Heading1 } from "../atoms/typography";
import CardBody from "../molecules/card-body";
import { EmptyOutline } from "../molecules/empty-outline";
import FormSkeleton from "../molecules/form-skeleton";
import { EditActivityForm } from "../organisms/edit-activity-form";

interface Props {
  id: string;
}

export default function EditActivityPage({ id }: Props) {
  const { data, isLoading } = useActivityById(id);
  const activityData: TActivity | null | undefined = useMemo(
    () => data?.data,
    [data]
  );

  return (
    <CardBody>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <Heading1 text="Perbarui Kegiatan" />
          <Description text="Perbarui data kegiatan untuk puskesmas" />
        </div>
        <ButtonBack />
      </div>
      {isLoading && <FormSkeleton columnCount={1} rowCount={5} />}
      {data && !activityData && <EmptyOutline />}
      {data && activityData && (
        <EditActivityForm activity={activityData as TActivity} />
      )}
    </CardBody>
  );
}
