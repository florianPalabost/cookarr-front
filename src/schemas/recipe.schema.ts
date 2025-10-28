import { z } from 'zod';

export const recipeSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    user_id: z.number(),
    title: z.string().min(1),
    description: z.string().optional(),
    ingredients: z
        .array(z.string().min(1, 'Ingredient cannot be empty'))
        .min(1, 'At least one ingredient required'),
    instructions: z
        .array(z.string().min(1, 'Instruction cannot be empty'))
        .min(1, 'At least one instruction required'),
    image: z.string().nullable(),
    // is_public: z.boolean(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    prep_time: z.number().optional(),
    cook_time: z.number().optional(),
    servings: z.number().optional(),
});

export const recipeSchemaArray = z.array(recipeSchema);

export const createRecipeSchema = recipeSchema.omit({
    id: true,
    uuid: true,
    user_id: true,
    created_at: true,
    updated_at: true,
});

export type Recipe = z.infer<typeof recipeSchema>;
export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;
export type UpdateRecipeInput = Partial<CreateRecipeInput>;
