import winston from 'winston'
import 'winston-daily-rotate-file'

const transportInfo = new winston.transports.DailyRotateFile({
  filename: 'logs/info/%DATE%-info.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

const transportError = new winston.transports.DailyRotateFile({
  filename: 'logs/errors/%DATE%-error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
})

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    transportInfo,
    transportError,
    new winston.transports.Console({ // Также выводим в консоль
      format: winston.format.simple()
    })
  ]
})

logger.exceptions.handle(
  new winston.transports.File({ filename: 'logs/errors/exceptions.log' })
)