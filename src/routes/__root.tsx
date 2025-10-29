import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

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
            <TanStackDevtools
                plugins={[
                    {
                        name: 'TanStack Query',
                        render: <ReactQueryDevtoolsPanel />,
                    },
                    {
                        name: 'TanStack Router',
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            />
        </div>
    </>
);

export const Route = createRootRoute({ component: RootLayout });
