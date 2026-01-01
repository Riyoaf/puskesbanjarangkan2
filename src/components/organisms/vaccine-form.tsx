import { UseFormReturn } from "react-hook-form";

import ButtonSave from "@/components/atoms/button-save";
import { Form } from "@/components/ui/form";
import { TVaccine } from "@/schema/vaccine-schema";

import { InputNumber } from "../molecules/input-number";
import { InputText } from "../molecules/input-text";
import { InputTextarea } from "../molecules/input-text-area";

interface Props {
  form: UseFormReturn<TVaccine>;
  isLoading: boolean;
  onSubmit: (values: TVaccine) => void;
}

export default function VaccineForm({ form, isLoading, onSubmit }: Props) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6">
        <InputText
          control={form.control}
          name="name"
          label="Nama Vaksin"
          placeholder="Nama vaksin"
          isDisabled={isLoading}
        />
        <InputTextarea
          control={form.control}
          name="description"
          label="Deskripsi"
          placeholder="Deskripsi"
          isDisabled={isLoading}
        />
        <InputNumber
          control={form.control}
          name="stock"
          label="Stok"
          placeholder="Stok"
          isDisabled={isLoading}
        />

        <ButtonSave isLoading={isLoading} />
      </form>
    </Form>
  );
}
