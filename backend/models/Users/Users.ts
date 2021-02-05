import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import Users, { UsersSchemaWithDocument } from './schema'
import { UsersSchema, UserLoginResponse, RefreshTokenJWTDecoded } from '../../types/models/Users'
import customError from '../../helpers/custom-error'
import authErrors from '../../errors/auth'
import config from '../../configs'
import { storeIntoCache, getValueFromCache } from '../../redis'

const userRefreshTokenCacheKey = (userId: string) => `refresh-token:${userId}`

const createHashPassword = (password: string): string => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(password, salt)

  return hashedPassword
}

const comparePassword = (password: string, existsPassword: string): boolean => {
  const isPasswordCorrect = bcrypt.compareSync(password, existsPassword)
  if (!isPasswordCorrect) {
    customError(authErrors.AuthPasswordIncorrect)
  }
  return true
}

const generateAccessToken = (userId: string): string => {
  const token = jwt.sign({}, config.auth.acessTokenSecret, {
    expiresIn: 60,
    audience: userId
  })

  return token
}

const generateRefreshToken = async (userId: string): Promise<string> => {
  const ttl = 60 * 60
  const token = jwt.sign({}, config.auth.refreshTokenSecret, {
    expiresIn: ttl,
    audience: userId
  })

  await storeIntoCache(userRefreshTokenCacheKey(userId), token, ttl)

  return token
}

export const generateTokens = async (userId: string): Promise<UserLoginResponse> => {
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(userId),
    generateRefreshToken(userId)
  ])

  return {
    accessToken,
    refreshToken
  }
}

export const verifyRefreshToken = async (refreshToken: string): Promise<string> => {
  try {
    const payload = jwt.verify(refreshToken, config.auth.refreshTokenSecret)
    const decoded: RefreshTokenJWTDecoded = Object(payload) // return string | object
    const userId = decoded.aud

    const refreshTokenInCache = await getValueFromCache(userRefreshTokenCacheKey(userId))
    if (refreshTokenInCache !== refreshToken) {
      customError(authErrors.AuthRefreshTokenInvalid)
    }

    return userId
  } catch (error) {
    customError(authErrors.AuthRefreshTokenInvalid)
  }
}

export const createNewUser = async (doc: UsersSchema): Promise<UsersSchemaWithDocument> => {
  doc.password = createHashPassword(doc.password)

  const user = new Users(doc)

  return await user.save()
}

export const userLogin = async (username: string, password: string): Promise<UserLoginResponse> => {
  const user = await Users.findOne({
    username
  })
  if (!user) {
    customError(authErrors.AuthUsernameIncorrect)
  }
  
  comparePassword(password, user.password)

  const userId = String(user._id)
  const [accessToken, refreshToken] = await Promise.all([
    generateAccessToken(userId),
    generateRefreshToken(userId)
  ])

  return {
    accessToken,
    refreshToken
  }
}

export default {
  createNewUser,
  userLogin,
  verifyRefreshToken
}