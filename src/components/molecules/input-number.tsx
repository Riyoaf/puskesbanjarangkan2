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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../ui/input-group";

interface InputNumberProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  required?: boolean;
  addOn?: string;
  alignAddOn?: "inline-start" | "inline-end";
}

export function InputNumber<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isDisabled,
  required = true,
  addOn,
  alignAddOn = "inline-end",
}: InputNumberProps<T>) {
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
          <FormControl>
            <div className="">
              <InputGroup>
                <InputGroupInput
                  placeholder={placeholder}
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  className="w-full"
                  disabled={isDisabled}
                />
                {addOn && (
                  <InputGroupAddon align={alignAddOn}>
                    <InputGroupText>{addOn}</InputGroupText>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
