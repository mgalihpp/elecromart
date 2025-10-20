import { z } from "zod";

/**
 * Validation schemas for auth
 */

const email = z.string().email({ message: "Email tidak valid" });

const nameSchema = z
  .string()
  .min(2, { message: "Nama minimal 2 karakter" })
  .max(100, { message: "Nama maksimal 100 karakter" });

const passwordSchema = z
  .string()
  .min(8, { message: "Password minimal 8 karakter" })
  .max(128, { message: "Password maksimal 128 karakter" })
  .regex(/(?=.*[A-Za-z])(?=.*\d)/, {
    message: "Password harus mengandung huruf dan angka",
  });

const phoneSchema = z
  .string()
  .min(6, { message: "Nomor telepon terlalu pendek" })
  .max(20, { message: "Nomor telepon terlalu panjang" })
  .regex(/^[0-9()+\-\s]+$/, {
    message:
      "Nomor telepon hanya boleh berisi angka dan simbol (+ - ( ) spasi)",
  });

export const registerSchema = z.object({
  email,
  nama: nameSchema,
  password: passwordSchema,
  nomorTelepon: phoneSchema,
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, { message: "Password wajib diisi" }),
});

/**
 * Types
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
