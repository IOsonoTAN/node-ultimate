import * as dotenv from 'dotenv'

dotenv.config() // default is .env

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost/node-ultimate'
  },
  redis: {
    uri: process.env.REDIS_URI || 'redis://localhost'
  },
  auth: {
    acessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET
  }
}