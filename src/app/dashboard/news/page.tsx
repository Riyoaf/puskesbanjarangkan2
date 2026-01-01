"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Description, Heading1 } from "@/components/atoms/typography";
import CardBody from "@/components/molecules/card-body";
import NewsCard from "@/components/organisms/news-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/use-news";
import { usePathSegments } from "@/hooks/use-path-segment";
import { TNews } from "@/schema/news-schema";

export default function Page() {
  const { data, isLoading } = useNews();
  const pathSegments = usePathSegments();
  const newsData: TNews[] | null | undefined = useMemo(
    () => data?.data,
    [data]
  );

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <Heading1 text="Kelola Berita Puskesmas" />
          <Description text="Kelola berita yang akan dilaksanakan oleh Puskesmas" />
        </div>
        <Link href={pathSegments.fullPath + "/add"}>
          <Button>
            <Plus />
            Tambah Berita
          </Button>
        </Link>
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
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
        {newsData?.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
}
