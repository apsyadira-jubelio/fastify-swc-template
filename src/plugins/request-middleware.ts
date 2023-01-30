import { logger } from '@/utils/logger'

import { FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import shortUUID from 'short-uuid'

const requestHook: FastifyPluginCallback = async (fastify, _options, done) => {
  fastify.addHook('onRequest', (req: FastifyRequest, _rep: FastifyReply, hookDone) => {
    req.request_id = shortUUID.generate()
    const { headers, body, url, method, request_id } = req
    logger.info({ message: { headers, body, url, method }, requestId: request_id })
    hookDone()
  })
  done()
}

export default fp(requestHook, '4.x')

declare module 'fastify' {
  export interface FastifyRequest {
    request_id: string
  }
}

declare module 'fastify' {
  export interface FastifyInstance {
    request_id: string
  }
}
