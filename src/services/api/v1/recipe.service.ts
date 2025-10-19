import { httpClient } from '@/lib/http';
import { API_ENDPOINTS } from '@/lib/http/endpoints';
import { apiResponseSchema } from '@/schemas/api.schema';
import {
    type CreateRecipeInput,
    type Recipe,
    recipeSchema,
    recipeSchemaArray,
    type UpdateRecipeInput,
} from '@/schemas/recipe.schema';

export const RecipeApiService = {
    async getRecipes(): Promise<Recipe[]> {
        const response = await httpClient
            .get(API_ENDPOINTS.RECIPES.INDEX)
            .json();

        const parsed = apiResponseSchema(recipeSchemaArray).safeParse(response);

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async getOne(id: number): Promise<Recipe> {
        const response = await httpClient
            .get(API_ENDPOINTS.RECIPES.SHOW.replace(':id', id.toString()))
            .json();

        const parsed = apiResponseSchema(recipeSchema).safeParse(response);

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async create(recipe: CreateRecipeInput): Promise<Recipe> {
        const response = await httpClient.post(API_ENDPOINTS.RECIPES.CREATE, {
            json: recipe,
        });

        const parsed = apiResponseSchema(recipeSchema).safeParse(response);

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async update(id: number, recipe: UpdateRecipeInput): Promise<Recipe> {
        const response = await httpClient.put(
            API_ENDPOINTS.RECIPES.UPDATE.replace(':id', id.toString()),
            {
                json: recipe,
            },
        );

        const parsed = apiResponseSchema(recipeSchema).safeParse(response);

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async delete(id: number): Promise<void> {
        await httpClient.delete(
            API_ENDPOINTS.RECIPES.DELETE.replace(':id', id.toString()),
        );
    },
};
