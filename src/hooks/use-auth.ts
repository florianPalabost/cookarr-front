import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { queryClient } from '@/lib/queryClient';
import type { LoginFormSchema } from '@/schemas/login-form.schema';
import type { RegisterFormSchema } from '@/schemas/register-form.schema';
import { AuthService } from '@/services/api/v1/auth.service';
import { useAuthStore } from '@/store/auth.store';

export const AUTH_QUERY_CACHE_KEYS = {
    currentUser: ['auth', 'current-user'] as const,
} as const;

export function useCurrentUser() {
    const setAuthenticatedUser = useAuthStore(
        (state) => state.setAuthenticatedUser,
    );

    const clearAuth = useAuthStore((state) => state.clearAuth);

    return useQuery({
        queryKey: AUTH_QUERY_CACHE_KEYS.currentUser,
        queryFn: async () => {
            try {
                const user = await AuthService.getCurrentUser();
                setAuthenticatedUser(user);
                return user;
            } catch (error) {
                clearAuth();
                throw error;
            }
        },
        retry: false,
    });
}

export function useLogin() {
    const setAuthenticatedUser = useAuthStore(
        (state) => state.setAuthenticatedUser,
    );
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: LoginFormSchema) =>
            await AuthService.login(credentials),
        onSuccess: (data) => {
            setAuthenticatedUser(data);
            queryClient.invalidateQueries({
                queryKey: AUTH_QUERY_CACHE_KEYS.currentUser,
            });
            navigate({ to: '/' });
        },
    });
}

export function useRegister() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: RegisterFormSchema) =>
            await AuthService.register(credentials),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: AUTH_QUERY_CACHE_KEYS.currentUser,
            });
            navigate({ to: '/' });
        },
    });
}
