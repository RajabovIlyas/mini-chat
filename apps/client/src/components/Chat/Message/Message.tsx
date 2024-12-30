import {FC} from 'react'
import { Message as MessageModel } from '../../../models/message.model.ts'

interface MessageProps extends MessageModel {
    sendMe: boolean
}

const Message: FC<MessageProps> = ({sender, message, sendMe}) => {

    const classes = sendMe
        ? 'flex flex-col self-end bg-blue-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm'
        : 'flex flex-col self-start bg-zinc-500 text-white max-w-xs rounded-lg px-3 py-1.5 text-sm'

    return (
        <div
            className={classes}
        >
            <strong hidden={sendMe}>{sender}</strong>
            <span>{message}</span>
        </div>
    )
}

export default Message