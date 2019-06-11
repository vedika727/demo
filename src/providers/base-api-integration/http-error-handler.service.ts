
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';


import { Observable } from 'rxjs';
import { of } from 'rxjs/Observable/of'

import { ErrorService } from './error.service';
import { Events } from 'ionic-angular';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';

import {TranslateService} from 'ng2-translate';

export type HandleError = <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;
const KEY_UNKNOWN_SERVICE_ID = "NetWorkServiceIDUnDefined";
const KEY_UNKNOWN_OPERATION = "NetWorkService";
/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {

  errors:any;

  constructor(public events: Events, public translate:TranslateService) {
   }

  /** Create handleError function that already knows the service name */
  createHandleError = ( serviceResponse) => <T>
    (operation = 'operation', result = {} as T) => this.handleError(result, serviceResponse);

  /**
   * @param serviceName: name of the data service
   * @param operation: name of the failed operation
   * @param result: optional value to return as the observable result
   */
  handleError<T>(result = {} as T, serviceResponse: IServiceResponse<T>) {

    return (error: HttpErrorResponse): Observable<T> => {

      // Todo -> Transforming error for user consumption
      this.parseError(error, serviceResponse.serviceID?serviceResponse.serviceID: KEY_UNKNOWN_SERVICE_ID, serviceResponse.operation?serviceResponse.operation:KEY_UNKNOWN_OPERATION, serviceResponse);
      
      return of(result);
    };
  }

  parseError <T>(error: HttpErrorResponse, serviceName = '', operation = 'operation', serviceResponse: IServiceResponse<T>) {
    let errorService: ErrorService = new ErrorService();
    errorService.httpStatus = error.status;
    errorService.requestUrl = error.url;
    errorService.errorMessage = error.message;
    errorService.errorOperation = operation;
    errorService.serviceName = serviceName;
    
    this.errors=this.translate.instant('errors');
    
    switch (error.status) {
      
      case 0: {
        errorService.responseTitle = "No Internet";
        errorService.resonseErrorMessage = `No Internet connection`;
      }
      break;
      case HttpStatus.UNAUTHORIZED:
      case HttpStatus.FORBIDDEN:
        {
          errorService.responseTitle = "Ohho!!!";
          errorService.resonseErrorMessage = "You have been logged out. Please login again";
          // ;
          //serviceResponse.progress(false);
          serviceResponse.fail(errorService);
          // publishing event to logout user from the system
          //TODO clear token value from the cache here only.
          //TODO Subscribe same event in the App.Component.ts to set LoginPage as root.
          this.events.publish('user:logout', "SESSION TIME_OUT");
          return errorService;
        }
        
      case HttpStatus.BAD_REQUEST:
        {
          // 
          try{
          errorService.responseTitle = this.errors.errorTitles.oops;
          errorService.errorCode = error.error.status.code;
          errorService.resonseErrorMessage = error.error.status.message;
          errorService.requestUrl = error.error.status.details;
          }catch(e){
            console.log('catch in error',e);
          }
          finally{
            //serviceResponse.progress(false);
            serviceResponse.fail(errorService);
          }
          // ;
          
          
          return errorService;
        }
        
      case HttpStatus.INTERNAL_SERVER_ERROR: {
        errorService.responseTitle = this.errors.errorTitles.oops;
        errorService.resonseErrorMessage = `Internal Server Error\n ${serviceName} -> ${operation}\nURL: ${error.url}`;
      }
      break;
      default: {
        errorService.responseTitle = this.errors.errorTitles.oops;
        errorService.resonseErrorMessage = this.errors.errorMessages.canNotConnectToSystem;
        //`Something Went Wrong.\n Unknown Error Occured\n${serviceName} -> ${operation}\nURL: ${error.url}`;
      }
    }
    // ;
    //serviceResponse.progress(false);
    serviceResponse.systemFailure(errorService);
    return errorService;
  }
}