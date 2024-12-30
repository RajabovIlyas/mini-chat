import { FastifyReply, FastifyRequest } from 'fastify'
import { Logger } from 'winston'
import { MessageUseCase } from '../../usecase/usecase.interface'

export interface MessageController {

  create(req: FastifyRequest, reply: FastifyReply): Promise<void>;

  find(req: FastifyRequest, reply: FastifyReply): Promise<void>;
}

export interface MessageConfig {
  messageUC: MessageUseCase;
  logger: Logger
}
