import { RequestMethod, RequestOptions } from '@angular/http';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpErrorHandler } from './http-error-handler.service';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { BaseModel } from '../../common/service-models/base.model';
import { BaseApp } from '../../app/base';
import { ENV} from '../../environments/environment';


const IBM_TOKEN: string = ENV.GenericIBMClientID;

const BASE_URL:string = ENV.apiEndPoint


export class BaseApiService extends BaseApp {
    protected OPERATION: string;


    protected httpErrorHandler: HttpErrorHandler
    constructor(protected http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        super();
        this.httpErrorHandler = httpErrorHandler;
    }

    setNetworkOperation(serviceResponse: IServiceResponse<any>, serviceId: string) {
        serviceResponse.operation = this.OPERATION;
        serviceResponse.serviceID = serviceId;
    }


    isValidateData(data:any):boolean{
        return data?true:false
    }


    protected post<T>(url: string = "", serviceResponse: IServiceResponse<T> = null, requestBody?: T, headers?:any){
         this.serviceCall(RequestMethod.Post, url, serviceResponse, requestBody, headers).subscribe(data=>{
            this.sendResponseOnSuccess(data, serviceResponse);
         })
    }
    protected put<T>(url: string = "", serviceResponse: IServiceResponse<T> = null, requestBody?: T, headers?:any) {
        this.serviceCall(RequestMethod.Put, url, serviceResponse, requestBody, headers).subscribe(data=>{
            this.sendResponseOnSuccess(data, serviceResponse);
         })
    }

    protected get<T>(url: string = "", serviceResponse: IServiceResponse<T> = null, headers?:any) {
     this.serviceCall(RequestMethod.Get, url, serviceResponse, null, headers).subscribe(data=>{
            this.sendResponseOnSuccess(data, serviceResponse);
         })
    }


    protected serviceCall<T extends BaseModel>(method: RequestMethod, url: string = "", serviceResponse: IServiceResponse<T> = null, requestBody?: any, headers?:any): Observable<T> {
        serviceResponse.progress(true);
        
        let handleErrorr = this.httpErrorHandler.createHandleError(serviceResponse);
        return this.getHttpClient(method, url, requestBody, headers)

            .pipe(
                //map((res: T) => res),
                catchError(handleErrorr(requestBody)),
                finalize( () => {
                    serviceResponse.progress(false);
                })
                
            );

    }


    private getHttpClient<T>(method: RequestMethod = RequestMethod.Get, url: string = "", requestBody?: T, headers?:any) {

        let finalUrl=BASE_URL+url;
        let options  = this.generateHeader(headers);
        // 
        switch (method) {
            case RequestMethod.Post: {
                return this.http.post<T>(finalUrl, requestBody,{ headers :options})
            }
            case RequestMethod.Put: {
                return this.http.put<T>(finalUrl, requestBody, { headers :options})
            }
            default: {
                return this.http.get<T>(finalUrl, { headers :options})
            }

        }


    }

    protected generateHeader(header?) {
        let httpConfig: any = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-IBM-Client-Id': ENV.GenericIBMClientID,
            "X-DEVICE-ID": "bc9135d238d86d79"
        };
        
        // TODO
        // if(this.appInit.getBearer()){
        //   httpConfig["Authorization"] = this.appInit.getBearer();
        // }
        if (header) {
          Object.assign(httpConfig, header);
        }

        return new HttpHeaders(httpConfig)
        
      }



      protected sendResponseOnSuccess(data:any, serviceResponse:IServiceResponse<any>){
          // 
          //serviceResponse.progress(false);
        if(!this.isEmptyObject(data)){
            
            serviceResponse.success(data);
        }
      }


      private isEmptyObject(obj) {
        return (obj && (Object.keys(obj).length === 0));
      }
}


