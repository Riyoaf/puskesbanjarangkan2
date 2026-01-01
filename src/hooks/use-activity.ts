import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createActivity,
  deleteActivity,
  getActivities,
  getActivityById,
  updateActivity,
} from "@/actions/activity-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryKey = "activities";

const toastText = "Kegiatan ";

export function useActivities() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getActivities,
  });
}

export function useActivityById(id: string) {
  return useQuery({
    queryKey: [queryKey, id],
    queryFn: () => getActivityById(id),
    enabled: !!id,
  });
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: createActivity,
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

export function useUpdateActivity() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateActivity,

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

export function useDeleteActivity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteActivity(id),

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
