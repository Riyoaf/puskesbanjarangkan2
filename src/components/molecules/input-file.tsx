/* eslint-disable @typescript-eslint/no-explicit-any */
// components/molecules/input-file.tsx
import React from "react";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface InputFileProps {
  control: UseFormReturn<any>["control"];
  name: string;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
}

export function InputFile({
  control,
  name,
  label,
  placeholder,
  isDisabled = false,
}: InputFileProps) {
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file); // Kirim File object, bukan string
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*"
              placeholder={placeholder}
              disabled={isDisabled}
              onChange={(e) => handleFileChange(e, field)}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
