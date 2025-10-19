import { RecipeList } from '@/components/recipes/recipe-list';
import { Button } from '@/components/ui/button';
import { RECIPE_QUERY_CACHE_KEYS } from '@/hooks/recipes/use-recipes';
import { queryClient } from '@/lib/queryClient';
import { RecipeApiService } from '@/services/api/v1/recipe.service';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';

export const Route = createFileRoute('/recipes/')({
    component: RecipesIndex,
    loader: async () => {
        await queryClient.ensureQueryData({
            queryKey: RECIPE_QUERY_CACHE_KEYS.all,
            queryFn: RecipeApiService.getRecipes,
        });
    },
});

function RecipesIndex() {
    return (
        <main className="max-w-7xl mx-auto py-8 px-4">
            <header className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Recipes</h1>
                <Button>
                    <Link to="/recipes/create" className="flex items-center">
                        <Plus /> Add Recipe
                    </Link>
                </Button>
            </header>
            <RecipeList />
        </main>
    );
}
