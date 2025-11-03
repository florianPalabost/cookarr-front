import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface IngredientState {
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    // filters: Filters
}

export const useIngredientsStore = create<IngredientState>()(
    devtools(
        persist(
            (set) => ({
                viewMode: 'grid',
                setViewMode: (mode) => set({ viewMode: mode }),
            }),
            {
                name: 'ingredients-storage',
            },
        ),
    ),
);
