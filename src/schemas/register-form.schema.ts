import { z } from 'zod';

export const registerFormSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.email('Invalid email'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: 'Passwords do not match',
        path: ['password_confirmation'],
    });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
