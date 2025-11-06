import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z.email(),
    password: z.string(),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const LoginSearchSchema = z.object({
    redirect: z.string().optional().catch(undefined),
});
