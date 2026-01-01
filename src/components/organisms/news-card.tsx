import { CalendarIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { TNews } from "@/schema/news-schema";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import CardBody from "../molecules/card-body";
import { DeleteNewsButton } from "./delete-news-form";

interface Props {
  news: TNews;
}

export default function NewsCard({ news }: Props) {
  return (
    <CardBody key={news.id}>
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="font-medium text-lg">{news.title}</h3>
        <div className="flex gap-4">
          <Link href={`/dashboard/news/${news.id}/edit`}>
            <Button variant={"outline"}>
              <PencilSquareIcon className="w-6 h-6" />
            </Button>
          </Link>

          <DeleteNewsButton id={news.id as string} />
        </div>
      </div>

      {news.image_url && (
        <img
          src={news.image_url}
          alt={news.title}
          className="pt-4 rounded-md w-full"
        />
      )}

      <div className="flex items-center gap-2 my-4 text-muted-foreground text-sm">
        <CalendarIcon className="w-4 h-4" />{" "}
        <p>{formatDate(news.created_at?.toString() as string)}</p>
      </div>
      <p>{news.content}</p>

      <p className="text-muted-foreground text-sm text-justify">
        {news.content}
      </p>
    </CardBody>
  );
}
