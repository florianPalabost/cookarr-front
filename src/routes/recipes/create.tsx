import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { Loader2, Plus, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateRecipe } from '@/hooks/recipes/use-recipes';
import {
    type CreateRecipeInput,
    createRecipeSchema,
} from '@/schemas/recipe.schema';

export const Route = createFileRoute('/recipes/create')({
    component: RecipeCreate,
});

function RecipeCreate() {
    const form = useForm<CreateRecipeInput>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            title: '',
            description: '',
            instructions: [''],
            ingredients: [''],
            // image: '',
            prep_time: 0,
            cook_time: 0,
            servings: 0,
        },
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control: form.control,
        name: 'ingredients' as never,
    });

    const {
        fields: instructionFields,
        append: appendInstruction,
        remove: removeInstruction,
    } = useFieldArray({
        control: form.control,
        name: 'instructions' as never,
    });

    const ingredientRefs = useRef<Record<string, HTMLInputElement | null>>({});

    const instructionRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { mutateAsync: createRecipe, isPending, error } = useCreateRecipe();

    const onSubmit = async (data: CreateRecipeInput) => {
        await createRecipe(data);
    };

    const handleAddIngredient = (currentIndex: number, value: string) => {
        if (value.trim() !== '') {
            appendIngredient('');
            // Focus next input after React has rendered the new field
            requestAnimationFrame(() => {
                ingredientRefs.current[currentIndex + 1]?.focus();
            });
        }
    };

    const handleAddInstruction = (currentIndex: number, value: string) => {
        if (value.trim() !== '') {
            appendInstruction('');
            // Focus next textarea after React has rendered the new field
            requestAnimationFrame(() => {
                instructionRefs.current[currentIndex + 1]?.focus();
            });
        }
    };
    // TODO: delete if not needed
    // useEffect(() => {
    //     ingredientRefs.current = ingredientRefs.current.slice(
    //         0,
    //         ingredientFields.length,
    //     );
    // }, [ingredientFields.length]);

    // useEffect(() => {
    //     instructionRefs.current = instructionRefs.current.slice(
    //         0,
    //         instructionFields.length,
    //     );
    // }, [instructionFields.length]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    type="text"
                                    required
                                    placeholder="Title"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="w-full"
                                    required
                                    placeholder="Description"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="prep_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prep Time (minutes)</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full"
                                        type="number"
                                        required
                                        placeholder="Prep Time"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cook_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cook Time</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full"
                                        type="number"
                                        required
                                        placeholder="Cook Time"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="servings"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Servings</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    type="number"
                                    required
                                    placeholder="Servings"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-3">
                    <FormLabel>Ingredients</FormLabel>
                    {ingredientFields.map((field, idx) => (
                        <FormField
                            key={field.id}
                            control={form.control}
                            name={`ingredients.${idx}`}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input
                                                className="w-full"
                                                type="text"
                                                required
                                                placeholder="e.g., 2 cups flour"
                                                ref={(el) =>
                                                    (ingredientRefs.current[
                                                        idx
                                                    ] = el)
                                                }
                                                {...field}
                                                onKeyDown={(e) => {
                                                    if (e.key !== 'Enter')
                                                        return;
                                                    e.preventDefault();
                                                    handleAddIngredient(
                                                        idx,
                                                        formField.value,
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        {ingredientFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    removeIngredient(idx)
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendIngredient('')}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Ingredient
                    </Button>
                </div>

                {/* Instructions */}
                <div className="space-y-3">
                    <FormLabel>Instructions</FormLabel>
                    {instructionFields.map((field, idx) => (
                        <FormField
                            key={field.id}
                            control={form.control}
                            name={`instructions.${idx}`}
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex gap-2">
                                        <span className="flex-shrink-0 w-6 h-10 flex items-center justify-center text-sm font-medium text-muted-foreground">
                                            {idx + 1}.
                                        </span>
                                        <FormControl>
                                            <Textarea
                                                ref={(el) =>
                                                    (instructionRefs.current[
                                                        idx
                                                    ] = el)
                                                }
                                                placeholder="Describe this step"
                                                className="resize-none"
                                                rows={2}
                                                {...field}
                                            />
                                        </FormControl>
                                        {instructionFields.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() =>
                                                    removeInstruction(idx)
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendInstruction('')}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Step
                    </Button>
                </div>

                <Button
                    type="submit"
                    disabled={!form.formState.isValid || isPending}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Creating recipe...</span>
                        </>
                    ) : (
                        <>
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Create Recipe</span>
                        </>
                    )}
                </Button>
            </form>
        </Form>
    );
}
