import winston from 'winston'
import Transports from 'winston-transport'

const { combine, printf } = winston.format

const format: winston.Logform.Format = printf(({ level, message, timestamp, requestId }, ..._rest) => {
  let log = `${new Date(timestamp).toISOString()} ${level}: ${message}`
  if (requestId) {
    log += ' RequestId: ' + requestId
  }
  return log
})

const transportsConfig: Transports[] = [
  new winston.transports.Console({
    format: combine(winston.format.timestamp(), winston.format.align(), format),
  }),
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({ filename: 'combined.log' }),
]

export const logger: winston.Logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',

  format: winston.format.json({}),
  defaultMeta: {
    labels: {
      module: 'default',
    },
  },
  transports: transportsConfig,
})
