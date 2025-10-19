import { useRecipes } from '@hooks/recipes/use-recipes';
import { AnimatePresence, motion } from 'framer-motion';
import { RecipeItem } from './recipe-item';
import { useRecipesStore } from '@store/recipes.store';
import { AlertCircle, Loader2 } from 'lucide-react';

export function RecipeList() {
    const { data: recipes, isLoading, error } = useRecipes();

    const viewMode = useRecipesStore((state) => state.viewMode);
    const setViewMode = useRecipesStore((state) => state.setViewMode);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="mt-4 text-gray-600">Loading recipes...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <AlertCircle className="w-12 h-12 text-red-600" />
                <p className="mt-4 text-gray-900 font-semibold">
                    Failed to load recipes
                </p>
                <p className="text-gray-600">
                    {error instanceof Error ? error.message : 'Unknown error'}
                </p>
            </div>
        );
    }

    return (
        <motion.section
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
            <AnimatePresence>
                {recipes?.map((recipe) => (
                    <RecipeItem
                        key={recipe.id}
                        recipe={recipe}
                        onClick={(id) => console.log('clicked', id)}
                    />
                ))}
            </AnimatePresence>
        </motion.section>
    );
}
