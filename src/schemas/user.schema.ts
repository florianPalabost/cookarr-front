import { z } from 'zod';

export const userSchema = z.object({
    // id: z.number(),
    name: z.string(),
    email: z.string(),
    auth: z
        .object({
            access_token: z.string(),
            access_token_expires_at: z.string(),
            refresh_token: z.string(),
            refresh_token_expires_at: z.string(),
            token_type: z.string(),
        })
        .optional(),
    // email_verified_at: z.string().nullable(),
    // created_at: z.string(),
    // updated_at: z.string(),
});

export type User = z.infer<typeof userSchema>;
