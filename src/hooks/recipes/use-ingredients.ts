import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
    CreateRecipeInput,
    Recipe,
    UpdateRecipeInput,
} from '@/schemas/recipe.schema';

import { IngredientApiService } from '@/services/api/v1/ingredient.service';

export const INGREDIENT_QUERY_CACHE_KEYS = {
    all: ['ingredients'] as const,
    byId: (id: number) => [...INGREDIENT_QUERY_CACHE_KEYS.all, id] as const,
};

export const useIngredients = () => {
    return useQuery({
        queryKey: INGREDIENT_QUERY_CACHE_KEYS.all,
        queryFn: () => IngredientApiService.getIngredients(),
        retry: true,
    });
};

// Get one recipe
export const useIngredient = (id: number) => {
    return useQuery({
        queryKey: INGREDIENT_QUERY_CACHE_KEYS.byId(id),
        queryFn: () => IngredientApiService.getOne(id),
    });
};

export const useCreateIngredient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => IngredientApiService.create(data),
        // onMutate: async (newRecipe) => {
        //     await queryClient.cancelQueries({
        //         queryKey: RECIPE_QUERY_CACHE_KEYS.all,
        //     });

        //     // Snapshot previous value
        //     const recipesResponseSchema = apiResponseSchema(recipeSchemaArray);

        //     const previousRecipes = queryClient.getQueryData<
        //         typeof recipesResponseSchema
        //     >(RECIPE_QUERY_CACHE_KEYS.all);

        //     // Optimistically update to the new value
        //     queryClient.setQueryData<typeof recipesResponseSchema>(
        //         RECIPE_QUERY_CACHE_KEYS.all,
        //         (old) => {
        //             if (!old) return old;

        //             const optimisticRecipe: Recipe = {
        //                 ...newRecipe,
        //                 id: 999999999 + Math.floor(Math.random() * 1000000000),
        //                 user_id: 1,
        //             };

        //             return {
        //                 data: [...old.data, optimisticRecipe],
        //                 total: old.total + 1,
        //             };
        //         },
        //     );

        //     return { previousRecipes };
        // },
        onError: (err, vars, context) => {
            // if (context?.previous) {
            //     queryClient.setQueryData(
            //         RECIPE_QUERY_CACHE_KEYS.all,
            //         context.previous,
            //     );
            // }
        },
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: INGREDIENT_QUERY_CACHE_KEYS.all,
            }),
    });
};

export const useUpdateIngredient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }: { id: number } & UpdateRecipeInput) =>
            IngredientApiService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({
                queryKey: INGREDIENT_QUERY_CACHE_KEYS.byId(id),
            });
            queryClient.invalidateQueries({
                queryKey: INGREDIENT_QUERY_CACHE_KEYS.all,
            });
        },
    });
};

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => RecipeApiService.delete(id),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: INGREDIENT_QUERY_CACHE_KEYS.all,
            }),
    });
};
