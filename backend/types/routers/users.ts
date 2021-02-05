import { FastifyRequest } from 'fastify'

export type UsersRegisterBodyRequest = FastifyRequest<{
  Body: {
    username: string
    password: string
    name: string
    surname: string
    email: string
  }
}>

export type UsersLoginBodyRequest = FastifyRequest<{
  Body: {
    username: string
    password: string
  }
}>

export type UsersRefreshTokenRequest = FastifyRequest<{
  Body: {
    refreshToken: string
  }
}>