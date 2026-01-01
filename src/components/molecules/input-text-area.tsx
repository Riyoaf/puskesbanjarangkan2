"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface InputTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  required?: boolean;
}

export function InputTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isDisabled,
  required = true,
}: InputTextareaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-1">
            <FormLabel>{label}</FormLabel>
            {required && <span className="text-red-500">*</span>}
          </div>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              {...field}
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
