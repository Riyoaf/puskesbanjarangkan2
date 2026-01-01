import { z } from "zod";

export const FormProfileSchema = z.object({
  id: z.string().optional(),
  full_name: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  email: z.string().email().nonempty("Tidak boleh kosong"),
  role: z.string().min(3, "Minimal 3 karakter").nonempty("Tidak boleh kosong"),
  created_at: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    }, z.date())
    .optional(),
});

export type TProfile = z.infer<typeof FormProfileSchema>;
