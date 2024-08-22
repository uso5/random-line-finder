import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, colorize } = format;


const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'random-line-finder' },
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}

export { logger };
