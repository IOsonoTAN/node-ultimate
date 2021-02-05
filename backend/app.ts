import fastify, { FastifyServerOptions } from 'fastify'
import { CustomError } from './helpers/custom-error'
import usersRouters from './routers/users'

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string
  }
}

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options)

  app.get('/', async () => 'OK')
  app.register(usersRouters, { prefix: '/users' })

  app.setErrorHandler((error, request, reply) => {
    const customError: CustomError = error

    reply
      .status(customError.statusCode)
      .send({
        error: {
          message: customError.message,
          refCode: customError.refCode || '',
          data: customError.data || {}
        }
      })
  })

  return app
}

export default buildApp