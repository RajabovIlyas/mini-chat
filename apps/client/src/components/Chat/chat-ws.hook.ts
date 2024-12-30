import {useEffect, useRef} from 'react'
import {useQueryClient} from "@tanstack/react-query"

interface Message {
    message: string;
    sender: string;
    createdAt: Date;
}


export const useChatWebSocket = (url: string) => {
    const queryClient = useQueryClient()
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        socketRef.current = new WebSocket(url);

        socketRef.current.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            queryClient.setQueryData(['messages'], (oldMessages: Message[]) => [...oldMessages, data]);
        }

        return () => {
            if(!socketRef.current) {
                return;
            }
            socketRef.current.close()
        }
    }, [url])
    return socketRef.current
}