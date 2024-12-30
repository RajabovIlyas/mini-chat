import { MessageUseCase, MessageUseCaseConfig } from './usecase.interface'
import { InsertMessage, MessageModel } from '../../../models/message.model'
import { bufferCommon } from '../../../utils/common/buffer.common'


export function messageUseCaseInit({ messageRepo, wsServer }: MessageUseCaseConfig): MessageUseCase {
  const { addDataToBuffer, getBuffers } = bufferCommon<MessageModel>(messageRepo.createMany)
  return {
    async create(message: InsertMessage) {
      const messagesWithCreatedAt = { ...message, createdAt: new Date() }

      await addDataToBuffer(messagesWithCreatedAt)

      if (wsServer.clients.size <= 0) {
        return
      }
      wsServer.clients.forEach((client) => {
        if (client.readyState !== WebSocket.OPEN) {
          return
        }
        client.send(JSON.stringify(messagesWithCreatedAt))
      })
    },

    async findAll() {
      const findMessages = await messageRepo.findAll()
      return [...findMessages, ...getBuffers()]
    }
  }
}