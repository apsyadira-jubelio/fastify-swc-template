import { ResponseInterface } from '@/interfaces/response'

import parseResponse from './response.parser'

import { FastifyReply } from 'fastify'

export const responseSender = async (data: ResponseInterface, reply: FastifyReply): Promise<void> => {
  reply.send(data)
}

const responseHandler = async (
  next: () => ResponseInterface | PromiseLike<ResponseInterface>,
  reply: FastifyReply,
): Promise<void> => {
  try {
    const data: ResponseInterface = await next()
    responseSender(parseResponse(data), reply)
  } catch (error: any) {
    responseSender(parseResponse(error), reply)
  }
}

export default responseHandler
