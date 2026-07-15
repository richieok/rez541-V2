import pino from 'pino'

const level = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')

// Fields that must never appear in logs in clear text, wherever they occur
const redactPaths = [
    'token',
    '*.token',
    '*.*.token',
    'bookingToken',
    '*.bookingToken',
    'email',
    '*.email',
    '*.*.email',
    'phone',
    '*.phone',
    '*.*.phone',
    'signedUrl',
    '*.signedUrl',
    'accessToken',
    '*.accessToken',
    'req.headers.authorization',
    'req.headers.cookie'
]

const logger = pino({
    level,
    base: { service: 'backend' },
    redact: { paths: redactPaths, censor: '[REDACTED]' },
    ...(process.env.NODE_ENV !== 'production' && {
        transport: {
            target: 'pino-pretty',
            options: { colorize: true, translateTime: 'SYS:standard' }
        }
    })
})

export default logger
