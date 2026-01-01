"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputTextProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  isDisabled?: boolean;
  required?: boolean;
}

export function InputText<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  isDisabled,
  required = true,
}: InputTextProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-1 w-full">
            <FormLabel>{label}</FormLabel>
            {required && <p className="text-red-500">*</p>}
          </div>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              className="w-full"
              disabled={isDisabled}
              required={required}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
