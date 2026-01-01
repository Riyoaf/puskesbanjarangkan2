import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateVaccine } from "@/hooks/use-vaccines";
import { TVaccine } from "@/schema/vaccine-schema";

import VaccineForm from "./vaccine-form";

interface Props {
  payload: TVaccine;
}

export function EditVaccineForm({ payload }: Props) {
  const { mutateAsync, isPending } = useUpdateVaccine();

  const form = useForm<TVaccine>({
    // resolver: zodResolver(FormProfileSchema),
    defaultValues: {
      id: payload.id,
      name: payload.name,
      description: payload.description,
      stock: payload.stock,
    },
  });

  async function onSubmit(values: TVaccine) {
    const res = await mutateAsync({
      id: payload.id as string,
      payload: values,
    });

    if (res.error) {
      toast.error("Gagal membuat berita baru");
    } else {
      form.reset();
    }
  }

  return <VaccineForm form={form} isLoading={isPending} onSubmit={onSubmit} />;
}
