import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/ingredients/$ingrdientId')({
    component: RecipeShow,
});

function RecipeShow() {
    return <div>Hello "/recipes/$recipeId"!</div>;
}
