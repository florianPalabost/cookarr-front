import { httpClient } from '@/lib/http';
import { API_ENDPOINTS } from '@/lib/http/endpoints';
import { apiResponseSchema } from '@/schemas/api.schema';
import {
    type Ingredient,
    ingredientSchema,
    ingredientSchemaArray,
} from '@/schemas/ingredient.schema';

export const IngredientApiService = {
    async getIngredients(): Promise<Ingredient[]> {
        const response = await httpClient
            .get(API_ENDPOINTS.INGREDIENTS.INDEX)
            .json();

        const parsed = apiResponseSchema(ingredientSchemaArray).safeParse(
            response,
        );

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async getOne(id: number): Promise<Ingredient> {
        const response = await httpClient
            .get(API_ENDPOINTS.INGREDIENTS.SHOW.replace(':id', id.toString()))
            .json();

        const parsed = apiResponseSchema(ingredientSchema).safeParse(response);

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async create(ingredient): Promise<Ingredient> {
        const response = await httpClient.post(
            API_ENDPOINTS.INGREDIENTS.CREATE,
            {
                json: ingredient,
            },
        );

        const parsed = apiResponseSchema(ingredientSchema).safeParse(response);

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async update(id: number, ingredient): Promise<Ingredient> {
        const response = await httpClient.put(
            API_ENDPOINTS.INGREDIENTS.UPDATE.replace(':id', id.toString()),
            {
                json: ingredient,
            },
        );

        const parsed = apiResponseSchema(ingredientSchema).safeParse(response);

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async delete(id: number): Promise<void> {
        await httpClient.delete(
            API_ENDPOINTS.INGREDIENTS.DELETE.replace(':id', id.toString()),
        );
    },
};
