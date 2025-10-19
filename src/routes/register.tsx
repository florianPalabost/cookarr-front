import {
    registerFormSchema,
    RegisterFormSchema,
} from '@/schemas/register-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';

export const Route = createFileRoute('/register')({
    component: RegisterComponent,
});

function RegisterComponent() {
    const form = useForm<RegisterFormSchema>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });
}
