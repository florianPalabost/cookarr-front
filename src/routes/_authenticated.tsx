import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ context, location }) => {
        const isUserAuthenticated = context.auth.isAuthenticated;

        console.debug('[Router] Is authenticated ?', isUserAuthenticated);

        if (!isUserAuthenticated) {
            throw redirect({
                to: '/login',
                search: { redirect: location.href },
            });
        }
    },
    component: () => <Outlet />,
});
