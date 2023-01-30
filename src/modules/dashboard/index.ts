import * as handler from './handler'

import { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

const pluginAsync: FastifyPluginAsync = async (fastify, _option) => {
  fastify.route({
    url: '/dashboard',
    method: 'GET',
    handler: handler.getDashboardStats,
  })
}

export default fp(pluginAsync, {
  fastify: '4.x',
  name: 'dashboard-module',
})
