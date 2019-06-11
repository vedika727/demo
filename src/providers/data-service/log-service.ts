import { Injectable } from "@angular/core";

/**
 * @author Sandesh Uttarwar
 * @description All the log will be generated using this class
 */
@Injectable()
export class LogServiceProvider {
  constructor() {
    console.log("Hello LogServiceProvider Provider");
  }

  /**
   *
   * @param message {string}
   * @param optionalParams {object / string}
   */
  log(message: any, optionalParams?:any) {
    if (optionalParams) {
      console.log(message, optionalParams);
    } else {
      console.log(message);
    }
  }

  /**
   * @param message {string}
   * @param optionalParams {object / string}
   */
  warn(message: any, ...optionalParams: any[]) {
    if (optionalParams.length != 0) {
      console.warn(message, optionalParams);
    } else {
      console.warn(message);
    }
  }

  /**
   * @param message {string}
   * @param optionalParams {object / string}
   */
  error(message: any, ...optionalParams: any[]) {
    if (optionalParams.length != 0) {
      console.error(message, optionalParams);
    } else {
      console.error(message);
    }
  }

  /**
   * @param message {string}
   * @param optionalParams {object / string}
   */
  trace(message: any, ...optionalParams: any[]) {
    if (optionalParams.length != 0) {
      console.trace(message, optionalParams);
    } else {
      console.trace(message);
    }
  }

  /**
   * @param message {string}
   * @param optionalParams {object / string}
   */
  debug(message: any, ...optionalParams: any[]) {
    if (optionalParams.length != 0) {
      console.debug(message, optionalParams);
    } else {
      console.debug(message);
    }
  }
}
