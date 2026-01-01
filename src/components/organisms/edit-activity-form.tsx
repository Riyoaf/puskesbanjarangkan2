import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateActivity } from "@/hooks/use-activities";
import { FormActivitySchema, TActivity } from "@/schema/activity-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import ActivityForm from "./activity-form";

interface Props {
  activity: TActivity;
}

export function EditActivityForm({ activity }: Props) {
  const { mutateAsync, isPending } = useUpdateActivity();

  const form = useForm<TActivity>({
    resolver: zodResolver(FormActivitySchema),
    defaultValues: {
      id: activity.id,
      date: activity.date,
      title: activity.title,
      location: activity.location,
      description: activity.description,
      image: activity.image,
      image_url: activity.image_url,
    },
  });

  async function onSubmit(values: TActivity) {
    const res = await mutateAsync({
      id: activity.id as string,
      payload: values,
    });
    if (res.error) {
      toast.error("Gagal membuat kegiatan baru");
    } else {
      form.reset();
    }
  }

  return <ActivityForm form={form} isLoading={isPending} onSubmit={onSubmit} />;
}
