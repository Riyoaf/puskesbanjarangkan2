import { toast } from "sonner";

import { getProfilePatiens, updateProfile } from "@/actions/profile-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const queryKey = "patients";

const toastText = "Pasien ";

export function usePatiens() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getProfilePatiens,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

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
