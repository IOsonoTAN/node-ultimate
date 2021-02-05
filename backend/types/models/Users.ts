import { FastifyRequest } from 'fastify'

export interface UsersSchema {
  username: string
  password: string
  email: string
  name?: string
  surname?: string
}

export interface UserLoginResponse {
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenJWTDecoded {
  aud: string
  iat: number
  exp: number
}