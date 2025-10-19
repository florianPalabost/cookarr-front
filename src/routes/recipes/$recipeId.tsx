import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/recipes/$recipeId')({
    component: RecipeShow,
});

function RecipeShow() {
    return <div>Hello "/recipes/$recipeId"!</div>;
}
