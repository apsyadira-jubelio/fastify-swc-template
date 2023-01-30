import config from '@/constant/config'

import Redis from 'ioredis'

// redis config
const rc = {
  port: Number(config.REDIS_PORT),
  host: config.REDIS_HOST,
  auth_pass: config.REDIS_AUTH,
  useSsl: config.REDIS_USE_SSL,
}

const CON: Record<string, any> = {} // store redis connections as Object

const newConnection = (): Redis => {
  let redisCon

  try {
    const options: Record<string, any> = { auth_pass: rc.auth_pass }

    if (rc.useSsl === 'true') {
      options.tls = { servername: rc.host }
    }
    redisCon = new Redis(rc.port, rc.host, { password: rc.auth_pass })
  } catch (e) {
    console.error(e)
    throw e
  }

  return redisCon
}

export const redisConnection = (type = 'DEFAULT'): Redis => {
  if (!CON[type]) {
    CON[type] = newConnection()
  }
  return CON[type]
}

export const cache = {
  set: async (key: string, value: any, exp: number): Promise<void> => {
    // for QA purpose disable dashboard cache
    if (key.startsWith('DASH:txbtffkshrvmfx1gmgxenua')) {
      return
    }

    try {
      const client = redisConnection()
      let storedValue

      if (typeof value === 'string') {
        storedValue = value
      } else {
        storedValue = JSON.stringify(value)
      }
      if (exp !== undefined) {
        await client.set(key, storedValue, 'EX', exp)
      } else {
        await client.set(key, storedValue)
      }
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  get: async <T>(key: string): Promise<T> => {
    const client = redisConnection()
    const reply = await client.get(key)
    // reply might be null, so be sure to check it when calling this method
    if (reply) {
      const output = JSON.parse(reply)
      if (output && typeof output === 'object' && output !== null) return output
    }
    // we don't have a valid json so return as is
    return reply as unknown as T
  },

  delete: (key: string): void => {
    const client = redisConnection()
    client.del(key)
  },

  keyList: (key: string) => {
    const client = redisConnection()
    return client.keys(key)
  },

  killAll: (): void => {
    const names = Object.keys(CON)
    names.forEach((k) => {
      CON[k].end(false)
      delete CON[k]
    })
  },
}
