import { AlertCircle, LucideIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface EmptyOutlineProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function EmptyOutline({
  icon: Icon = AlertCircle,
  title = "Data Tidak Ditemukan",
  description = "Tidak ada data yang tersedia",
  children,
}: EmptyOutlineProps) {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {children && <EmptyContent>{children}</EmptyContent>}
    </Empty>
  );
}
