"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Switch } from "../ui/switch";

interface InputSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isDisabled?: boolean;
  required?: boolean;
}

export function InputSwitch<T extends FieldValues>({
  control,
  name,
  label,
  isDisabled,
  required = true,
}: InputSwitchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row justify-between items-center shadow-sm p-3 border rounded-lg">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1">
              <FormLabel>{label}</FormLabel>
              {required && <p className="text-red-500">*</p>}
            </div>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isDisabled}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
