import * as redis from 'redis'

const client = redis.createClient() // use default redis on local

/**
 * storeIntoCache
 * @param key the name of cachine
 * @param value the value of caching
 * @param ttl the time to live of caching, default is 60 secs
 * @return Promise<string> OK
 */
export const storeIntoCache = async (key: string, value: any, ttl: number = 60): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.SETEX(key, ttl, JSON.stringify(value), (error, reply) => {
      if (error) reject(error)
      resolve(reply)
    })
  })
}

/**
 * getValueFromCache
 * @param key the name of caching
 * @return Promise<any>
 */
export const getValueFromCache = async (key: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.GET(key, (error, reply) => {
      if (error) reject(error)
      resolve(JSON.parse(reply))
    })
  })
}

export default client