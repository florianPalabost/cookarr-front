import { Link } from '@tanstack/react-router';
import { LogIn, LogOut, Menu, User, User2, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/hooks/use-auth';
import { useAuthStore } from '@/store/auth.store';

export function Header() {
    const { user, isAuthenticated } = useAuthStore();
    const logout = useLogout();

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white/80 backdrop-blur-md px-4 shadow-sm">
            {/* Left: Mobile menu */}
            <div className="flex items-center gap-2 md:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex-1 text-center md:text-left font-semibold text-gray-800">
                Welcome back, {user?.name ?? 'Chef'} 👨‍🍳
            </div>

            {/* Right: Auth dropdown */}
            <div className="flex items-center">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                        >
                            {isAuthenticated ? (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage alt={user?.name ?? 'User'} />
                                    <AvatarFallback>
                                        {user?.name?.[0]?.toUpperCase() ?? 'C'}
                                    </AvatarFallback>
                                </Avatar>
                            ) : (
                                <User className="h-5 w-5" />
                            )}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        {isAuthenticated ? (
                            <>
                                <DropdownMenuLabel className="font-medium">
                                    {user?.name}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2"
                                    >
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => logout}
                                    className="flex items-center gap-2 text-red-600 focus:text-red-700"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </DropdownMenuItem>
                            </>
                        ) : (
                            <>
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/login"
                                        className="flex items-center gap-2"
                                    >
                                        <LogIn className="h-4 w-4" />
                                        Login
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link
                                        to="/register"
                                        className="flex items-center gap-2"
                                    >
                                        <UserPlus className="h-4 w-4" />
                                        Register
                                    </Link>
                                </DropdownMenuItem>
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
