import { FastifyInstance } from 'fastify'
import { handleLogin, handleRegister, handleGetUserMe, handleRefreshToken } from '../handlers/users'
import { verifyAccessToken } from '../hooks/auth'

/**
 * users router
 * prefix /users
 */
export default async (app: FastifyInstance) => {
  app.post('/register', handleRegister)
  app.post('/login', handleLogin)

  app.get('/me', {
    preHandler: [
      verifyAccessToken
    ]
  }, handleGetUserMe)

  app.post('/refresh-token', handleRefreshToken)
}