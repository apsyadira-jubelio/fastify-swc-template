import { InternalServerError } from '@/utils/error-helpers'

import { helloFromDashboard } from '@/repository/dashboard'

import { FastifyReply, FastifyRequest } from 'fastify'

export const getDashboardStats = async (_request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  try {
    const resTenants = helloFromDashboard()

    return reply.status(200).send({ resTenants })
  } catch (error) {
    throw new InternalServerError(error.message)
  }
}
