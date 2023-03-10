const config = {
  APP_PORT: process.env.PORT || 8000,
  JWT: { secret: '1q@w3e4r5t6y', expires: '24h' },
  TENANT_DB_PORT: parseInt(process.env.TENANT_DB_PORT, 10) ?? 5432,
  TENANT_USER: process.env.TENANT_DB_USER,
  TENANT_PWD: process.env.TENANT_DB_PWD,
  SYSTEM_DB_PORT: parseInt(process.env.SYSTEM_DB_PORT, 10) ?? 5432,
  SYSTEM_DB_HOST: process.env.SYSTEM_DB_HOST || 'localhost',
  SYSTEM_DB_USER: process.env.SYSTEM_DB_USER,
  SYSTEM_DB_PWD: process.env.SYSTEM_DB_PWD,
  SYSTEM_DB_NAME: process.env.SYSTEM_DB_NAME,
  SECRET_KEY: process.env.SECRET_KEY || '123abc',
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_AUTH: process.env.REDIS_AUTH,
  REDIS_USE_SSL: process.env.REDIS_USE_SSL || false,
  NODE_ENV: process.env.NODE_ENV || 'development',
  ORIGIN: process.env.ORIGIN || '*',
  TENANT_POOL_SIZE: process.env.TENANT_POOL_SIZE || 50,
  SYSTEM_POOL_SIZE: process.env.SYSTEM_POOL_SIZE || 20,
  POOL_IDLE_TIMEOUT: process.env.POOL_IDLE_TIMEOUT || 60000,
}

export default config
