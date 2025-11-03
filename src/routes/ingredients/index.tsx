import { createFileRoute, Link } from '@tanstack/react-router';
import { Plus } from 'lucide-react';
import { RecipeList } from '@/components/recipes/recipe-list';
import { Button } from '@/components/ui/button';
import { RECIPE_QUERY_CACHE_KEYS } from '@/hooks/recipes/use-recipes';
import { queryClient } from '@/lib/queryClient';
import { RecipeApiService } from '@/services/api/v1/recipe.service';
import { INGREDIENT_QUERY_CACHE_KEYS } from '@/hooks/recipes/use-ingredients';
import { IngredientApiService } from '@/services/api/v1/ingredient.service';
import { IngredientList } from '@/components/ingredients/ingredient-list';

export const Route = createFileRoute('/ingredients/')({
    component: IngredientsIndex,
    loader: async () => {
        await queryClient.ensureQueryData({
            queryKey: INGREDIENT_QUERY_CACHE_KEYS.all,
            queryFn: IngredientApiService.getIngredients,
        });
    },
});

function IngredientsIndex() {
    return (
        <main className="max-w-7xl mx-auto py-8 px-4">
            <header className="flex items-center justify-between mb-6">
                <Button>
                    <Link
                        to="/ingredients/create"
                        className="flex items-center"
                    >
                        <Plus /> Add Ingredient
                    </Link>
                </Button>
            </header>
            <IngredientList />
        </main>
    );
}
