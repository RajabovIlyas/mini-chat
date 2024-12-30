import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import axios from '../../../utils/axios.utils.ts'
import {messagesEndpoint} from "../../../constants/endpoint.constant.ts";

const schema = z.object({
    message: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

interface MessageSenderProps {
    username: string;
}

export const useMessageSender = ({username}:MessageSenderProps) => {
    const {
        register,
        handleSubmit,
      reset,
    } = useForm<FormData>({
        resolver: zodResolver(schema), // Подключение Zod для валидации
    });

    const onSubmit = async (data: FormData) => {
        await axios.post(messagesEndpoint, {...data, sender: username})
        reset();
    };

    return {register, handleSubmit, onSubmit};
}