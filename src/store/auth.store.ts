import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '@/schemas/user.schema';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;

    clearAuth: () => void;
    setAuthenticatedUser: (user: User) => void;
    setUser: (user: User) => void;
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                isAuthenticated: false,

                clearAuth: () => {
                    set({ user: null, isAuthenticated: false });
                },

                setAuthenticatedUser: (user: User) => {
                    set({ user, isAuthenticated: true });
                },

                setUser: (user: User | null) => set({ user }),

                getAccessToken: () => {
                    return get().user?.auth?.access_token ?? null;
                },
                
                getRefreshToken: () => {
                    return get().user?.auth?.refresh_token ?? null;
                },
            }),
            {
                name: 'auth-storage', // localStorage key
                partialize: (state) => ({
                    user: { name: state.user?.name, email: state.user?.email,auth: {refresh_token: state.user?.auth?.refresh_token} },
                }), // only persist user without auth (the tokens)
            },
        ),
    ),
);
