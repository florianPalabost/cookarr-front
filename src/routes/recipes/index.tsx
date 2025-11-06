import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { RecipeList } from '@/components/recipes/recipe-list';
import { Button } from '@/components/ui/button';
import { RECIPE_QUERY_CACHE_KEYS } from '@/hooks/recipes/use-recipes';
import { queryClient } from '@/lib/queryClient';
import { RecipeApiService } from '@/services/api/v1/recipe.service';

export const Route = createFileRoute('/recipes/')({
    beforeLoad: async ({ context, location }) => {
        if (context.auth.isAuthenticated) return;

        throw redirect({
            to: '/login',
            search: { redirect: location.href },
        });
    },
    component: RecipesIndex,
    loader: async () => {
        // TODO: Is it useful if not used with Route.useLoaderData() ?
        await queryClient.ensureQueryData({
            queryKey: RECIPE_QUERY_CACHE_KEYS.all,
            queryFn: RecipeApiService.getRecipes,
        });
    },

    pendingComponent: () => <div>Loading heavy recipes ...</div>,
});

function RecipesIndex() {
    return (
        <main className="max-w-7xl mx-auto py-8 px-4">
            <header className="flex items-center justify-between mb-6">
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
