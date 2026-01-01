import { useForm } from "react-hook-form";

import { useCreateVaccine } from "@/hooks/use-vaccines";
import { TVaccine } from "@/schema/vaccine-schema";

import VaccineForm from "./vaccine-form";

export function AddVaccineForm() {
  const { mutateAsync, isPending } = useCreateVaccine();

  const form = useForm<TVaccine>({
    // resolver: zodResolver(FormNewsSchema),
    defaultValues: {
      description: "",
      name: "",
      stock: 0,
    },
  });

  async function onSubmit(values: TVaccine) {
    const payload: TVaccine = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      stock: values.stock,
      created_at: new Date(),
    };

    const res = await mutateAsync(payload);

    if (res) {
      form.reset();
    }
  }

  return <VaccineForm form={form} isLoading={isPending} onSubmit={onSubmit} />;
}
