import ky, { type Hooks, HTTPError } from 'ky';
import { useAuthStore } from '@/store/auth.store';

// TODO: move to lib or utils ?
function getCookie(name: string) {
    // https://github.com/sindresorhus/ky/issues/423 if does not work
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const httpHooks: Hooks = {
    beforeRequest: [
        (request) => {
            // Will be called before the request is sent
            console.debug('[HTTP] → ', request.method, request.url);

            const csrfToken = getCookie('XSRF-TOKEN');

            if (csrfToken) {
                request.headers.set(
                    'X-XSRF-TOKEN',
                    decodeURIComponent(csrfToken),
                );
            }

            const accessToken =
                useAuthStore.getState().user?.auth?.access_token;

            if (accessToken) {
                request.headers.set('Authorization', `Bearer ${accessToken}`);
            }
        },
    ],
    afterResponse: [
        async (request, options, response) => {
            // Will be called after the response is received
            console.debug('[HTTP] ← ', response.status, request.url);

            // handle auth errors
            if (response.status === 401) {
                console.debug('[HTTP] 401 received, trying to refresh token');

                window.location.href = '/login';
                return;
                // try with refresh token flow
                // await useAuthStore.getState().refreshToken();

                // const newAccessToken =
                //     useAuthStore.getState().user?.auth?.access_token;

                // if (!newAccessToken) {
                //     console.debug(
                //         '[HTTP] No access token found, redirecting to login',
                //     );
                //     window.location.href = '/login';
                //     // throw new Error('not authenticated');
                //     return;
                // }

                // request.headers.set(
                //     'Authorization',
                //     `Bearer ${newAccessToken}`,
                // );

                // response = await ky(request, options);

                // return response;
            }

            // handle errors
            if (!response.ok) {
                const error = await response.json();
                console.error(error);

                throw error;
            }
        },
    ],
};
