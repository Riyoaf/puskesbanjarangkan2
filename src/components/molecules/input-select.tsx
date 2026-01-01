"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TSelectOption } from "@/types/types";

interface InputSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  required?: boolean;
  options: TSelectOption[];
}

export function InputSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isDisabled,
  required = true,
  options,
}: InputSelectProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>{label}</FormLabel>
            {required && <p className="text-red-500">*</p>}
          </div>
          <Select
            onValueChange={(val) => {
              const selected = options.find(
                (opt) => opt.value.toString() === val
              );
              if (!selected) {
                field.onChange(val);
                return;
              }

              if (typeof selected.value === "number") {
                field.onChange(Number(val));
              } else {
                field.onChange(val);
              }
            }}
            value={field.value?.toString()}
            disabled={isDisabled}
            required={required}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value.toString()}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
