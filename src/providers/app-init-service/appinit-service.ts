import { CacheServiceProvider } from './../ion-service/cache-service';
import { DeviceInfoServiceProvider } from './../deviceInfo-service/deviceInfo-service';

import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseApiService } from "../base-api-integration/baseapi.service";
import { HttpErrorHandler } from "../base-api-integration/http-error-handler.service";
import { IServiceResponse } from "../../common/service-models/iServiceResponse";
import { routes } from '../../common/constants/http-routes/routes.const';

@Injectable()
export class AppInit extends BaseApiService {

  token: string;
  private deviceDetails: DeviceDetails = new DeviceDetails();

  constructor(http: HttpClient, httpErrorHandler: HttpErrorHandler, private platform: Platform,
    public deviceInfoService: DeviceInfoServiceProvider, public cache: CacheServiceProvider) {
    super(http, httpErrorHandler);
    this.OPERATION = "AppInit";
  }

  registerService(serviceResponse: IServiceResponse<any>) {
    this.setNetworkOperation(serviceResponse, "REGISTER_DEVICE");
    //   api for register device
    // this.getDeviceData();
    this.registerDeviceInfo().then((res) => {
      this.post(routes.registerDevice.url, serviceResponse, this.deviceDetails);
    });
  }

  identifyExistingCustomer(serviceResponse: IServiceResponse<any>, requestUrlType: string, isNewDevice: string, email: string, id: string) {
    this.setNetworkOperation(serviceResponse, "GET_PHONE_NUMBER");
    // this.cache.setCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER, true);
    let pushID = this.deviceInfoService.getPushId()
    let requestParams = { email: email, isNewDevice: isNewDevice, customerIdentity: id, pushId: pushID };
    this.post(routes.getPhoneNumber.url + requestUrlType, serviceResponse, requestParams);
  }

  registerDeviceInfo() {
    return new Promise((resolve, reject) => {
      this.deviceInfoService.getCarrierInfo().then(
        (res: any) => {
          // serial number for android and UUID for ios
          this.deviceDetails.deviceId = this.deviceInfoService.isAndroid() ? this.deviceInfoService.getSerialNumber() : this.deviceInfoService.getDeviceUIID();
          // get platform name
          this.deviceDetails.os = this.deviceInfoService.getPlatform();
          // serial numeber for android and UUID for ios
          this.deviceDetails.hardwareId = this.deviceInfoService.isAndroid() ? this.deviceInfoService.getSerialNumber() : this.deviceInfoService.getDeviceUIID();
          //  model number
          this.deviceDetails.model = this.deviceInfoService.getmodelNumber();
          // OS version of device
          this.deviceDetails.osVersion = this.deviceInfoService.getmodelversion();
          // returning imei for android and UUID for ios
          this.deviceDetails.IMEI = this.deviceInfoService.isAndroid() ? (res.deviceId ? res.deviceId : this.deviceInfoService.getDeviceUIID()) : this.deviceInfoService.getDeviceUIID();
          //  return device type
          this.deviceDetails.type = this.deviceInfoService.getPlatform();

          this.deviceDetails.awsNotificationToken = "aws::werwer:werwerwer:werwerwer";

          this.deviceDetails.status = "APPROVED";
          // return userAgent 
          this.deviceDetails.userAgent = this.deviceInfoService.getUserAgent();

          this.deviceDetails.numberOfSimSlot = this.deviceInfoService.isAndroid() ? (res.cards ? '' + res.cards.length : '0') : "1";
          // returning temp promise need to change
          this.deviceInfoService.getPushPromise().then((res) => {
            this.deviceDetails.pushId = <string>res;
            this.deviceInfoService.simInfo = res;
            this.deviceInfoService.deviceInfo = this.deviceDetails;
            // this.cacheService.setCache('deviceInfo',this.deviceInfo);
            // this.cacheService.setCache('simInfo',res);
            resolve(this.deviceDetails);
          }, err => {
            console.log('push not found -', err);
          });
        },
        err => {
          console.log("err in info", err);
          reject(err);
        }
      );
    });
  }

}

export class DeviceDetails {
  deviceId: string;
  pushId: string;
  awsNotificationToken: string;
  model: string;
  os: string;
  osVersion: string;
  type: string;
  status: string;
  hardwareId: string;
  userAgent: string;
  numberOfSimSlot: string;
  IMEI: string;
}
