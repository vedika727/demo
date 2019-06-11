import { IServiceResponse } from './../../../common/service-models/iServiceResponse';
import { BaseApiService } from './../../base-api-integration/baseapi.service';
import { HttpErrorHandler } from './../../base-api-integration/http-error-handler.service';
import { HttpClient } from '@angular/common/http';
import { CustomHttpResponse } from "./../../../common/models/response.class";
import { Injectable } from "@angular/core";
import { File } from '@ionic-native/file';
import { CacheServiceProvider } from "../../ion-service/cache-service";
import { HttpServiceProvider } from "../../../providers/data-service/http-service";
import { LogServiceProvider } from "../../../providers/data-service/log-service";
import { routes } from "../../../common/constants/http-routes/routes.const";
import { PopoverController } from "ionic-angular";
import { DeviceInfoServiceProvider } from '../../deviceInfo-service/deviceInfo-service';
import { BaseApp } from '../../../app/base';
import { Platform } from 'ionic-angular';

@Injectable()
export class LoginServivceProvider extends BaseApiService {
  public isLoggedIn: boolean;
  isRegistered: boolean;
  userProfile: any;
  isRegisteredWithFb: boolean;
  profilePic: string;
  tabBarHeight: number;
  subUrl: string;
  deviceInfo: any = {};
  customerInfo: any = {
    "dateOfBirth": "",
    "email": "",
    "firstName": "",
    "lastName": "",
    "customerAddresses": [{ address: "" }],
    "customerContacts": [{ phone: "" }],
    "emailVerify": ""
  };
  isSCBCustomer: boolean;
  email: string;
  customerId: any;

  constructor(
    public file: File,
    private httpService: HttpServiceProvider,
    public cacheService: CacheServiceProvider,
    private logger: LogServiceProvider,
    public popoverCtrl: PopoverController,
    private deviceInfoService: DeviceInfoServiceProvider,
    private platform: Platform, http: HttpClient, httpErrorHandler: HttpErrorHandler
  ) {
    super(http, httpErrorHandler);
    this.OPERATION = "LOGIN_SERVICE";
  }

  // below code require in hambgermenu list menu page
  setRequireData(res) {
    // this.isLoggedIn = true;  // this flag is set in method  when user validate with pin or Bio
    this.isSCBCustomer = res.isScblifeCustomer;
    console.log(res, "response in loginservice setRequireData ##sumit 2###")
    this.customerInfo = res;
    this.email = res.email;
  }

  setProfilePic(pic) {
    this.cacheService.setCache(this.CONSTANT.KEY_PROFILE_PIC, pic);
  }

  getProfilePic() {
    let fileName = "scb_profile.jpg";
    this.platform.ready().then(() => {
      if (this.platform.is("ios")) {
        this.file.readAsDataURL(this.file.documentsDirectory, fileName).then(
          (image) => {
            this.profilePic = image;
          },
          (err) => {
            this.profilePic = "assets/scbl-icons/default-profile-picture.png";
          });
      }
      if (this.platform.is("android")) {
        this.file.readAsDataURL(this.file.dataDirectory, fileName).then(
          (image) => {
            this.profilePic = image;
          },
          (err) => {
            this.profilePic = "assets/scbl-icons/default-profile-picture.png";
          });
      }
    });

  }

  getPushID() {
    // this.deviceInfo.pushId = this.pushNotification.deviceToken;
    return this.deviceInfoService.getPushId();
  }




  getPhoneNumber(ogetPhoneConfig: any) {
    return new Promise((resolve, reject) => {
      var body = {
        customerIdentity: ogetPhoneConfig.customerId,
        pushId: this.deviceInfoService.getPushId()
      };
      switch (ogetPhoneConfig.flow) {
        case "registration":
          body["email"] = ogetPhoneConfig.email;
          this.getPhones(body).then((res: any) => {
            console.log('get phone from service -----', res);
            resolve(res);
          }, (err: any) => {
            reject(err);
          })
          break;
        case "forgotPin":
          // need to get email from cache
          this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res: any) => {
            body["email"] = res.email;
            this.getPhones(body).then((res: any) => {
              resolve(res);
            }, (err: any) => {
              reject(err);
            });
          }, (err) => {
            reject(err);
          })
          break;
        default:
          break;
      }
    })
  }
  /**
   * @description - this method is for get phone number of thai id calls from register page and login (forgot page)
   * 
   */

  private getPhones(body) {
    return new Promise((resolve, reject) => {
      this.httpService
        .httpPost(routes.getPhoneNumber.url, body)
        .then(
          (res: CustomHttpResponse) => {
            let response;
            if (res.hasOwnProperty("result")) {
              response = res.result;
            } else {
              response = res.status;
            }
            resolve(response);
          },
          err => {
            ;
            this.logger.log("Error in get phone number", err);
            if (err.status == 0) {
              reject(err);
            } else {
              reject(err.error.status);
            }
          }
        );
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.logout.url).then(
        (res: CustomHttpResponse) => {
          this.logger.log("logout res ", res);
          resolve(res.result);
        },
        err => {
          this.logger.log("logout err", err);
          reject(err);
        }
      );
    });
  }


  lockUser() {
    let currentTime = new Date().getTime();
    let timer24 = currentTime + 86400000;
    this.cacheService.setCache(this.CONSTANT.KEY_LOCKING_TIME, timer24);
  }
  timeConversion(millisec) {
    let seconds: any = (millisec / 1000).toFixed(0);
    let minutes: any = (millisec / (1000 * 60)).toFixed(0);
    let hours: any = (millisec / (1000 * 60 * 60)).toFixed(0);
    let days: any = (millisec / (1000 * 60 * 60 * 24)).toFixed(0);
    if (seconds < 60) {
      this.logger.log("Seconds");
      return seconds + " Sec";
    } else if (minutes < 60) {
      this.logger.log("Minutes");
      return minutes + " Min";
    } else if (hours < 25) {
      this.logger.log("Hours");
      return hours + " Hrs";
    } else {
      this.logger.log("Days");
      return days + " Days"
    }
  }
}
