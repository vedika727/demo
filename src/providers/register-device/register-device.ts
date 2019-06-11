import { PushNotificationService } from './../firebase-service/push-notification-service';
import { DeviceInfoServiceProvider } from "./../deviceInfo-service/deviceInfo-service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpServiceProvider } from "../data-service/http-service";
import { Device } from "@ionic-native/device";
import { DeviceRegistration } from "../../common/models/device-registration.class";
import { Platform } from "ionic-angular";
import { routes } from "../../common/constants/http-routes/routes.const";
import { CacheServiceProvider } from "../ion-service/cache-service";
import { HeaderServiceProvider } from "../interceptor/header-service";
import { LogServiceProvider } from "../data-service/log-service";

/*
  Generated class for the RegisterDeviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterDeviceProvider {
  deviceInfo: DeviceRegistration = new DeviceRegistration();
  pushId:any;

  constructor(
    private cacheService: CacheServiceProvider,
    public http: HttpClient,
    private httpService: HttpServiceProvider,
    private deviceInfoService: DeviceInfoServiceProvider,
    private headerService: HeaderServiceProvider,
    private platform: Platform,
    private logger: LogServiceProvider,
    public pushNotificationService:PushNotificationService
  ) {

  }

  registerDeviceInfo() {
    return new Promise((resolve, reject) => {
      this.deviceInfoService.getCarrierInfo().then(
        (res: any) => {
        // serial number for android and UUID for ios
          this.deviceInfo.deviceId = this.deviceInfoService.isAndroid() ? this.deviceInfoService.getSerialNumber():this.deviceInfoService.getDeviceUIID();
        // get platform name
          this.deviceInfo.os = this.deviceInfoService.getPlatform();
        // serial numeber for android and UUID for ios
          this.deviceInfo.hardwareId = this.deviceInfoService.isAndroid() ? this.deviceInfoService.getSerialNumber():this.deviceInfoService.getDeviceUIID() ;
        //  model number
          this.deviceInfo.model = this.deviceInfoService.getmodelNumber();
        // OS version of device
          this.deviceInfo.osVersion = this.deviceInfoService.getmodelversion();
        // returning imei for android and UUID for ios
          this.deviceInfo.IMEI = this.deviceInfoService.isAndroid() ? (res.deviceId ? res.deviceId:this.deviceInfoService.getDeviceUIID() ): this.deviceInfoService.getDeviceUIID() ;
        //  return device type
          this.deviceInfo.type = this.deviceInfoService.getPlatform();
          
          this.deviceInfo.awsNotificationToken = "aws::werwer:werwerwer:werwerwer";
         
          this.deviceInfo.status = "APPROVED";
        // return userAgent 
          this.deviceInfo.userAgent = this.deviceInfoService.getUserAgent();
          
          this.deviceInfo.numberOfSimSlot = this.deviceInfoService.isAndroid() ? ( res.cards ? ''+res.cards.length:'0') : "1" ;
          // returning temp promise need to change
          this.deviceInfoService.getPushPromise().then((res)=>{
          this.deviceInfo.pushId = res;
          this.deviceInfoService.simInfo = res;
          this.deviceInfoService.deviceInfo = this.deviceInfo;
          this.cacheService.setCache('deviceInfo',this.deviceInfo);
          this.cacheService.setCache('simInfo',res);
          resolve(this.deviceInfo);
        },err=>{
          console.log('push not found -', err);
        });
        },
        err => {
          this.logger.log("err in info", err);
          reject(err);
        }
      );
    });
  }

  isDeviceRegistered(deviceInfo) {
    this.logger.log("device information:", JSON.stringify(deviceInfo));
    return new Promise((resolve, reject) => {
      // url and header comes from routes constants
      this.httpService
        .httpPost(
          routes.registerDevice.url,
          deviceInfo
        )
        .then(
          res => {
            resolve(res);
            this.logger.log("registered device:", res);
          },
          err => {
            this.logger.log("Error Occured in register device service", err);
            reject(err);
          }
        )
        .catch(res => {
          this.logger.log("is registered catch block", res);
        });
    });
  }

  checkDeviceType() {
    if (this.deviceInfo.devicePlatform == "Android") {
      this.deviceInfo.deviceType = "ANDROID";
    } else {
      this.deviceInfo.deviceType = "IOS";
    }
  }

  getPushID() {
      return this.deviceInfoService.getPushId();

  }

}
