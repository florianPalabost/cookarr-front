import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface RecipesState {
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    // filters: Filters
}

export const useRecipesStore = create<RecipesState>()(
    devtools(
        persist(
            (set) => ({
                viewMode: 'grid',
                setViewMode: (mode) => set({ viewMode: mode }),
            }),
            {
                name: 'recipes-storage',
            },
        ),
    ),
);
