import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUpdateNews } from "@/hooks/use-news";
import { TNews } from "@/schema/news-schema";

import NewsForm from "./news-form";

interface Props {
  payload: TNews;
}

export function EditNewsForm({ payload }: Props) {
  const { mutateAsync, isPending } = useUpdateNews();

  const form = useForm<TNews>({
    // resolver: zodResolver(FormNewsSchema),
    defaultValues: {
      id: payload.id,
      title: payload.title,
      content: payload.content,
      image: payload.image,
      image_url: payload.image_url,
      created_at: payload.created_at,
    },
  });

  async function onSubmit(values: TNews) {
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

  return <NewsForm form={form} isLoading={isPending} onSubmit={onSubmit} />;
}
