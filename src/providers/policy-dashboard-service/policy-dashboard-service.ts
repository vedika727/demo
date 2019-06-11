
import { resolve, reject } from '../../../node_modules/@types/q';
import { CustomHttpResponse } from 'common/models/response.class';
import { HttpErrorHandler } from './../base-api-integration/http-error-handler.service';
import { BaseApiService } from './../base-api-integration/baseapi.service';
import { DeviceInfoServiceProvider } from './../deviceInfo-service/deviceInfo-service';
import { HttpServiceProvider } from './../data-service/http-service';
import { CacheServiceProvider } from './../ion-service/cache-service';
import { IServiceResponse } from './../../common/service-models/iServiceResponse';

import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { File } from '@ionic-native/file';
import { LogServiceProvider } from "./../../providers/data-service/log-service";
import { routes } from "./../../common/constants/http-routes/routes.const";
import { PopoverController } from "ionic-angular";
import { BaseApp } from './../../app/base';
import { Platform } from 'ionic-angular';

/*
  Generated class for the PolicyDashboardServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PolicyDashboardServiceProvider extends BaseApiService {

  constructor(
    private httpService:HttpServiceProvider,
    public file: File,
    public cacheService: CacheServiceProvider,
    private logger: LogServiceProvider,
    public popoverCtrl: PopoverController,
    private deviceInfoService: DeviceInfoServiceProvider,
    private platform:Platform,http: HttpClient, httpErrorHandler: HttpErrorHandler
  ) {
    super(http, httpErrorHandler);
    console.log('Hello PolicyDashboardServiceProvider Provider');
  }

  getPolicies(){
     return new Promise((resolve,reject)=>{
      this.httpService.httpGet(routes.getPolicyDashboardData.url).then((res:CustomHttpResponse)=>{
        console.log("Success in policy dashboard", res);
        resolve(res.result);
      },(err)=>{
        console.log("Error in policy dashboard", err);
        reject(err.message);
      })
    });
  }


   getPolicyByPolicyNumber(policynumber:any){
     return new Promise((resolve,reject)=>{
      this.httpService.httpGet(routes.getPolicyByNumber.url + policynumber)
      .then((res:CustomHttpResponse)=>{
        console.log("Success in policyByNumber dashboard", res);
        resolve(res.result);
      },(err)=>{
        console.log("Error in policyByNumber dashboard", err);
        reject(err.message);
 
      })
     });
   }

   // Document Download Service Integration
   downloadDocument(serviceResponse: IServiceResponse<any>, downloadDocumentData) {
    this.setNetworkOperation(serviceResponse, "DOWNLOAD_DOCUMENTS");
    // let pushID= this.deviceInfoService.getPushId()
    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.post(routes.documentDownload.url, serviceResponse, downloadDocumentData, headers);

  }

}
