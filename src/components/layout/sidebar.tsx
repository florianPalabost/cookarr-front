import { Link, useRouterState } from '@tanstack/react-router';
import { Book, Home, User, Sandwich } from 'lucide-react';
import { cn } from '@lib/utils';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/recipes', label: 'Recipes', icon: Book },
    { path: '/ingredients', label: 'Ingredients', icon: Sandwich },
];

export function Sidebar() {
    const router = useRouterState();

    return (
        <aside className="hidden md:flex w-64 flex-col bg-white border-r shadow-sm">
            <div className="h-16 flex items-center justify-center font-bold text-xl border-b">
                CookArr
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map(({ path, label, icon: Icon }) => {
                    const isActive = router.location.pathname === path;
                    return (
                        <Link
                            key={path}
                            to={path}
                            className={cn(
                                'flex items-center gap-2 rounded-lg px-3 py-2 transition-colors',
                                isActive
                                    ? 'bg-gray-100 text-primary font-semibold'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            )}
                        >
                            <Icon size={18} />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
