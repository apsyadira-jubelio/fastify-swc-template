import { createSingleton } from '@/lib/helpers'

import config from '@/constant/config'

import Promise from 'bluebird'
import pgPromise from 'pg-promise'
import pg, { IClient } from 'pg-promise/typescript/pg-subset'

/**
 * Params for connection
 */
const systemDb: pg.IConnectionParameters<IClient> = {
  host: config.SYSTEM_DB_HOST,
  port: config.SYSTEM_DB_PORT,
  database: config.SYSTEM_DB_NAME,
  user: config.SYSTEM_DB_USER,
  password: config.SYSTEM_DB_PWD,
  idleTimeoutMillis: +config.POOL_IDLE_TIMEOUT,
  max: +config.TENANT_POOL_SIZE,
}

const TenantDB = {
  user: config.TENANT_USER,
  password: config.TENANT_PWD,
  host: '',
  port: config.TENANT_DB_PORT,
  database: '',
  poolsize: 10,
  max: 10,
}

/**
 * Create a connection pool
 */
const dbSysConnection = pgPromise({
  promiseLib: Promise,
  async connect(client: pg.IClient, dc, useCount: number) {
    if (useCount === 0 && dc && dc.email) {
      const email = encodeURI(dc.email)
      await client.query(`SET SESSION "app.user" = '${email}'`)
    }
  },
})

export const dbSystem = dbSysConnection(systemDb)

export const tenantDb = (host: string, dbName: string, _schemaName?: string): pgPromise.IDatabase<any> => {
  return createSingleton<pgPromise.IDatabase<any>>(`conn:${host}`, () => {
    const initOption = {
      promiseLib: Promise,
    }

    const pgp: pgPromise.IMain = pgPromise(initOption)
    TenantDB.host = host
    TenantDB.database = dbName
    return pgp(TenantDB)
  })
}
