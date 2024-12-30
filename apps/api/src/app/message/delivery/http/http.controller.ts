import { MessageConfig, MessageController } from './controller.interface'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateBody } from './dtos/create.dto'


export function messageControllerInit({ messageUC, logger }: MessageConfig): MessageController {
  return {
    async create(req: FastifyRequest & CreateBody, reply: FastifyReply) {
      try {
        await messageUC.create(req.body)
        reply.status(201).send({
          message: 'CREATED MESSAGES'
        })
      } catch (e) {
        if (e instanceof Error) {
          logger.error(e.message)
        }
        reply.status(500).send({ error: 'Server Error' })
      }
    },

    async find(req: FastifyRequest, reply: FastifyReply) {
      try {
        const messages = await messageUC.findAll()
        reply.status(200).send(messages)
      } catch (e: unknown) {
        if (e instanceof Error) {
          logger.error(e.message)
        }
        reply.status(500).send({ error: 'Server Error' })
      }
    }
  }
}