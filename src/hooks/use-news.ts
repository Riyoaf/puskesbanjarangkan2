import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createNews,
  deleteNews,
  getNews,
  getNewsById,
  updateNews,
} from "@/actions/news-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryKey = "news";

const toastText = "Berita ";

export function useNews() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getNews,
  });
}

export function useNewsById(id: string) {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(toastText + "berhasil dibuat");
      router.back();
    },
    onError: (error) => {
      toast.error(toastText + "gagal dibuat");
      console.error("Error creating data:", error);
    },
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateNews,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(toastText + "berhasil dibuat");
      router.back();
    },
    onError: (error) => {
      toast.error(toastText + "gagal dibuat");
      console.error("Error creating data:", error);
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNews(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(toastText + "berhasil dihapus");
    },
    onError: (error) => {
      toast.error(toastText + "gagal dihapus");
      console.error("Error creating data:", error);
    },
  });
}
