import pino from 'pino';

const level = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

// Fields that must never appear in logs in clear text, wherever they occur
const redactPaths = [
    'token',
    '*.token',
    'bookingToken',
    '*.bookingToken',
    'email',
    '*.email',
    'phone',
    '*.phone',
    'signedUrl',
    '*.signedUrl'
];

const logger = pino({
    level,
    base: { service: 'frontend' },
    redact: { paths: redactPaths, censor: '[REDACTED]' }
});

export default logger;
