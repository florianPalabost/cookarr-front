import { zodResolver } from '@hookform/resolvers/zod';
import {
    createFileRoute,
    Link,
    useNavigate,
    useSearch,
} from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/hooks/use-auth';
import {
    type LoginFormSchema,
    loginFormSchema,
} from '@/schemas/login-form.schema';

export const Route = createFileRoute('/login')({
    component: Login,
});

function Login() {
    const { mutateAsync: login, isPending, error } = useLogin();

    // const navigate = useNavigate();
    // const search = useSearch();

    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: LoginFormSchema) {
        console.debug('Login values:', data);

        await login(data);
    }

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
                        Sign in
                    </h2>
                </div>
                <Form {...form}>
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        {error && (
                            <div className="rounded-md bg-red-50 p-4">
                                <p className="text-sm text-red-800">
                                    {error instanceof Error
                                        ? error.message
                                        : 'An error occurred'}
                                </p>
                            </div>
                        )}

                        <div className="rounded-md space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                disabled={isPending}
                                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                                                type="email"
                                                placeholder="Email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm disabled:opacity-50"
                                                required
                                                disabled={isPending}
                                                type="password"
                                                placeholder="Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </div>

                        <div className="text-center">
                            <Link
                                to="/register"
                                className="font-medium text-600 hover:text-500"
                            >
                                Don't have an account ? Register
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
