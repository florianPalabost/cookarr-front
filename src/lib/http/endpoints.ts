const apiBasePath = `api/${import.meta.env.VITE_API_VERSION}`;

export const API_ENDPOINTS = {
    AUTH: {
        CSRF: 'sanctum/csrf-cookie',
        LOGIN: `${apiBasePath}/auth/login`,
        LOGOUT: `${apiBasePath}/auth/logout`,
        REFRESH_TOKEN: `${apiBasePath}/auth/refresh`,
        REGISTER: `${apiBasePath}/auth/register`,
        USER: `${apiBasePath}/auth/user`,
    },
    RECIPES: {
        INDEX: `${apiBasePath}/recipes`,
        SHOW: `${apiBasePath}/recipes/:id`,
        CREATE: `${apiBasePath}/recipes`,
        UPDATE: `${apiBasePath}/recipes/:id`,
        DELETE: `${apiBasePath}/recipes/:id`,
    },
} as const;
