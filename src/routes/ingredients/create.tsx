import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { AlertCircle, Loader2, Plus, X } from 'lucide-react';
import { useCallback, useRef } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
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
import { Alert, AlertDescription } from '@/components/ui/alert';

export const Route = createFileRoute('/ingredients/create')({
    component: RecipeCreate,
});

function RecipeCreate() {
    const form = useForm<CreateRecipeInput>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            title: '',
            description: '',
            image: '',
            instructions: [''],
            ingredients: [''],
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
        name: 'ingredients' as never, // TODO: find why this is needed
    });

    const {
        fields: instructionFields,
        append: appendInstruction,
        remove: removeInstruction,
    } = useFieldArray({
        control: form.control,
        name: 'instructions' as never, // TODO: find why this is needed
    });

    const ingredientRefs = useRef<Record<string, HTMLInputElement | null>>({});
    const instructionRefs = useRef<Record<string, HTMLTextAreaElement | null>>(
        {},
    );

    const { mutateAsync: createRecipe, isPending, error } = useCreateRecipe();

    const onSubmit = async (data: CreateRecipeInput) => {
        await createRecipe(data);
    };

    const handleAddIngredient = useCallback(
        (fieldId: string, value: string) => {
            if (value.trim() !== '') {
                appendIngredient('');
                requestAnimationFrame(() => {
                    const newIndex = ingredientFields.length;
                    const newFieldId = ingredientFields[newIndex]?.id;
                    if (newFieldId) {
                        ingredientRefs.current[newFieldId]?.focus();
                    }
                });
            }
        },
        [appendIngredient, ingredientFields],
    );

    const handleAddInstruction = useCallback(
        (fieldId: string, value: string) => {
            if (value.trim() !== '') {
                appendInstruction('');
                requestAnimationFrame(() => {
                    const newIndex = instructionFields.length;
                    const newFieldId = instructionFields[newIndex]?.id;
                    if (newFieldId) {
                        instructionRefs.current[newFieldId]?.focus();
                    }
                });
            }
        },
        [appendInstruction, instructionFields],
    );

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
                                        placeholder="Prep Time"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseInt(e.target.value, 10) ||
                                                    0,
                                            )
                                        }
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
                                <FormLabel>Cook Time (minutes)</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full"
                                        type="number"
                                        placeholder="Cook Time"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
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
                                    placeholder="Servings"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseInt(e.target.value, 10) || 0,
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Image URL */}
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    className="w-full"
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    {...field}
                                    value={field.value ?? ''}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter a valid image URL
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Ingredients */}
                <div className="space-y-3">
                    <FormLabel>Ingredients</FormLabel>
                    {ingredientFields.map((field, idx) => (
                        <FormField
                            key={field.id}
                            control={form.control}
                            name={`ingredients.${idx}`}
                            render={({ field: formField }) => {
                                const { ref: rhfRef, ...restField } = formField;
                                return (
                                    <FormItem>
                                        <div className="flex gap-2">
                                            <FormControl>
                                                <Input
                                                    className="w-full"
                                                    type="text"
                                                    placeholder="e.g., 2 cups flour"
                                                    {...restField}
                                                    ref={(el) => {
                                                        rhfRef(el);
                                                        ingredientRefs.current[
                                                            field.id
                                                        ] = el;
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddIngredient(
                                                                field.id,
                                                                formField.value,
                                                            );
                                                        }
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
                                );
                            }}
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
                    <FormDescription>
                        Press Ctrl+Enter to add a new step
                    </FormDescription>
                    {instructionFields.map((field, idx) => (
                        <FormField
                            key={field.id}
                            control={form.control}
                            name={`instructions.${idx}`}
                            render={({ field: formField }) => {
                                const { ref: rhfRef, ...restField } = formField;
                                return (
                                    <FormItem>
                                        <div className="flex gap-2">
                                            <span className="flex-shrink-0 w-6 h-10 flex items-center justify-center text-sm font-medium text-muted-foreground">
                                                {idx + 1}.
                                            </span>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe this step"
                                                    className="resize-none"
                                                    rows={2}
                                                    {...restField}
                                                    ref={(el) => {
                                                        rhfRef(el);
                                                        instructionRefs.current[
                                                            field.id
                                                        ] = el;
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key === 'Enter' &&
                                                            e.ctrlKey
                                                        ) {
                                                            e.preventDefault();
                                                            handleAddInstruction(
                                                                field.id,
                                                                formField.value,
                                                            );
                                                        }
                                                    }}
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
                                );
                            }}
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
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {error instanceof Error
                                ? error.message
                                : 'Failed to create recipe'}
                        </AlertDescription>
                    </Alert>
                )}
            </form>
        </Form>
    );
}
