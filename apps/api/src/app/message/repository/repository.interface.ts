import { MessageModel } from '../../../models/message.model'
import { DatabaseConnection } from '../../../utils/db/db.interface'

export interface MessageRepository {
  createMany(messages: MessageModel[]): Promise<void>;

  findAll(): Promise<MessageModel[]>;
}

export type RepositoryConfig = DatabaseConnection