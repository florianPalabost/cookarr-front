import { z } from 'zod';

export const linksSchema = z.object({
    first: z.string(),
    last: z.string(),
    prev: z.string().nullable(),
    next: z.string().nullable(),
});

export const metaSchema = z.object({
    current_page: z.number(),
    from: z.number().nullable(),
    last_page: z.number(),
    path: z.string(),
    per_page: z.number(),
    to: z.number().nullable(),
    total: z.number(),
});

export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
    z.object({
        data: dataSchema,
        links: linksSchema.optional(),
        meta: metaSchema.optional(),
    });
