import { z } from "zod";

export const FormActivitySchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  description: z
    .string()
    .min(3, "Minimal 3 karakter")
    .nonempty("Tidak boleh kosong"),
  date: z
    .preprocess((arg) => {
      if (typeof arg === "string" || arg instanceof Date) {
        return new Date(arg);
      }
      return arg;
    }, z.date())
    .optional(),
  location: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  image: z.file().optional(),
  image_url: z.string().optional(),
});

export type TActivity = z.infer<typeof FormActivitySchema>;
