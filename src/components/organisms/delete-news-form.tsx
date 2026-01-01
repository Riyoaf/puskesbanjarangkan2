import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useDeleteNews } from "@/hooks/use-news";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  id: string;
}

export function DeleteNewsButton({ id }: Props) {
  const { isPending, mutateAsync } = useDeleteNews();
  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
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
