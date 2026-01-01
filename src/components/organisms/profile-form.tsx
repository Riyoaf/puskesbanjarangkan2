import { UseFormReturn } from "react-hook-form";

import ButtonSave from "@/components/atoms/button-save";
import { Form } from "@/components/ui/form";
import { TProfile } from "@/schema/profile-schema";

import { InputText } from "../molecules/input-text";

interface Props {
  form: UseFormReturn<TProfile>;
  isLoading: boolean;
  onSubmit: (values: TProfile) => void;
}

export default function ProfileForm({ form, isLoading, onSubmit }: Props) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6">
        <InputText
          control={form.control}
          name="full_name"
          label="Nama Lengkap"
          placeholder="Nama lengkap"
          isDisabled={isLoading}
        />

        <ButtonSave isLoading={isLoading} />
      </form>
    </Form>
  );
}
