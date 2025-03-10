import { LoggerService } from '@nestjs/common'
import { Logger } from 'winston'

export class WinstonLogger implements LoggerService {
    private context?: string;
    private message
  
    constructor(private readonly logger: Logger) {}
  
    public setContext(context: string) {
      this.context = context;
    }

    public critical(message: any) {}
  
    public log(message: any, context?: string): any {
      context = context || this.context;
  
      if(!!message && 'object' === typeof message) {
        const { message: msg, level = 'info', ...meta } = message;
  
        return this.logger.log(level, msg as string, { context, ...meta });
      }
  
      return this.logger.info(message, { context });
    }
  
    public fatal(message: any, trace?: string, context?: string): any {
      context = context || this.context;
  
      if (message instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { message: msg, name, stack, ...meta } = message;
  
        return this.logger.log({ level: 'fatal', message: msg, context, stack: [trace || stack], error: message, ...meta });
      }
  
      if (!!message && 'object' === typeof message) {
        const { message: msg, ...meta } = message;
  
        return this.logger.error({ level: 'fatal', message: msg, context, stack: [trace], ...meta });
      }
  
      return this.logger.error({ level: 'fatal', message, context, stack: [trace] });
    }
  
    public error(message: any, trace?: string, context?: string): any {
      context = context || this.context;
  
      if(message instanceof Error) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { message: msg, name, stack, ...meta } = message;
  
        return this.logger.error(msg, { context, stack: [trace || message.stack], error: message, ...meta });
      }
  
      if(!!message && 'object' === typeof message) {
        const { message: msg, ...meta } = message;
  
        return this.logger.error(msg as string, { context, stack: [trace], ...meta });
      }
  
      return this.logger.error(message, { context, stack: [trace] });
    }
  
    public warn(message: any, context?: string): any {
      context = context || this.context;
  
      if(!!message && 'object' === typeof message) {
        const { message: msg, ...meta } = message;
  
        return this.logger.warn(msg as string, { context, ...meta });
      }
  
      return this.logger.warn(message, { context });
    }
  
    public debug?(message: any, context?: string): any {
      context = context || this.context;
  
      if(!!message && 'object' === typeof message) {
        const { message: msg, ...meta } = message;
  
        return this.logger.debug(msg as string, { context, ...meta });
      }
  
      return this.logger.debug(message, { context });
    }
  
    public verbose?(message: any, context?: string): any {
      context = context || this.context;
  
      if(!!message && 'object' === typeof message) {
        const { message: msg, ...meta } = message;
  
        return this.logger.verbose(msg as string, { context, ...meta });
      }
  
      return this.logger.verbose(message, { context });
    }
  
    public getWinstonLogger(): Logger {
      return this.logger;
    }
  }


