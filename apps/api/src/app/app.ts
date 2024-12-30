import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { AppConfig } from './app.interface'
import { messageMongoRepoInit } from './message/repository/repository.mongo'
import { messageUseCaseInit } from './message/usecase/usecase'
import { messageControllerInit } from './message/delivery/http/http.controller'
import { messageRouteInit } from './message/delivery/http/route'
import { fastifyCors } from '@fastify/cors'
import { WebSocketServer } from 'ws'


export async function buildServer({ connectDatabase, config, logger }: AppConfig) {
  const app = Fastify().withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(fastifyCors)

  const wsServer = new WebSocketServer({ server: app.server })


  // Init Repositories
  const messageRepo = await messageMongoRepoInit(connectDatabase({ ...config.database, collection: 'messages' }))

  // Init UseCases
  const messageUC = messageUseCaseInit({ messageRepo, wsServer })

  // Init Controllers
  const chatController = messageControllerInit({ messageUC, logger })

  app.register(messageRouteInit(chatController), { prefix: 'api/v1/messages' })

  return app
}