import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useDeleteVaccine } from "@/hooks/use-vaccines";

interface Props {
  id: string;
}

export function DeleteVaccineButton({ id }: Props) {
  const { isPending, mutateAsync } = useDeleteVaccine();
  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus vaksin ini?")) {
      return;
    }

    await mutateAsync(id);
  };

  return (
    <>
      <Button variant={"link"} onClick={handleDelete} disabled={isPending}>
        {isPending ? <Spinner /> : <Trash />}
      </Button>
    </>
  );
}
