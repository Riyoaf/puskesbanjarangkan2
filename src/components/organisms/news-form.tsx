import { UseFormReturn } from "react-hook-form";

import ButtonSave from "@/components/atoms/button-save";
import { InputFile } from "@/components/molecules/input-file";
import { InputTextarea } from "@/components/molecules/input-text-area";
import { Form } from "@/components/ui/form";
import { TNews } from "@/schema/news-schema";

import { InputText } from "../molecules/input-text";

interface Props {
  form: UseFormReturn<TNews>;
  isLoading: boolean;
  onSubmit: (values: TNews) => void;
}

export default function NewsForm({ form, isLoading, onSubmit }: Props) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6">
        <InputText
          control={form.control}
          name="title"
          label="Judul Kegiatan"
          placeholder="Judul kegiatan"
          isDisabled={isLoading}
        />
        <InputTextarea
          control={form.control}
          name="content"
          label="Konten Berita"
          placeholder="Konten berita"
          isDisabled={isLoading}
        />
        {form.watch("image_url") && (
          <div>
            <img src={form.watch("image_url") as string} alt="Current" />
            <p>Gambar saat ini</p>
          </div>
        )}
        <InputFile
          control={form.control}
          name="image"
          label="Gambar"
          placeholder="Gambar"
          isDisabled={isLoading}
        />

        <ButtonSave isLoading={isLoading} />
      </form>
    </Form>
  );
}
