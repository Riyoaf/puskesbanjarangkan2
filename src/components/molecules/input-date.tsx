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

interface InputDateProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isDisabled?: boolean;
  required?: boolean;
  dateStart?: string | Date; // Ubah ke string atau Date
  dateEnd?: string | Date; // Ubah ke string atau Date
  placeholder?: string;
}

export function InputDate<T extends FieldValues>({
  control,
  name,
  label,
  isDisabled,
  required = true,
  dateStart,
  dateEnd,
  placeholder = "Pilih tanggal",
}: InputDateProps<T>) {
  // Format date untuk input (YYYY-MM-DD)
  const formatDateForInput = (date: any): string => {
    if (!date) return "";

    try {
      let dateObj: Date;

      if (date instanceof Date) {
        dateObj = date;
      } else if (typeof date === "string") {
        // Jika sudah format YYYY-MM-DD, langsung return
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return date;
        }
        dateObj = new Date(date);
      } else if (typeof date === "number") {
        dateObj = new Date(date);
      } else {
        return "";
      }

      if (isNaN(dateObj.getTime())) {
        return "";
      }

      // Format ke YYYY-MM-DD untuk input[type="date"]
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  };

  // Parse date dari input (string YYYY-MM-DD)
  const parseDateFromInput = (value: string): string | null => {
    if (!value) return null;

    // Validasi format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return null;
    }

    try {
      // Parse untuk validasi
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return null;
      }

      // Return string YYYY-MM-DD
      return value;
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  };

  const getMinDate = (): string | undefined => {
    if (!dateStart) return undefined;
    return formatDateForInput(dateStart);
  };

  const getMaxDate = (): string | undefined => {
    if (!dateEnd) return undefined;
    return formatDateForInput(dateEnd);
  };

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
            <Input
              type="date"
              {...field}
              className="w-full"
              disabled={isDisabled}
              value={formatDateForInput(field.value)}
              onChange={(e) => {
                const dateString = parseDateFromInput(e.target.value);
                // Simpan sebagai string YYYY-MM-DD
                field.onChange(dateString);
              }}
              onBlur={field.onBlur}
              min={getMinDate()}
              max={getMaxDate()}
              required={required}
              placeholder={placeholder}
            />
          </FormControl>

          {(dateStart || dateEnd) && (
            <p className="mt-1 text-muted-foreground text-xs">
              {dateStart && dateEnd
                ? `Tanggal tersedia: ${formatDateToDisplay(
                    dateStart
                  )} - ${formatDateToDisplay(dateEnd)}`
                : dateStart
                ? `Tanggal mulai dari: ${formatDateToDisplay(dateStart)}`
                : `Tanggal maksimal: ${formatDateToDisplay(dateEnd!)}`}
            </p>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Helper function untuk format display
function formatDateToDisplay(date: string | Date): string {
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) {
      return "Invalid Date";
    }

    return dateObj.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "Invalid Date";
  }
}
