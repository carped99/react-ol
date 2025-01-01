import log, { Logger as LoggerImpl } from 'loglevel';

export type LogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';

let defaultLevel: LogLevel = 'info';

export type LoggerName = 'Map' | 'View' | 'Layer';

class Logger {
  private logger: LoggerImpl;

  constructor(namespace: string) {
    this.logger = log.getLogger(namespace);
    this.setLevel(defaultLevel);
  }

  setLevel(level: LogLevel) {
    this.logger.setLevel(level);
  }

  trace(message: () => string, ...args: unknown[]) {
    if (this.logger.getLevel() <= log.levels.TRACE) {
      this.logger.trace(message(), ...args);
    }
  }

  debug(message: () => string, ...args: unknown[]) {
    if (this.logger.getLevel() <= log.levels.DEBUG) {
      this.logger.debug(message(), ...args);
    }
  }

  info(message: () => string, ...args: unknown[]) {
    if (this.logger.getLevel() <= log.levels.INFO) {
      this.logger.info(message(), ...args);
    }
  }

  warn(message: () => string, ...args: unknown[]) {
    if (this.logger.getLevel() <= log.levels.WARN) {
      this.logger.warn(message(), ...args);
    }
  }

  error(message: () => string, ...args: unknown[]) {
    if (this.logger.getLevel() <= log.levels.ERROR) {
      this.logger.error(message(), ...args);
    }
  }
}

// Logger factory and global configuration
const loggers: Record<string, Logger> = {};

export const getLogger = (namespace: LoggerName): Logger => (loggers[namespace] ??= new Logger(namespace));

export const setGlobalLogLevel = (level: LogLevel) => {
  defaultLevel = level;
  Object.values(loggers).forEach((logger) => logger.setLevel(level));
};

export const getDefaultLogLevel = (): LogLevel => defaultLevel;
