import {z} from "zod";

/**
 * Esquema de validación para el registro de usuarios.
 * Valida:
 * - username: string requerido
 * - email: string con formato de email válido
 * - password: string con mínimo 6 caracteres
 */
export const registerSchema = z.object({
  // Nombre de usuario debe ser un string y es obligatorio
  username: z
  .string({ required_error: "username is required" })
  .min(5, {message: "Username must be at least 5 characters"}),

  // Email debe ser un string válido y tener formato de email
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),

  // Password debe ser un string con al menos 6 caracteres
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

/**
 * Esquema de validación para el inicio de sesión.
 * Valida:
 * - email: string con formato de email válido
 * - password: string con mínimo 6 caracteres
 * 
 * Similar a registerSchema pero sin el campo username
 */
export const loginSchema = z.object({
  // Email debe ser un string válido y tener formato de email
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),

  // Password debe ser un string con al menos 6 caracteres
  password: z
    .string({ required_error: "password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});