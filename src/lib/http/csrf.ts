import { httpClient } from '.';
import { API_ENDPOINTS } from './endpoints';

export async function ensureCsrfCookie() {
    // TODO: if not a write request then we can early return ?

    try {
        await httpClient.get(API_ENDPOINTS.AUTH.CSRF);
    } catch (err) {
        console.error('[CSRF] Failed to obtain CSRF cookie', err);
        throw err;
    }
}
