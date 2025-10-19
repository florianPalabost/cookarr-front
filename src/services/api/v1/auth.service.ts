import type { LoginFormSchema } from '@/schemas/login-form.schema';
import type { RegisterFormSchema } from '@/schemas/register-form.schema';
import { httpClient } from '../../../lib/http';
import { ensureCsrfCookie } from '../../../lib/http/csrf';
import { API_ENDPOINTS } from '../../../lib/http/endpoints';
import { apiResponseSchema } from '../../../schemas/api.schema';
import { userSchema } from '../../../schemas/user.schema';

export const AuthService = {
    async login(credentials: LoginFormSchema) {
        await ensureCsrfCookie();

        const response = await httpClient
            .post(API_ENDPOINTS.AUTH.LOGIN, {
                json: credentials,
            })
            .json();

        // safeParse to not throw errors (handled manually)
        const parsed = apiResponseSchema(userSchema).safeParse(response);

        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data.data;
    },

    async logout() {
        await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    },

    async getCurrentUser() {
        const response = await httpClient.get(API_ENDPOINTS.AUTH.USER).json();
        return apiResponseSchema(userSchema).parse(response).data;
    },

    async refreshToken() {
        const response = await httpClient
            .post(API_ENDPOINTS.AUTH.REFRESH_TOKEN)
            .json();
        return apiResponseSchema(userSchema).parse(response).data;
    },

    async register(credentials: RegisterFormSchema) {
        await ensureCsrfCookie();
        const response = await httpClient
            .post(API_ENDPOINTS.AUTH.REGISTER, {
                json: credentials,
            })
            .json();

        return apiResponseSchema(userSchema).parse(response).data;
    },
};
