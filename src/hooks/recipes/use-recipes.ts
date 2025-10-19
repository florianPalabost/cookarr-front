import type {
    CreateRecipeInput,
    UpdateRecipeInput,
} from '@schemas/recipe.schema';
import { RecipeApiService } from '@services/api/v1/recipe.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const RECIPE_QUERY_CACHE_KEYS = {
    all: ['recipes'] as const,
    byId: (id: number) => [...RECIPE_QUERY_CACHE_KEYS.all, id] as const,
};

// Get all recipes
export const useRecipes = () => {
    return useQuery({
        queryKey: RECIPE_QUERY_CACHE_KEYS.all,
        queryFn: () => RecipeApiService.getRecipes(),
    });
};

// Get one recipe
export const useRecipe = (id: number) => {
    return useQuery({
        queryKey: RECIPE_QUERY_CACHE_KEYS.byId(id),
        queryFn: () => RecipeApiService.getOne(id),
    });
};

// Create recipe
export const useCreateRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateRecipeInput) => RecipeApiService.create(data),
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: RECIPE_QUERY_CACHE_KEYS.all,
            }),
    });
};

// Update recipe
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

// Delete recipe
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
