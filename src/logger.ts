import pino from 'pino';

export const logger = pino({
    name: 'now-playingß-api',
    level: process.env.DEBUG_LEVEL || 'debug',
});
