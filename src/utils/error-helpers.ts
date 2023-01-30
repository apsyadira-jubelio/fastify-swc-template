import { logger } from './logger'

import createError, { FastifyErrorConstructor } from '@fastify/error'
import { FastifyReply } from 'fastify'

const NotFoundError: FastifyErrorConstructor = createError('NOT_FOUND', 'Error %s not found. ID: %s', 400)

const InputError: FastifyErrorConstructor = createError('ERR_INPUT', 'Error when input', 400)

const InternalServerError: FastifyErrorConstructor = createError('INT_ERR', '%s', 500)

const ValidationError: FastifyErrorConstructor = createError('VAL_ERR', '%s in %s', 400)

const AuthenticationError: FastifyErrorConstructor = createError('AUTH_ERR', '%s', 401)

// Error functions below are supposed to handle error in handler level
const CreateError = (
  message: string,
  rep: FastifyReply,
  httpCode: number,
  code: string,
  requestId?: string,
  extraInfo?: object,
): FastifyReply => {
  logger.debug(message, { requestId })
  return rep.code(httpCode).send({
    code,
    ...extraInfo,
    message: message,
  })
}

export { AuthenticationError, CreateError, InputError, InternalServerError, NotFoundError, ValidationError }
