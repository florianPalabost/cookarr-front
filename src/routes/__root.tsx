import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const RootLayout = () => (
    <>
        <div className="min-h-screen flex bg-gray-50 text-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-left"
            />
            <TanStackRouterDevtools position="bottom-right" />
        </div>
    </>
);

export const Route = createRootRoute({ component: RootLayout });
