import { UseFormReturn } from "react-hook-form";

import ButtonSave from "@/components/atoms/button-save";
import { InputDate } from "@/components/molecules/input-date";
import { InputFile } from "@/components/molecules/input-file";
import { InputTextarea } from "@/components/molecules/input-text-area";
import { Form } from "@/components/ui/form";
import { TActivity } from "@/schema/activity-schema";

import { InputText } from "../molecules/input-text";

interface Props {
  form: UseFormReturn<TActivity>;
  isLoading: boolean;
  onSubmit: (values: TActivity) => void;
}

export default function ActivityForm({ form, isLoading, onSubmit }: Props) {
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
        <InputDate
          control={form.control}
          name="date"
          label="Tanggal Kegiatan"
          placeholder="Tanggal kegiatan"
          isDisabled={isLoading}
        />
        <InputText
          control={form.control}
          name="location"
          label="Lokasi Kegiatan"
          placeholder="Lokasi kegiatan"
          isDisabled={isLoading}
        />
        <InputTextarea
          control={form.control}
          name="description"
          label="Deskripsi Kegiatan"
          placeholder="Deskripsi kegiatan"
          isDisabled={isLoading}
        />
        {form.watch("image_url") && (
          <div>
            <img src={form.watch("image_url")} alt="Current" />
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
