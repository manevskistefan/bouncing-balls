/**
 * Utility class for logging the messages for each log level.
 */
export class Logger {
    static info(msg: any)   { console.log(msg); }
    
    static error(msg: any) { console.error(msg); }
    
    static warn(msg: any)  { console.warn(msg); }
  }