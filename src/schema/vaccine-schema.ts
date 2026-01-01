import { z } from "zod";

export const FormVaccineSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  stock: z.number(),
  description: z
    .string()
    .min(3, "Minimal 3 karakter")
    .nonempty("Tidak boleh kosong"),
  created_at: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    }, z.date())
    .optional(),
});

export type TVaccine = z.infer<typeof FormVaccineSchema>;
