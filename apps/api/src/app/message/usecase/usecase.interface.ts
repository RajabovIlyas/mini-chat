import { MessageRepository } from '../repository/repository.interface';
import { InsertMessage, Message } from '../../../models/message.model';
import { Server } from 'ws';

export interface MessageUseCase {
  create(messages: InsertMessage): Promise<void>;

  findAll(): Promise<Message[]>;
}

export interface MessageUseCaseConfig {
  messageRepo: MessageRepository;
  wsServer: Server;
}