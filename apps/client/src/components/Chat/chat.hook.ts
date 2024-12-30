import axios from '../../utils/axios.utils.ts'
import {Message} from "../../models/message.model.ts";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {useChatWebSocket} from "./chat-ws.hook.ts";
import {useQuery} from '@tanstack/react-query'
import {messagesEndpoint} from "../../constants/endpoint.constant.ts";
import {SERVER_WS} from "../../constants/config.constant.ts";

const fetchMessages = async (): Promise<Message[]> => {
    const {data} = await axios.get<Message[]>(messagesEndpoint);

    return data;
}

export const useChat = () => {
    const auth = useAuth();
    const myUsername = auth?.user?.username ?? "";

    const queryMessages = useQuery<Message[]>({queryKey: ['messages'], queryFn: fetchMessages, enabled: true})
    const messages = queryMessages.data

    useChatWebSocket(SERVER_WS)

    return {messages, myUsername}
}