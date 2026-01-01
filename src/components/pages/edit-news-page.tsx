"use client";

import { useMemo } from "react";

import { useNewsById } from "@/hooks/use-news";
import { TNews } from "@/schema/news-schema";

import ButtonBack from "../atoms/button-back";
import { Description, Heading1 } from "../atoms/typography";
import CardBody from "../molecules/card-body";
import { EmptyOutline } from "../molecules/empty-outline";
import FormSkeleton from "../molecules/form-skeleton";
import { EditNewsForm } from "../organisms/edit-news-form";

interface Props {
  id: string;
}

export default function EditNewsPage({ id }: Props) {
  const { data, isLoading } = useNewsById(id);
  const newsData: TNews | null | undefined = useMemo(() => data?.data, [data]);

  return (
    <CardBody>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <Heading1 text="Perbarui Berita" />
          <Description text="Perbarui data berita untuk puskesmas" />
        </div>
        <ButtonBack />
      </div>
      {isLoading && <FormSkeleton columnCount={1} rowCount={5} />}
      {data && !newsData && <EmptyOutline />}
      {data && newsData && <EditNewsForm payload={newsData as TNews} />}
    </CardBody>
  );
}
