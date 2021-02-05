import * as mongoose from 'mongoose'

import buildApp from './app'
import config from './configs'

const app = buildApp({
  logger: (config.env === 'development') // will be true if env is development
})

mongoose.connect(config.mongo.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
mongoose.connection.on('error', (error) => app.log.error(error))
mongoose.connection.once('open', () => app.log.info('MongoDB has been connected'))

app.listen(config.port) // will be listen by default is 3000