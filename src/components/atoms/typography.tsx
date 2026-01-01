import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function Title({
  text,
  className,
  icon: Icon,
}: {
  text: string;
  className?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-2">
      <h1
        className={cn(
          "font-semibold text-primary text-xl md:text-2xl lg:text-3xl",
          className
        )}>
        {text}
      </h1>
      {Icon && <Icon className="w-5 h-5 text-primary" />}
    </div>
  );
}

export function Heading1({
  text,
  className,
  icon: Icon,
}: {
  text: string;
  className?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-2">
      <h1
        className={cn(
          "font-semibold text-primary text-lg md:text-xl lg:text-2xl",
          className
        )}>
        {text}
      </h1>
      {Icon && <Icon className="w-5 h-5 text-primary" />}
    </div>
  );
}

export function Heading2({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "font-medium text-primary text-sm md:text-lg lg:text-xl",
        className
      )}>
      {text}
    </h2>
  );
}

export function Description({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{text}</p>
  );
}
