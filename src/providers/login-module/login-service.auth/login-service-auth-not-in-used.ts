import { DeviceAlreadyRegisteredPromptPage } from './../../../pages/pages';
import { ModalServiceProvider } from './../../modal-service/modal-service';
import { Status } from './../../../common/models/response.class';
import { DeviceInfoServiceProvider } from './../../deviceInfo-service/deviceInfo-service';
import { Injectable } from "@angular/core";
import { HttpServiceProvider } from "../../../providers/data-service/http-service";
import { routes } from "../../../common/constants/http-routes/routes.const";
import { PreAuthServivceProvider } from '../../preauth-service/preauth-service';
import { ISprintService } from '../../isprint-service/isprint';
import { encrytionType, loginModuleType } from '../../../common/constants/config';
import { CacheServiceProvider } from "../../ion-service/cache-service";
import { CustomHttpResponse } from 'common/models/response.class';
import { LogServiceProvider } from "../../../providers/data-service/log-service";
import { BaseApp } from '../../../app/base';
import { ENV } from '../../../environments/environment';

@Injectable()
export class LoginServivceAuthProvider extends BaseApp {
  isSCBcustomer: any;

  constructor(
    private httpService: HttpServiceProvider,
    private preauthService: PreAuthServivceProvider,
    private iSprint: ISprintService,
    private cacheService: CacheServiceProvider,
    private logger: LogServiceProvider,
    private deviceInfoService: DeviceInfoServiceProvider,
    private modalService: ModalServiceProvider
  ) {
    super();
  }

  authenticateUser(pinCode, authType) {
    return new Promise((resolve, reject) => {
      this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res: any) => {
        this.generateAuthRequest(res, pinCode, authType).then(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
      }, (err) => {
        this.logger.log('err', err);
      });
    });
  }

  generateAuthRequest(res, pinCode, authType) {
    this.isSCBcustomer = res.isScblifeCustomer;
    return new Promise((resolve, reject) => {
      this.preauthService.getpreAuthData(authType).then((data: any) => {
        let pk = data.params.pubKey;
        let serverRandom = data.params.serverRandom;
        var chalengeToken = data.challengeToken;
        let e2ssid = data.params.e2eeSid;
        var authDetails = {
          "challengeToken": chalengeToken,
          "realmId": loginModuleType[authType]
        };
        // Pin is available for both non and scb customer to login ..
        if (authType == "PIN") {
          this.getEncrytedText(e2ssid, pk, serverRandom, pinCode, encrytionType).then((password: any) => {
            authDetails["password"] = password;
            this.getUserNameAndAuth(authDetails).then((res: any) => {
              resolve(res);
            }, (error) => {
              reject(error);
            });
          }, error => {
            reject(error);
          });
        } else {
          this.getCacheValue().then((response: any) => {
            console.log("login random num pass", response);
            this.getEncrytedText(e2ssid, pk, serverRandom, response, encrytionType).then((password: any) => {
              authDetails["password"] = password;
              this.getUserNameAndAuth(authDetails).then((res: any) => {
                resolve(res);
              }, (error) => {
                reject(error);
              });
            }, error => {
              reject(error);
            });
          }, error => {
            reject(error);
          });
        }
      });
    });
  }

  getUserNameAndAuth(authDetails) {
    return new Promise((resolve, reject) => {
      authDetails["username"] = this.deviceInfoService.getDeviceID();
      this.validateUserWith(authDetails).then((data: any) => {
        this.cacheService.setCache(this.CONSTANT.KEY_URM_ID, data.result.urmid);
        this.CONSTANT.URM_ID = data.result.urmid;
        this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res) => {
          console.log('URM Id >>>>> ', res);
        }, (err) => {
          console.log('DIDNT GET urmid in fitsense API', err);
        })
        resolve(data.result.access_token);
      }, (error) => {
        this.logger.log('didnt get urm1');
        reject(false);
      });
    });
  }

  private getCacheValue() {
    return this.cacheService.getCache(this.CONSTANT.DEVICEID_AND_RANDOM_SIX_DIGIT_NUMBER);
  }

  getEncrytedText(e2ssid, pk, serverRandom, oldPlaintText, oaep_hash) {
    return this.iSprint.encryptPassword(e2ssid, pk, serverRandom, oldPlaintText, oaep_hash);
  }

  private validateUserWith(authDetails) {
    let headers = {};
    headers["oauth-client-id"] = ENV.oAuthClientID;
    headers["oauth-client-secret"] = ENV.oAuthClientSecret;
    var promise;
    try {
      promise = new Promise((resolve, reject) => {
        this.httpService.httpPost(routes.login.url, authDetails, headers).then((data: CustomHttpResponse) => {
          this.deviceInfoService.bearerToken = data.result.token_type + " " + data.result.access_token;
          this.logger.log('bearer token ', this.deviceInfoService.bearerToken);
          console.log('then block of httpService for login>>>');
          resolve(data);
        }, (error) => {
          console.log('error block of httpService for login>>>');
          this.logger.log('error in login - ', error);
          this.logger.log("error.error.status.code",error.error.status.code);
          //Condition to check if user has registered on new device and this device is no longer active
          if(error.error.status.code=="1012"){
            this.modalService.presentModal(DeviceAlreadyRegisteredPromptPage);
            console.log("User has been activated on a new device");
          }
          else{

          }
          reject(error);
        })
      });
    } catch (error) {
    } finally {
      return promise;
    }
  }
}

