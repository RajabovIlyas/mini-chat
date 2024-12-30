import { MessageRepository, RepositoryConfig } from './repository.interface'
import { MessageModel } from '../../../models/message.model'


export async function messageMongoRepoInit({ getCollection }: RepositoryConfig): Promise<MessageRepository> {

  return {
    async createMany(messages: MessageModel[]) {
      const { collection, disconnect } = await getCollection<MessageModel>()

      await collection.insertMany(messages)
      await disconnect()
    },

    async findAll() {
      const { collection, disconnect } = await getCollection<MessageModel>()

      const messages = await collection.find().sort({ createdAt: 1 }).toArray()
      await disconnect()
      return messages
    }
  }
}