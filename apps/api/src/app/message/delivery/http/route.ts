import { FastifyInstance } from 'fastify'
import { MessageController } from './controller.interface'
import { messageReqSchema } from './dtos/create.dto'

export function messageRouteInit(controller: MessageController) {
  return function(server: FastifyInstance) {
    server.get('/', controller.find)
    server.post('/', {
      schema: {
        body: messageReqSchema
      }
    }, controller.create)
  }
}