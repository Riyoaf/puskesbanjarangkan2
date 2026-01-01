import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useDeleteActivity } from "@/hooks/use-activities";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  id: string;
}

export function DeleteActivityButton({ id }: Props) {
  const { isPending, mutateAsync } = useDeleteActivity();
  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
      return;
    }

    await mutateAsync(id);
  };

  return (
    <>
      <Button variant={"outline"} onClick={handleDelete} disabled={isPending}>
        {isPending ? <Spinner /> : <TrashIcon className="w-5 h-5" />}
      </Button>
    </>
  );
}
