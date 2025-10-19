import z from 'zod';
import { INGREDIENT_CATEGORY, INGREDIENT_UNIT } from '@/enums/ingredient';

export const ingredientSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    category: z.enum(INGREDIENT_CATEGORY),
    default_unit: z.enum(INGREDIENT_UNIT).optional(),
});
