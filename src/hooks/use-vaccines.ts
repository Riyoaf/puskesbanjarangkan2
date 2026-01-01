import { toast } from "sonner";

import {
  createVaccine,
  deleteVaccine,
  getVaccines,
  updateVaccine,
} from "@/actions/vacinne-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryKey = "vaccines";

const toastText = "Vaksin ";

export function useVaccines() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getVaccines,
  });
}

export function useCreateVaccine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVaccine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(toastText + "berhasil dibuat");
    },
    onError: (error) => {
      toast.error(toastText + "gagal dibuat");
      console.error("Error creating data:", error);
    },
  });
}

export function useUpdateVaccine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateVaccine,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      toast.success(toastText + "berhasil diperbarui");
    },
    onError: (error) => {
      toast.error(toastText + "gagal diperbarui");
      console.error("Error creating data:", error);
    },
  });
}

export function useDeleteVaccine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVaccine(id),

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
