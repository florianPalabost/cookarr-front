// import { useAuthStore } from '@/store/auth.store';
// import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

// export const Route = createFileRoute('/_authenticated')({
//     beforeLoad: async ({ location }) => {
//         const { user } = useAuthStore.getState();
//         console.debug('[Router] Is authenticated ?', user?.auth?.access_token);

//         if (!user || !user.auth?.access_token) {
//             throw redirect({
//                 to: '/login',
//                 search: { redirect: location.href },
//             });
//         }
//     },
//     component: () => <Outlet />,
// });
