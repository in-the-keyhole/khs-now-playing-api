import pino from 'pino';

export const logger = pino({
  name: 'khs-now-playing-api',
  level: process.env.DEBUG_LEVEL || 'debug',
});
