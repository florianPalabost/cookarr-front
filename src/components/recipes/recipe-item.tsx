import type { Recipe } from '@schemas/recipe.schema';
import { motion } from 'framer-motion';
import { Bookmark, Clock, Heart } from 'lucide-react';

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
            className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden border border-gray-100"
            onClick={() => onClick?.(recipe.id)}
        >
            {/* Image (placeholder for now) */}
            <div className="h-40 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center text-gray-400 text-sm">
                {recipe.title.charAt(0).toUpperCase()}
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {recipe.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {recipe.description || 'No description provided.'}
                </p>

                <div className="flex items-center justify-between pt-2 text-gray-500 text-xs">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>
                            Updated{' '}
                            {new Date(
                                recipe.updated_at || '',
                            ).toLocaleDateString()}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            // onFavorite?.(recipe.id!);
                        }}
                        className="p-1 hover:text-red-500 transition-colors"
                    >
                        <Heart size={16} className="stroke-2" />
                    </button>
                </div>
            </div>

            {/* Bookmark Icon (floating) */}
            <Bookmark
                className="absolute top-3 right-3 text-gray-400 hover:text-orange-500 transition-colors"
                size={18}
            />
        </motion.article>
    );
}
