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

/**
 * @author Sumit Lokhande
 * @description This file contains services related to my-account page
 */

@Injectable()
export class MyAccountServiceProvider extends BaseApiService {
  subUrl: string;
  urm: {};

  constructor( public file: File,
    private httpService: HttpServiceProvider,
    public cacheService: CacheServiceProvider,
    private logger: LogServiceProvider,
    public popoverCtrl: PopoverController,
    private deviceInfoService: DeviceInfoServiceProvider,
    private platform:Platform,http: HttpClient, httpErrorHandler: HttpErrorHandler
  ) {
    super(http, httpErrorHandler);
    this.OPERATION = "LOGIN_SERVICE";
    this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res) => {
      this.urm = res;
      console.log("this.urm",this.urm)
    })
  }


  updateEmail(emailID) {
    let body = {
      email: emailID
    };
    this.logger.log(body, "update email body");
    return new Promise((resolve, reject) => {
      this.httpService
        .httpPut(routes.changeEmail.url, body)
        .then(
          (res: CustomHttpResponse) => {
            this.logger.log("updateEmail res ", res);
            resolve(res.result);
          },
          err => {
             ;
            this.logger.log("updateEmail err", err);
            reject(err);
          }
        );
    });
  }
  
  
    getSettings(serviceResponse: IServiceResponse<any> ,urm) {
      const customerId=urm;
      this.setNetworkOperation(serviceResponse, "GET_SETTINGS");
      let headers = {};
      headers["Authorization"] = this.deviceInfoService.getBearer();
      this.get(routes.getSettings.url+customerId, serviceResponse,headers);
  
    }
  
    setSettings(serviceResponse: IServiceResponse<any>, settingsData) {
      this.setNetworkOperation(serviceResponse, "SET_SETTINGS");
      // let pushID= this.deviceInfoService.getPushId()
      let headers = {};
      headers["Authorization"] = this.deviceInfoService.getBearer();
      this.post(routes.setSettings.url, serviceResponse, settingsData, headers);
  
    }
  
    sendFeedback(serviceResponse: IServiceResponse<any>, feedbackData,token) {
      this.setNetworkOperation(serviceResponse, "POST_FEEDBACK");
      // let pushID= this.deviceInfoService.getPushId()
      let headers = {};
      if(token){
        headers["Authorization"] = token;
      }
      else{
        headers["Authorization"] = this.deviceInfoService.getBearer();
      }
      console.log(headers,"sendFeedback header"); 
      this.post(routes.sendFeedback.url, serviceResponse, feedbackData, headers);
  
    }
  
    eLetterConsent(serviceResponse: IServiceResponse<any>, eLetterConsentData) {
      this.setNetworkOperation(serviceResponse, "E_LETTER_CONSENT");
      // let pushID= this.deviceInfoService.getPushId()
      let headers = {};
      headers["Authorization"] = this.deviceInfoService.getBearer();
      console.log(headers,"eLetterConsent header"); 
      this.post(routes.eLetterConsent.url, serviceResponse, eLetterConsentData, headers);
  
    }
    eLetterTandC(serviceResponse: IServiceResponse<any>) {
      this.setNetworkOperation(serviceResponse, "GET_E_LETTER_T&C");
      this.get(routes.getTermsAndConditionsConsent.url, serviceResponse);
  
    }
    prospectCustomer(serviceResponse: IServiceResponse<any>, prospectCustomerData) {
      this.setNetworkOperation(serviceResponse, "PROSPECT_CUSTOMER");
      // let pushID= this.deviceInfoService.getPushId()
      let headers = {};
      headers["Authorization"] = this.deviceInfoService.getBearer();
      console.log(headers,"prospectCustomer header"); 
      this.post(routes.prospectCustomer.url, serviceResponse, prospectCustomerData, headers);
  
    }
  
}