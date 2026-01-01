"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function ButtonBack() {
  const router = useRouter();
  function handleBack() {
    router.back();
  }

  return (
    <Button size={"sm"} variant={"outline"} onClick={handleBack}>
      <ArrowLeft />
      Kembali
    </Button>
  );
}
