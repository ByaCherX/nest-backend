import { 
  Logger, 
  LogLevel, 
  LogMessageType,
  LogMessageFormat, 
  PrepareLogMessagesOptions, 
  QueryRunner 
} from "typeorm";
import { PlatformTools } from "typeorm/platform/PlatformTools";
import { Logger as NestLogger } from "@nestjs/common";

/**
 * Log Message
 * Use this instead of TypeOrm LogMessage, version error type in typeorm is missing. 
 */
type LogMessage = {
  type?: LogMessageType;
  prefix?: string;
  message: string | number | Error;
  format?: LogMessageFormat;
  parameters?: any[];
  additionalInfo?: Record<string, any>;
};

/**
 * The TypeORM library is an additional layer that allows connecting the logger with rnrLogger.
 * 
 * @todo
 * * It is recommended to use schema instead of schema-build.
 * * Removing type and prefix complexity
 */
export class DataBaseLogger implements Logger {
  protected logger: NestLogger;

  constructor(protected options?: boolean | LogLevel[]) {
    this.logger = new NestLogger('DataBase');
  }
  
  /**
   * Logs query and parameters used in it.
   */
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (!this.isLogEnabledFor("query")) {
      return
    }
    
    this.writeLog(
      "query",
      {
        type: "query",
        prefix: "query",
        message: query,
        format: "sql",
        parameters,
      },
      queryRunner
    )
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (!this.isLogEnabledFor("query-error")) {
      return
    }

    this.writeLog(
      "error",
      [
        {
          type: "query-error",
          prefix: "error",
          message: error as Error,
        },
        {
          type: "query-error",
          prefix: "query failed",
          message: query,
          format: "sql",
          parameters,
        }
      ],
      queryRunner
    )
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    if (!this.isLogEnabledFor("query-slow")) {
      return
    }

    this.writeLog(
      "warn",
      [
        {
          type: "query-slow",
          prefix: "query is slow",
          message: query,
          format: "sql",
          parameters,
          additionalInfo: {
            time,
          },
        },
        {
          type: "query-slow",
          prefix: "execution time",
          message: time,
        }
      ],
      queryRunner
    )
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    if (!this.isLogEnabledFor("schema-build")) {
      return
    }

    this.writeLog(
      "schema",
      {
        type: "schema-build",
        message,
      },
      queryRunner
    )
  }

  /**
   * Logs events from the migration run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner) {
    if (!this.isLogEnabledFor("migration")) {
      return
    }

    this.writeLog(
      "migration",
      {
        type: "migration",
        message,
      },
      queryRunner
    )
  }

  /**
   * Not Implemented
   * @no_implemented
   */
  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner): void {
    return
  }

  /**
   * Check is logging for level or message type is enabled.
   */
  protected isLogEnabledFor(
    type?: 
      | "query" 
      | "query-error" 
      | "query-slow" 
      | "schema-build" 
      | "migration"
    ): boolean {
    switch (type) {
      case "query":
        return (
          this.options === true ||
          (Array.isArray(this.options) &&
            this.options.indexOf("query") !== -1)
        )

      case "query-error":
        return (
          this.options === true ||
          (Array.isArray(this.options) &&
            this.options.indexOf("error") !== -1)
        )

      case "query-slow":
        return (
          this.options === true ||
          (Array.isArray(this.options) &&
            this.options.indexOf("warn") !== -1)
        )

      case "schema-build":
        return (
          (Array.isArray(this.options) &&
            this.options.indexOf("schema") !== -1)
        )

      case "migration":
        return (
          (Array.isArray(this.options) &&
            this.options.indexOf("migration") !== -1)
        )

      default:
        return false
    }
  }

  protected writeLog(
    level: LogLevel, 
    logMessage: LogMessage | LogMessage[],
    queryRunner?: QueryRunner
  ): void {
    const messages = this.prepareLogMessages(logMessage, {
      highlightSql: false,
    })

    for (let message of messages) {
      switch (message.type ?? level) {
        case "query":
          if (message.prefix) {
            this.logger.verbose(message.message,  'DataBase-query')
          } else {
            this.logger.verbose(message.message)
          }
          break

        case "schema-build":
        case "migration":
          this.logger.log(message.message, 'DataBase-'+message.type)
          break

        case "query-slow":
          if (message.prefix) {
            this.logger.warn(message.message, 'DataBase-'+message.prefix)
          } else {
            this.logger.warn(message.message)
          }
          break

        case "query-error":
          if (message.prefix && message.prefix == 'error:') {
            this.logger.error(message.message, '', 'DataBase-error')
          } else {
            return
          }
          break
      }
    }
  }

  /**
   * Prepare and format log messages
   */
  protected prepareLogMessages(
    logMessage:
      | LogMessage
      | string
      | number
      | (LogMessage | string | number)[],
    options?: Partial<PrepareLogMessagesOptions>
  ): LogMessage[] {
    options = {
      ...{
        addColonToPrefix: true,
        appendParameterAsComment: true,
        highlightSql: true,
      },
      ...options
    }
    const messages = Array.isArray(logMessage) ? logMessage : [logMessage]

    for (let message of messages) {
      if (typeof message !== "object") {
        message = {
          message
        }
      }

      // Catching Error
      if (typeof message.message == "object") {
        // the stack on error is cleared because typeorm already throws an error
        message.message = message.message['code'] + ' => ' + message.message.message
      }

      if (message.format === "sql") {
        let sql = String(message.message)

        if (
          options.appendParameterAsComment &&
          message.parameters &&
          message.parameters.length
        ) {
          sql += ` -- PARAMATERS: ${this.stringifyParams(
            message.parameters
          )}`
        }

        if (options.highlightSql) {
          sql = PlatformTools.highlightSql(sql)
        }

        message.message = sql;
      }
      
      if (options.addColonToPrefix && message.prefix) {
        message.prefix += ":"
      }
    }

    return messages as LogMessage[]
  }

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular and there for we are handle this case too.
   */
  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters)
    } catch (err) {
      // most probably circular objects in parameters
      return parameters
    }
  }
}