import MessageSender from "./MessageSender/MessageSender.tsx";
import Message from "./Message/Message.tsx"
import {useChat} from "./chat.hook.ts";


const Chat = () => {
    const {messages, myUsername} = useChat()

    return (
        <div className="min-h-screen p-6">
            <div
                className="max-w-md mx-auto bg-gray-800 shadow-md rounded-lg overflow-hidden"
            >
                <div className="h-[93vh] flex flex-col h-full">
                    <div className="px-4 py-3 border-b border-zinc-700">
                        <h2 className="text-lg font-semibold text-white">
                            Chat
                        </h2>
                    </div>
                    <div
                        className="scroll-smooth snap-end to snap-y overflow-y-auto schema-dark"
                    >
                        <div className="flex-1 p-3 flex flex-col space-y-2 justify-end">
                            {Array.isArray(messages) && messages.map((message) =>
                                (<Message key={message.createdAt.toString()} {...message}
                                          sendMe={myUsername === message.sender}/>))}
                        </div>
                    </div>
                    <MessageSender username={myUsername}/>
                </div>
            </div>
        </div>
    )
}

export default Chat