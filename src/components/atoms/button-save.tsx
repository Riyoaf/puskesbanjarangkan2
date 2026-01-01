import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

interface ButtonSaveProps {
  isLoading?: boolean;
  disabled?: boolean;
}

export default function ButtonSave({ isLoading, disabled }: ButtonSaveProps) {
  return (
    <Button
      type="submit"
      className="w-full"
      size={"sm"}
      disabled={isLoading || disabled}>
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Spinner />
          Proses
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Save />
          Simpan
        </div>
      )}
    </Button>
  );
}
