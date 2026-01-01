import { useForm } from "react-hook-form";

import { useCreateActivity } from "@/hooks/use-activity";
import { FormActivitySchema, TActivity } from "@/schema/activity-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import ActivityForm from "./activity-form";

export function AddActivityForm() {
  const { mutateAsync, isPending } = useCreateActivity();

  const form = useForm<TActivity>({
    resolver: zodResolver(FormActivitySchema),
    defaultValues: {},
  });

  async function onSubmit(values: TActivity) {
    const payload: TActivity = {
      id: crypto.randomUUID(),
      date: values.date,
      title: values.title,
      location: values.location,
      description: values.description,
      image: values.image,
    };

    await mutateAsync(payload);

    form.reset();
  }

  return <ActivityForm form={form} isLoading={isPending} onSubmit={onSubmit} />;
}
