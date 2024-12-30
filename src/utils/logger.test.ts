import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getLogger, setGlobalLogLevel } from './logger';

// Mocking console methods for testing
const mockConsole = {
  trace: vi.spyOn(console, 'trace').mockImplementation(() => {}),
  debug: vi.spyOn(console, 'debug').mockImplementation(() => {}),
  info: vi.spyOn(console, 'info').mockImplementation(() => {}),
  warn: vi.spyOn(console, 'warn').mockImplementation(() => {}),
  error: vi.spyOn(console, 'error').mockImplementation(() => {}),
};

const clearMocks = () => {
  Object.values(mockConsole).forEach((mock) => mock.mockClear());
};

describe('Logger', () => {
  beforeEach(() => {
    clearMocks();
    setGlobalLogLevel('silent'); // Reset global log level for each test
  });

  it('should log messages at the appropriate level', () => {
    setGlobalLogLevel('trace');

    const logger = getLogger('Layer');

    logger.trace(() => 'This is a trace message');
    logger.debug(() => 'This is a debug message');
    logger.info(() => 'This is an info message');
    logger.warn(() => 'This is a warning message');
    logger.error(() => 'This is an error message');

    expect(mockConsole.trace).toHaveBeenCalledWith('This is a trace message');
    expect(mockConsole.debug).toHaveBeenCalledWith('This is a debug message');
    expect(mockConsole.info).toHaveBeenCalledWith('This is an info message');
    expect(mockConsole.warn).toHaveBeenCalledWith('This is a warning message');
    expect(mockConsole.error).toHaveBeenCalledWith('This is an error message');
  });

  it('should respect global log level', () => {
    setGlobalLogLevel('debug');

    const logger = getLogger('Layer');

    logger.debug(() => 'This is a debug message');
    logger.info(() => 'This is an info message');

    expect(mockConsole.debug).not.toHaveBeenCalled();
    expect(mockConsole.info).toHaveBeenCalledWith('This is an info message');
  });

  it('should lazily evaluate message functions', () => {
    const logger = getLogger('Layer');
    const messageFn = vi.fn(() => 'Lazy evaluation message');

    logger.debug(messageFn);
    logger.warn(messageFn);

    expect(messageFn).toHaveBeenCalledTimes(1); // Only called for the "warn" level
    expect(mockConsole.warn).toHaveBeenCalledWith('Lazy evaluation message');
  });

  it('should create and reuse logger instances', () => {
    const logger1 = getLogger('Layer');
    const logger2 = getLogger('Layer');

    logger1.info(() => 'Shared logger test');
    logger2.info(() => 'Shared logger reused');

    expect(mockConsole.info).toHaveBeenCalledWith('Shared logger test');
    expect(mockConsole.info).toHaveBeenCalledWith('Shared logger reused');
  });

  it('should apply global log level to existing loggers', () => {
    const logger = getLogger('Layer');

    setGlobalLogLevel('warn');

    logger.info(() => 'This is an info message');
    logger.warn(() => 'This is a warning message');

    expect(mockConsole.info).not.toHaveBeenCalled();
    expect(mockConsole.warn).toHaveBeenCalledWith('This is a warning message');
  });
});
