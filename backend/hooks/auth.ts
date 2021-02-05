import { FastifyRequest } from 'fastify'
import * as jwt from 'jsonwebtoken'
import customError from '../helpers/custom-error'
import authErrors from '../errors/auth'
import config from '../configs'
import { RefreshTokenJWTDecoded } from '../types/models/Users'

export const verifyAccessToken = async (request: FastifyRequest): Promise<boolean> => {
  try {
    const authorizationToken = request.headers['authorization']
    if (!authorizationToken) {
      customError(authErrors.AuthAuthorizationIsMissing)
    }

    const accessToken = authorizationToken.split(' ')[1] // Split Bearer [Token]
    if (!accessToken) {
      customError(authErrors.AuthAuthorizationIsInvalid)
    }

    const payload = jwt.verify(accessToken, config.auth.acessTokenSecret)
    const decoded: RefreshTokenJWTDecoded = Object(payload)

    request.userId = decoded.aud

    return true
  } catch (error) {
    const isTokenExpired = (error.message === 'jwt expired')
    if (isTokenExpired) {
      customError(authErrors.AuthAccessTokenExpired)
    }
    customError(authErrors.AuthAuthorizationIsInvalid)
  }
}

export default {
  verifyAccessToken
}