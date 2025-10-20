import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '@/schemas/user.schema';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;

    clearAuth: () => void;
    setAuthenticatedUser: (user: User) => void;
    setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                user: null,
                isAuthenticated: false,

                clearAuth: () => {
                    set({ user: null, isAuthenticated: false });
                },

                setAuthenticatedUser: (user: User) => {
                    set({ user, isAuthenticated: true });
                },

                setUser: (user: User | null) => set({ user }),
            }),
            {
                name: 'auth-storage', // localStorage key
                partialize: (state) => ({
                    user: { name: state.user?.name, email: state.user?.email },
                }), // only persist user without auth (the tokens)
            },
        ),
    ),
);
