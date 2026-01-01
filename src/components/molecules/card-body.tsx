import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn(className)}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
