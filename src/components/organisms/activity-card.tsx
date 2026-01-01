import { CalendarIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

import { DeleteActivityButton } from "@/components/organisms/delete-activity-form";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { TActivity } from "@/schema/activity-schema";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import CardBody from "../molecules/card-body";

interface Props {
  activity: TActivity;
}

export default function ActivityCard({ activity }: Props) {
  return (
    <CardBody key={activity.id}>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="font-medium text-lg">{activity.title}</h3>
        <div className="flex gap-4">
          <Link href={`/dashboard/activities/${activity.id}/edit`}>
            <Button variant={"outline"}>
              <PencilSquareIcon className="w-6 h-6" />
            </Button>
          </Link>

          <DeleteActivityButton id={activity.id as string} />
        </div>
      </div>

      {activity.image_url && (
        <img
          src={activity.image_url}
          alt={activity.title}
          className="pt-4 rounded-md w-full"
        />
      )}

      <div className="flex items-center gap-2 py-4 text-muted-foreground text-sm">
        <CalendarIcon className="w-4 h-4" /> {formatDate(activity.date)}
        <MapPinIcon className="w-4 h-4" /> {activity.location}
      </div>
      <p className="text-muted-foreground text-sm text-justify">
        {activity.description}
      </p>
    </CardBody>
  );
}
