import config from './constant/config'
import { logger } from './utils/logger'

import autoLoad from '@fastify/autoload'
import fastifyCors from '@fastify/cors'
import swagger from '@fastify/swagger'
import Ajv from 'ajv'
import fastify, { FastifyInstance } from 'fastify'
import { join } from 'path'

const server = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:h:MM:ss',
        colorize: true,
        ignore: 'pid,hostname',
      },
    },
  },
})

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true,
  strict: false,
  allErrors: true,
})

server.get('/health', async (request, reply) => {
  reply.send({ healthcheck: 'server is alive' })
})

server.register(fastifyCors, () => {
  return (req, callback) => {
    const corsOptions = {
      // This is NOT recommended for production as it enables reflection exploits
      origin: config.ORIGIN,
      allowedHeaders: [
        'Accept',
        'Authorization',
        'Content-Type',
        'If-None-Match',
        'Accept-language',
        'cache-control',
        'x-requested-with',
      ],
    }

    // do not include CORS headers for requests from localhost
    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = '*'
    }

    // callback expects two parameters: error and options
    callback(null, corsOptions)
  }
})

server.setValidatorCompiler(({ schema }): any => {
  return ajv.compile(schema)
})

server.addHook('preHandler', (req, _reply, done) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body')
  }
  done()
})

server.setSchemaErrorFormatter((): any => {
  return {
    message: 'Bad Request',
    code: 'VAL_ERR',
  }
})

server.register(swagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Backend Tools Microservice',
      description: 'A microservice for Jubelio Backend Tools - POS',
      version: '1.0.0',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header',
      },
    },
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next()
    },
    preHandler: function (request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  exposeRoute: true,
})

server.register(autoLoad, {
  dir: join(__dirname, 'plugins'),
})

server.register(autoLoad, {
  dir: join(__dirname, 'modules'),
  maxDepth: 2,
})

server.addHook('preSerialization', (request, reply, _payload, done) => {
  reply.header('request_id', request.request_id)
  done()
})

server.setErrorHandler(function (error, request, reply) {
  // Send error response
  logger.error({ message: error, requestId: request.request_id })
  delete error.statusCode
  delete error.validation
  delete error.name
  reply.send({ ...error })
})

export const app: FastifyInstance = server
