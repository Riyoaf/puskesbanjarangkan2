import { z } from "zod";

export const FormNewsSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(255, "Maksimal 255 karakter")
    .nonempty("Tidak boleh kosong"),
  content: z
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
  image: z.file().optional(),
  image_url: z.string().optional().nullable(),
});

export type TNews = z.infer<typeof FormNewsSchema>;
