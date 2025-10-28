import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type {
    CreateRecipeInput,
    Recipe,
    UpdateRecipeInput,
} from '@/schemas/recipe.schema';
import { RecipeApiService } from '@/services/api/v1/recipe.service';

export const RECIPE_QUERY_CACHE_KEYS = {
    all: ['recipes'] as const,
    byId: (id: number) => [...RECIPE_QUERY_CACHE_KEYS.all, id] as const,
};

// Get all recipes
export const useRecipes = () => {
    return useQuery({
        queryKey: RECIPE_QUERY_CACHE_KEYS.all,
        queryFn: () => RecipeApiService.getRecipes(),
        retry: true,
    });
};

// Get one recipe
export const useRecipe = (id: number) => {
    return useQuery({
        queryKey: RECIPE_QUERY_CACHE_KEYS.byId(id),
        queryFn: () => RecipeApiService.getOne(id),
    });
};

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateRecipeInput) => RecipeApiService.create(data),
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
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: RECIPE_QUERY_CACHE_KEYS.all,
            }),
    });
};

export const useUpdateRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...data }: { id: number } & UpdateRecipeInput) =>
            RecipeApiService.update(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({
                queryKey: RECIPE_QUERY_CACHE_KEYS.byId(id),
            });
            queryClient.invalidateQueries({
                queryKey: RECIPE_QUERY_CACHE_KEYS.all,
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
                queryKey: RECIPE_QUERY_CACHE_KEYS.all,
            }),
    });
};
