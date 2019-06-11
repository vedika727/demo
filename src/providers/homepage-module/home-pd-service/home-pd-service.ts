import { DeviceInfoServiceProvider } from './../../deviceInfo-service/deviceInfo-service';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from './../../base-api-integration/baseapi.service';
import { LoginServivceAuthProvider } from './../../login-module/login-service.auth/login-service-auth';

import { Injectable } from '@angular/core';
import { HttpServiceProvider } from '../../data-service/http-service';
import { routes } from "../../../common/constants/http-routes/routes.const";
import { resolve, reject } from '../../../../node_modules/@types/q';
import { LoadingServiceProvider } from '../../ion-service/loading-service';
import { CustomHttpResponse } from '../../../common/models/response.class';
import { ClaimResponse } from '../../../common/models/claims-data.class';
import { CacheServiceProvider } from '../../ion-service/cache-service';
import { HttpErrorHandler } from '../../base-api-integration/http-error-handler.service';
import { IServiceResponse } from '../../../common/service-models/iServiceResponse';

/**
 * @author - Yashodhan Apte
 */

@Injectable()
export class HomePdServiceProvider extends BaseApiService {

  constructor(
    private httpService: HttpServiceProvider, private loadingService: LoadingServiceProvider,
    private cacheService: CacheServiceProvider,
    public loginAuthService: LoginServivceAuthProvider,
    http: HttpClient, httpErrorHandler: HttpErrorHandler,
    public deviceInfoService: DeviceInfoServiceProvider
  ) {
    super(http, httpErrorHandler);
    this.OPERATION = "HOME_PD_SERVICE";
    console.log('Hello home-pd-service Provider');
  }

  getDashboardData() {
    // this.loadingService.presentLoading();
    //  let headers = {
    //   Authorization : this.loginAuthService.getBearer()
    //  }
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getPolicyDashboardData.url).then((res: CustomHttpResponse) => {
        ;
        console.log("Success in policy dashboard", res);
        resolve(res.result);
      }, (err) => {
        console.log("Error in policy dashboard", err);
        reject(err.message);
      })
    });
  }
  getAccesstoken() {
    this.cacheService.getCache('RegisterData').then((res) => {
      console.log(res, 'fitsenseData:::::::::', typeof (res));
      return res;

    }, (err) => {
      console.log('getUrmid function gave error :::::::::', err);
    })
  }

  getPolicyByPolicyNumber(policynumber: any) {
    // let headers = {
    //   Authorization : this.loginAuthService.getBearer()
    //  }
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getPolicyByNumber.url + policynumber)
        .then((res: CustomHttpResponse) => {
          console.log("Success in policyByNumber dashboard", res);
          resolve(res.result);
        }, (err) => {
          console.log("Error in policyByNumber dashboard", err);
          reject(err.message);
        })
    });
  }
  getallPolicies() {
    // let headers = {
    //   Authorization : this.loginAuthService.getBearer()
    //  } 
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getPolicyList.url)
        .then((res: CustomHttpResponse) => {
          console.log("Success in policyByNumber dashboard", res);
          resolve(res.result);
        }, (err) => {
          console.log("Error in policyByNumber dashboard", err);
          reject(err.message);
        })
    });
  }
  // serviceResponse: IServiceResponse<any>
  getClaimsData() {
    return new Promise((resolve,reject)=>{
      this.httpService.httpGet(routes.getClaims.url)
      .then((res:any)=>{
        console.log('Success in getClaimsData ',res);
        resolve(res.result);
      },(err)=>{
        console.log('error in getClaimsData',err);
        reject(err);
      })
    });
    // let headers = routes.getClaims.header;
    // headers["Authorization"] = this.deviceInfoService.getBearer();
    // this.setNetworkOperation(serviceResponse, "GET_CLAIMS");
    // this.get(routes.getClaims.url, serviceResponse, headers);
  }
}
