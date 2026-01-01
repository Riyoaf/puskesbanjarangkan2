import { z } from "zod";

export const FormRegistrationSchema = z.object({
  id: z.string().optional(),
  user_id: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  vaccine_id: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  status: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  scheduled_date: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  created_at: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    }, z.date())
    .optional(),
  nik: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  birth_date: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  vaccination_time: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  queue_number: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  patient_name: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  phone_number: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  email: z.string().email(),
  vaccines: z
    .object({
      name: z.string().optional(),
    })
    .optional(),
});

export type TRegistration = z.infer<typeof FormRegistrationSchema>;
