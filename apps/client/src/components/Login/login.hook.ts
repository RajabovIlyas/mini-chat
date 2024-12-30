import {z} from 'zod';
import {useRouter} from '@tanstack/react-router'
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useAuth} from "../../contexts/AuthContext.tsx";

const schema = z.object({
    username: z.string().min(1, {message: "Username is required"}),
});

type FormData = z.infer<typeof schema>;

export const useLoginForm = () => {
    const auth = useAuth();
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FormData>({
        resolver: zodResolver(schema), // Подключение Zod для валидации
    });

    const onSubmit = (data: FormData) => {
        auth?.login(data)
        router.navigate({to: '/chat'});
    };
    return {register, handleSubmit, errors, onSubmit}
}