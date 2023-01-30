import config from '../../constant/config'

import autoLoad from '@fastify/autoload'
import fastify, { FastifyInstance } from 'fastify'
import { join } from 'path'

class App {
  public app: FastifyInstance
  public app_domain: string = config.APP.domain
  public app_port: number = config.APP.port

  constructor() {
    this.app = fastify({
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

    this.app.addHook('preHandler', (req, _reply, done) => {
      if (req.body) {
        req.log.info({ body: req.body }, 'parsed body')
      }
      done()
    })

    this.app.register(autoLoad, {
      dir: join(__dirname, '../../' + 'plugins'),
    })

    this.app.register(autoLoad, {
      dir: join(__dirname, '../../' + 'modules'),
      ignorePattern: /.*(model|schema)\.js/,
    })

    this.app.addHook('preSerialization', (request, reply, _payload, done) => {
      reply.header('request_id', request.request_id)
      done()
    })

    this.routes()
  }

  public routes() {
    this.app.get('/health', async (request, reply) => {
      reply.send({ healthcheck: 'server is alive' })
    })
  }

  public listen() {
    this.app.listen({ port: this.app_port, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        this.app.log.error(err)
        process.exit(1)
      }

      this.app.log.info(`server listening on ${address}`)
    })
  }
}

export default App
