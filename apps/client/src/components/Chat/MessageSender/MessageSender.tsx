import {FC} from "react";
import {useMessageSender} from "./message-sender.hook.ts";



interface MessageSenderProps {
    username: string
}

const MessageSender: FC<MessageSenderProps> = (props) => {
    const {handleSubmit, onSubmit, register} = useMessageSender(props)

    return (
        <div className="px-3 py-2 border-t border-zinc-700">
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <input
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-lg bg-gray-700 text-white border-gray-600 text-sm"
                    {...register('message')}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
                    id="sendButton"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default MessageSender