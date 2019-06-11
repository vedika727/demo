
// import { ENV } from  '@app/env';  
import { Injectable } from '@angular/core';
import { Sim } from '@ionic-native/sim';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { BatteryStatus } from '@ionic-native/battery-status';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Globalization } from '@ionic-native/globalization';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { ENV } from '../../environments/environment';

/**
 * @author - Sandesh Uttarwar & Keyur Joshi
 * @description - This Provider gives all headers 
 */


@Injectable()
export class HeaderServiceProvider {
  head = new Head();
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
  ) { }

  /** 
   * set the connection type
  */
  getConnectionType() {
    console.log('network Type - ', this.network.type);
    this.head.connection = this.network.type;
  }

  /** 
   * This method will set the package name 
  */
  getPackageName() {
    console.log('getPackageName');
    this.appVersion.getPackageName().then(
      res => {
        console.log('get package name - ', res);
        this.head.packageName = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  /** 
   * @return battery status
  */
  getBatteryStatus() {
    let subscription = this.batteryStatus.onChange().subscribe(res => {
      console.log('battery level - ', res.level);
      subscription.unsubscribe();
      this.head.batteryLevel = res.level;
    });
  }

   /** 
   * @return User Agent
  */
  getUserAgent() {
    console.log('userAgent - ', this.platform.userAgent());
    this.head.userAgent = this.platform.userAgent();
    return this.head.userAgent ;
  }

   /** 
   * @return Devices UIID
  */
  getDeviceUIID() {
    console.log('Device UUID is: ' + this.device.uuid);
    this.head.buildUuid = this.device.uuid;
    return this.device.uuid;
  }

   /** 
   * @return Environment of current build
  */
  getEnvironment() {
    console.log('environment - ', ENV.mode);
    this.head.environment = ENV.mode;
  }

   /** 
   * @return Carrier realted info
  */
  getCarrierInfo() {
    this.sim.getSimInfo().then(res => {
      console.log('sim info - ', res);
      return res;
    });
  }

   /** 
   * @return Domain name respective to environment
  */
  getDomain() {
    console.log('domain - ', ENV.apiEndPoint);
    this.head.domain = ENV.apiEndPoint;
  }

 /** 
   * @return Locale
  */
  getLocale() {
    this.globalization.getLocaleName().then(res => {
      console.log('locale - ', res);
      this.head.locale = res;
    });
  }

   /** 
   * @return Free space in mobile
  */
  // getFreeSpaceInfo() {
  //   this.fileCtrl.getFreeDiskSpace().then(res => {
  //     console.log('Free Space - ', res);
  //     this.head.freeMemory = res;
  //   });
  // }

   /** 
   * @return platform android / ios
  */
  getPlatform() {
    console.log('OS type - ', this.device.platform);
    console.log('platform useragent - ', this.platform.userAgent());
    this.head.platform = this.device.platform;
    return this.device.platform;
  }

  getSerialNumber(){
    console.log('App serial - ', this.device.serial);
    return this.device.serial;
  }

  getmodelNumber(){
    console.log('App model - ', this.device.model);
    return this.device.model;
  }
  getmodelversion(){
    console.log('App model version- ', this.device.version);
    return this.device.version;
  }
   /** 
   * @return application version
  */
  getAppVersionNumber() {
    this.appVersion.getVersionNumber().then(res => {
      console.log('App version - ', res);
      this.head.appVersionCode = res;
    });
  }

   /** 
   * @return platform version
  */
  getPlatformVersion() {
    console.log('platform version - ', this.platform.version());
    this.head.osVersion = this.platform.version();
  }

   /** 
   * @return Location related info
  */
  getGeolocation() {
    this.geolocation
      .getCurrentPosition()
      .then(res => {
        console.log('Locations is - ', res);
        this.head.gpsStatus = true;
        this.head.gpsLat = res.coords.latitude;
        this.head.gpsLng = res.coords.longitude;
        this.head.gpsAcc - res.coords.accuracy;
      })
      .catch(error => {
        console.log('Error getting location', error);
      });
  }

   /** 
   * @return root status
  */
  getRootStatus() {
    if (this.device.platform == 'Android') {
      this.diagnostic.isDeviceRooted().then(res => {
        console.log('Rooted status - ', res); ``
        this.head.isRooted = res;
      });
    } else {

    }
  }

   /** 
   * @return running state foreground/background
  */
  getAppRunningState() {
    console.log('getAppRunningState')
    this.platform.pause.subscribe(res => {
      console.log('app pause', res);
    });

    this.platform.resume.subscribe(res => {
      console.log('app resume', res);
    })
  }

   /** 
   * This method will call all the methods asyncronously
  */
  async getAllHeaders() {
    await this.getBatteryStatus();
    await this.getConnectionType();
    await this.getUserAgent();
    await this.getDeviceUIID();
    await this.getPackageName();
    await this.getEnvironment();
    await this.getCarrierInfo();
    await this.getDomain();
    await this.getLocale();
    // await this.getFreeSpaceInfo();
    await this.getAppVersionNumber();
    await this.getPlatform();
    await this.getPlatformVersion();
    await this.getGeolocation();
    await this.getRootStatus();
    await this.getAppRunningState();
  }

  /**
   * @returns all Head object
   */
  getHead() {
    this.getAllHeaders();
    return this.head;
  }
}

export class Head {
  environment: any;
  appRunningState: any = '';
  appVersionCode: any;
  appVersionName: any;
  architecture: any = '';
  batteryLevel: any;
  buildUuid: any;
  carrier: any;
  connection: any;
  domain: any;
  freeMemory: any;
  gpsAcc: any;
  gpsLat: any;
  gpsLng: any;
  gpsStatus: any;
  locale: any;
  osVersion: any;
  packageName: any;
  platform: any;
  isRooted: any;
  userAgent: any;
}
