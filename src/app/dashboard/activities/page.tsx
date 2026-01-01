"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Description, Heading1 } from "@/components/atoms/typography";
import CardBody from "@/components/molecules/card-body";
import ActivityCard from "@/components/organisms/activity-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActivities } from "@/hooks/use-activity";
import { usePathSegments } from "@/hooks/use-path-segment";
import { TActivity } from "@/schema/activity-schema";

export default function ActivitiesPage() {
  const { data, isLoading } = useActivities();
  const activities: TActivity[] | null | undefined = useMemo(
    () => data?.data,
    [data]
  );
  const pathSegments = usePathSegments();

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <Heading1 text="Kelola Kegiatan Puskesmas" />
          <Description text="Kelola kegiatan yang akan dilaksanakan oleh Puskesmas" />
        </div>
        <Link href={pathSegments.fullPath + "/add"}>
          <Button>
            <Plus />
            Tambah Kegiatan
          </Button>
        </Link>
      </div>

      <div className="gap-4 space-y-4 grid grid-cols-1 md:grid-cols-2">
        {isLoading &&
          Array(3)
            .fill(0)
            .map((_, i) => (
              <CardBody key={i}>
                <div className="space-y-4">
                  <Skeleton className="w-1/2 h-6" />
                  <Skeleton className="w-full h-64" />
                </div>
              </CardBody>
            ))}
        {activities?.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
