import { zodResolver } from '@hookform/resolvers/zod';
import {
    createFileRoute,
    useNavigate,
    useSearch,
} from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginFormSchema } from '@/schemas/login-form.schema';
import { useAuthStore } from '@/store/auth.store';

export const Route = createFileRoute('/login')({
    component: Login,
});

function Login() {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    // const search = useSearch();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function handleSubmit(values: z.infer<typeof loginFormSchema>) {
        const { email, password } = values;
        console.debug('Login values:', email, password);

        await login(email, password);

        navigate({ to: '/' });
    }
    return (
        <div>
            <h1>Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Description of email input
                                </FormDescription>
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
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Description of password input
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </Form>
        </div>
    );
}
