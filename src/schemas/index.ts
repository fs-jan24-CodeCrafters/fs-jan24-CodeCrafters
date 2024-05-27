import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const RegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
