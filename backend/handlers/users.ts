import { FastifyRequest } from 'fastify'
import { UsersRegisterBodyRequest, UsersLoginBodyRequest, UsersRefreshTokenRequest } from '../types/routers/users'
import Users from '../models/Users'

export const handleRegister = async (request: UsersRegisterBodyRequest) => {
  const { username, password, email, name, surname } = request.body

  const user = await Users.createNewUser({
    username,
    password,
    email,
    name,
    surname
  })

  return user
}

export const handleLogin = async (request: UsersLoginBodyRequest) => {
  const { username, password } = request.body

  const user = await Users.userLogin(username, password)

  return user
}

export const handleGetUserMe = async (request: FastifyRequest) => {
  const { userId } = request

  return `HandleGetUserMe ${userId}`
}

export const handleRefreshToken = async (request: UsersRefreshTokenRequest) => {
  const { refreshToken: currentRefreshToken } = request.body

  const userId = await Users.verifyRefreshToken(currentRefreshToken)
  const tokens = await Users.generateTokens(userId)

  return tokens
}