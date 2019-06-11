import { Injectable } from '@angular/core';

@Injectable()
export class ErrorService {
  errorCode: string = "";
  errorMessage: string = "";
  errorOperation: string = "";
  httpStatus:number=0;
  resonseErrorMessage:string="";
  requestUrl:string = "";
  responseTitle:string = "";
  serviceName:string = "";
  
  constructor() { 
      
  }
}
