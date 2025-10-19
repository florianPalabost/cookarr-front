import ky from 'ky';
import { httpHooks } from './interceptors';

export const httpClient = ky.create({
    prefixUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    credentials: 'include',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    hooks: httpHooks,
    retry: {
        limit: 2,
        methods: ['get', 'put', 'delete'],
    },
});

export function setAuthToken(token: string | null) {
    httpClient.extend({ headers: { Authorization: `Bearer ${token}` } });
}
