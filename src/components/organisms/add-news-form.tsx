import { useForm } from "react-hook-form";

import { useCreateNews } from "@/hooks/use-news";
import { TNews } from "@/schema/news-schema";

import NewsForm from "./news-form";

export function AddNewsForm() {
  const { mutateAsync, isPending } = useCreateNews();

  const form = useForm<TNews>({
    // resolver: zodResolver(FormNewsSchema),
    defaultValues: {},
  });

  async function onSubmit(values: TNews) {
    const payload: TNews = {
      id: crypto.randomUUID(),
      title: values.title,
      content: values.content,
      image: values.image,
    };

    await mutateAsync(payload);

    form.reset();
  }

  return <NewsForm form={form} isLoading={isPending} onSubmit={onSubmit} />;
}
