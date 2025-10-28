import { motion } from 'framer-motion';
import { Bookmark, Clock, Heart, Star } from 'lucide-react';
import type { Recipe } from '@/schemas/recipe.schema';
import { AspectRatio } from '../ui/aspect-ratio';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

interface RecipeItemProps {
    recipe: Recipe;
    onClick?: (id: number) => void;
    // onFavorite?: (id: number) => void;
}

export function RecipeItem({ recipe, onClick }: RecipeItemProps) {
    return (
        <motion.article
            layout
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            onClick={() => onClick?.(recipe.id)}
        >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-neutral-200 bg-white cursor-pointer py-0">
                {/* Image (placeholder for now) */}
                <AspectRatio ratio={4 / 3}>
                    <img
                        className="object-cover w-full h-full"
                        src={
                            'https://images.unsplash.com/photo-1607013401178-f9c15ab575bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBtZWFsfGVufDF8fHx8MTc2MTI4MDc3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
                        }
                        alt={recipe.title}
                    />
                </AspectRatio>

                <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-neutral-900">{recipe.title}</h3>
                        <Badge
                            variant="secondary"
                            className="shrink-0 text-xs bg-neutral-100 text-neutral-700"
                        >
                            easy
                        </Badge>
                    </div>
                    <p className="text-neutral-600 text-sm line-clamp-2">
                        {recipe.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.prep_time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span>4.7</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.article>
    );
}
