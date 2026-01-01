import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateProfile } from "@/hooks/use-profiles";
import { TProfile } from "@/schema/profile-schema";

import ProfileForm from "./profile-form";

interface Props {
  payload: TProfile;
}

export function EditProfileForm({ payload }: Props) {
  const { mutateAsync, isPending } = useUpdateProfile();

  const form = useForm<TProfile>({
    // resolver: zodResolver(FormProfileSchema),
    defaultValues: {
      id: payload.id,
      full_name: payload.full_name,
      email: payload.email,
      role: payload.role,
    },
  });

  async function onSubmit(values: TProfile) {
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

  return <ProfileForm form={form} isLoading={isPending} onSubmit={onSubmit} />;
}
