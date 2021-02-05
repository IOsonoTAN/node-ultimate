import { CustomErrorParams } from '../helpers/custom-error'

export const AuthUsernameIncorrect: CustomErrorParams = {
  message: 'Username Incorrect',
  refCode: 'AUTH1000',
  statusCode: 401
}
export const AuthPasswordIncorrect: CustomErrorParams = {
  message: 'Password Incorrect',
  refCode: 'AUTH1001',
  statusCode: 401
}

export const AuthRefreshTokenInvalid: CustomErrorParams = {
  message: 'Refresh Token Invalid',
  refCode: 'AUTH1002',
  statusCode: 401
}

export const AuthAuthorizationIsMissing: CustomErrorParams = {
  message: 'Authorization is missing',
  refCode: 'AUTH1003',
  statusCode: 401
}

export const AuthAuthorizationIsInvalid: CustomErrorParams = {
  message: 'Authorization Invalid',
  refCode: 'AUTH1004',
  statusCode: 401
}

export const AuthAccessTokenExpired: CustomErrorParams = {
  message: 'Access Token Expired',
  refCode: 'AUTH1005',
  statusCode: 401
}

export default {
  AuthUsernameIncorrect,
  AuthPasswordIncorrect,
  AuthRefreshTokenInvalid,
  AuthAuthorizationIsMissing,
  AuthAuthorizationIsInvalid,
  AuthAccessTokenExpired
}