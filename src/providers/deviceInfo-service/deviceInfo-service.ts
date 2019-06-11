
import { BaseApp } from './../../app/base';
import { CacheServiceProvider } from './../ion-service/cache-service';
import { Platform } from "ionic-angular";
import { Sim } from "@ionic-native/sim";
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import { AppVersion } from "@ionic-native/app-version";
import { Device } from "@ionic-native/device";
import { BatteryStatus } from "@ionic-native/battery-status";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Globalization } from "@ionic-native/globalization";
import { Geolocation } from '@ionic-native/geolocation';
import { PushNotificationService } from '../firebase-service/push-notification-service';
import { LogServiceProvider } from "../data-service/log-service";
let push:string="";
/**
 * @author Sandesh Uttarwar
 * @description To get all device information
 * console removed
*/
@Injectable()
export class DeviceInfoServiceProvider extends BaseApp{

  randomId: string;

  simInfo:any;
  deviceInfo:any;
  bearerToken :string;
  pushId:string;


  constructor(
    private network: Network,
    private sim: Sim,
    private appVersion: AppVersion,
    private device: Device,
    private batteryStatus: BatteryStatus,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private globalization: Globalization,
    private platform: Platform,
    private cacheService:CacheServiceProvider,
    private logger: LogServiceProvider,
    public pushNotificationService:PushNotificationService
  ) {
    super();
    this.logger.log("device info called");
    this.randomId = '' + this.randomDeviceId();
  }

  isAndroid():boolean{
    this.logger.log("is device android : ", this.platform.is("android"));
    return this.platform.is("android");
  }

  isDevice():boolean{
    this.logger.log("is device android : ", this.platform.platforms().indexOf("cordova") >= 0);
    return this.platform.platforms().indexOf("cordova") >= 0;
  }

  getDeviceUIID() {
    this.logger.log("Device UUID is: ", this.device.uuid);
    return this.device.uuid ? this.device.uuid : this.randomId;
  }

  getUserAgent() {
    this.logger.log("userAgent - ", this.platform.userAgent());
    return this.platform.userAgent();
  }

  getSerialNumber() {
    this.logger.log("serial number", this.device.serial);
    return this.device.serial;
  }

  getmodelNumber() {
    this.logger.log("device model", this.device.model);
    return this.device.model;
  }

  getmodelversion() {
    this.logger.log("device version", this.device.version);
    return this.device.version;
  }

  getPlatformVersion() {
    this.logger.log('platform version - ', this.platform.version());
    return this.platform.version();
  }

  /** 
  * get the connection type
 */
  getConnectionType() {
    this.logger.log('network Type - ', this.network.type);
    return this.network.type;
  }

  getPlatform() {
    this.logger.log('platform is - ', this.device.platform);
    return this.device.platform;
  }

  getDeviceID(){
    return this.isAndroid() ? this.getSerialNumber():this.getDeviceUIID();
  }

  getCarrierInfo() {
    return new Promise((resolve, reject) => {
      this.sim.getSimInfo().then(res => {
        this.logger.log('get carrier info - ', res);
        resolve(res);
      }, err => {
        reject(err);
      });
    })

  }

  isRunningOnDevice(): boolean {
    // // 
    let isAvailable: boolean = false;
    if (this.platform.platforms().indexOf('cordova') >= 0) {
      isAvailable = true;
    }
    console.log('physical device:=' + isAvailable);
    return isAvailable;
  }

  randomDeviceId() {
    // return "123213123";
    return Math.floor(100000 + Math.random() * 900000)
  }

  storeInfoInCahce(){

  }

  getPushPromise(){
    return new Promise((resolve, reject)=>{
      this.cacheService.getCache(this.CONSTANT.KEY_PUSH_TOKEN).then((res:string)=>{
      push = res;
        resolve(res);
      },err=>{
        reject(err);
      });
    });
  }
  
    getPushId(){
      console.log('push id is<<<< ',push);
     return push?push:this.CONSTANT.BROWSER_PUSH_ID;
  }

  getBearer():string{
    return this.bearerToken;
  }

}
