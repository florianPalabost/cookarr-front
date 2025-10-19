import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
