import { getRegistrations } from "@/actions/registration-actions";
import { useQuery } from "@tanstack/react-query";

const queryKey = "registrations";

const toastText = "Pendaftaran vaksin ";

export function useRegistrations() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: getRegistrations,
  });
}
