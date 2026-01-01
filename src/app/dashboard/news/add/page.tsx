"use client";

import ButtonBack from "@/components/atoms/button-back";
import { Description, Heading1 } from "@/components/atoms/typography";
import CardBody from "@/components/molecules/card-body";
import { AddNewsForm } from "@/components/organisms/add-news-form";

export default function Page() {
  return (
    <CardBody>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <Heading1 text="Tambah Berita" />
          <Description text="Buat berita baru untuk puskesmas" />
        </div>
        <ButtonBack />
      </div>

      <AddNewsForm />
    </CardBody>
  );
}
