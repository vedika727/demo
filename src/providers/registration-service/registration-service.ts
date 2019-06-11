import { Injectable } from "@angular/core";
import { PreAuthServivceProvider } from '../preauth-service/preauth-service';
import { HttpServiceProvider } from '../data-service/http-service';
import { VerifyPhonePage, SetPinPage, NoInternetPage } from "../../pages/pages";
import { ISprintService } from '../isprint-service/isprint';
import { CacheServiceProvider } from '../ion-service/cache-service';
import { encrytionType, loginModuleType } from '../../common/constants/config';
import { routes } from '../../common/constants/http-routes/routes.const';
import { DeviceInfoServiceProvider } from "../../providers/deviceInfo-service/deviceInfo-service";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { BaseApiService } from '../base-api-integration/baseapi.service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../base-api-integration/http-error-handler.service';
import { ModalServiceProvider } from '../modal-service/modal-service';
import { GlobalErrorProvider } from '../global-error-handler/global-error-handler';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { LoadingServiceProvider } from '../ion-service/loading-service';
import { ENV } from '../../environments/environment';
import { LoginServivceProvider } from '../login-module/login-service/login-service';
import { TranslateService } from 'ng2-translate';


@Injectable()
export class RegistrationServivceProvider extends BaseApiService {
  registrationData: any;
  public registerUserDetails: any;
  isScbLifeCust: boolean = false;
  loginModuleId: string;
  deviceId: any;
  randomNumber: any;
  stateConfig: any = {};
  itemNeedToStoreInCache: any = ["email", "isScblifeCustomer"];
  buttonDismissModal: boolean = false;
  pinServieResponseAutoLogin: any;
  getRegisterUserDetails: boolean = true;
  tryAgainMessage: any;

  constructor(private preauthService: PreAuthServivceProvider,
    private httpService: HttpServiceProvider,
    private iSprint: ISprintService,
    private cacheService: CacheServiceProvider,
    private errorHandler: GlobalErrorProvider,
    private logger: LogServiceProvider,
    private deviceInfoService: DeviceInfoServiceProvider,
    public http: HttpClient,
    public httpErrorHandler: HttpErrorHandler,
    private modalService: ModalServiceProvider,
    public loadingService: LoadingServiceProvider,
    public loginService: LoginServivceProvider,
    public translate: TranslateService,
  ) {
    super(http, httpErrorHandler);
    this.deviceId = this.deviceInfoService.getDeviceID();
    // try again message and ok message
    this.tryAgainMessage = this.translate.instant("errors.errorButtons.tryAgain");
  }

  getPhoneNumbersResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      let res = data.result
      console.log("getPhoneNumbers success : ", res);
      this.modalService.dismissModal();
      this.stateConfig.success && this.stateConfig.success.successGetPhones && this.stateConfig.success.successGetPhones(res);
    },
    fail: (errorService) => {
      console.log("getPhoneNumbers Response Error - ", errorService);
      this.modalService.dismissModal();
      this.errorHandler.handleError(errorService);
      this.stateConfig.fail && this.stateConfig.fail(errorService);
    },
    systemFailure: (errorService) => {
      console.log("getPhoneNumbers Error system ", errorService);
      if (errorService.httpStatus == 0) {
        this.modalService.presentModal(NoInternetPage, { 'data': this.genericActionRetry });
      }
    },
    progress: (isProgress) => {
      console.log("getPhoneNumbers Progress:", isProgress);
      this.loadingService.isLoading(isProgress);
    }
  }

  genericActionRetry = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      this.logger.debug("callback from retry");
      this.showGenericView = true;
      this.stateConfig.retryAction && this.stateConfig.retryAction.getPhonesRetry && this.stateConfig.retryAction.getPhonesRetry()
    }
  }


  /**
   * @param serviceResponse it has type IServiceResponse 
   * @param email  email id to get list of mobile number
   * @param id   thai id to get list of numbers
   */
  identifyExistingCustomer(serviceResponse: IServiceResponse<any>, requestUrlType: string, isNewDevice: string, id: string, email?: string) {
    this.setNetworkOperation(serviceResponse, "GET_PHONE_NUMBER");
    let pushID = this.deviceInfoService.getPushId()
    let requestParams = { isNewDevice: isNewDevice, customerIdentity: id, pushId: pushID };
    if (email) {
      requestParams["email"] = email;
    }
    this.post(routes.getPhoneNumber.url + requestUrlType, serviceResponse, requestParams);
    // this.post(routes.getPhoneNumber.url, serviceResponse, { email: email, customerIdentity: id, pushId: pushID }, routes.getPhoneNumber.header);
  }

  /**
   * @description - this method is for store user details in service object so that we can use it later process of registration.
   */
  verifyAndSetRegDetail(registerUserData: any) {
    this.registerUserDetails = registerUserData;
    if (this.registerUserDetails.existingCustomer == "Yes") {
      return { status: true, pageName: VerifyPhonePage };
    }
    else {
      return { status: false, pageName: SetPinPage };
    }
  }

  /**
   * @description - this method is for register customer update password with iSprint encryption call and 
   * according to state of authentication process user selected like wise login with pin or BIO or face
   *  the state will change and password will encryt according to the state selected..
   */

  registerProcessCompleted(userInfo: any) {
    let promise;
    try {
      promise = new Promise((resolve, reject) => {
        this.loginModuleId = "PIN";
        if (userInfo.hasOwnProperty("acceptFingerPrint")) {
          if (userInfo["acceptFingerPrint"] == "BIO") {
            this.loginModuleId = "BIO";
            //generate 6 digit random number, concat with device id and send it in this.getEncryptedText as userInfo.pinCode
            this.randomNumber = Math.floor(100000 + Math.random() * 900000);
            console.log(this.randomNumber, 'randomNumber');
            userInfo.pinCode = this.deviceId + this.randomNumber;
            console.log("reg random num pass", userInfo.pinCode);
            this.cacheService.setCache(this.CONSTANT.DEVICEID_AND_RANDOM_SIX_DIGIT_NUMBER, userInfo.pinCode);
            this.cacheService.setCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER, userInfo.isScblifeCustomer);
            console.log(userInfo.pinCode, 'pinCode when BIO>>>');
          }
        }
        this.preauthService.getpreAuthData(this.loginModuleId).then((data: any) => {
          let e2ssid = data.params.e2eeSid;
          let pk = data.params.pubKey;
          let serverRandom = data.params.serverRandom;
          let chalengeToken = data.challengeToken;
          // Registration user Details to register user
          this.registrationData = {
            "loginModuleId": loginModuleType[this.loginModuleId],
            "challengeToken": chalengeToken,
            "type": userInfo.type,
            "pushId": this.deviceInfoService.getPushId(),    //need to remove
            "policyNo": ""  //it is required for api integration
          };
          this.isScbLifeCust = userInfo.isSCBCustomer;
          this.registrationData["isScblifeCustomer"] = this.isScbLifeCust;
          if (userInfo.type == 'forgotPin') {
            // forgot pin flow
            this.registrationData["policyNo"] = ""
            this.registrationData["username"] = this.deviceId;
            this.getEncrytedText(e2ssid, pk, serverRandom, userInfo.pinCode, userInfo.pinCode, encrytionType).then((data: any) => {
              this.registrationData['password'] = data;
              this.regisrationCompleted(this.registrationData).then((data: any) => {
                if (data.result) {
                  debugger;
                  resolve(true);
                } else {
                  reject(false);
                }
              });
            }, error => {
              reject(error);
            })
          }
          else if (userInfo.type == 'registration') {
            let controlValue = this.registerUserDetails;
            console.log('registration details >>>>>>>>', this.registerUserDetails);
            this.registrationData["email"] = controlValue.email;
            if (this.isScbLifeCust) {
              this.registrationData["policyNo"] = "";
              this.registrationData['customerIdentity'] = controlValue['authenticationID'];
            }
            this.getEncrytedText(e2ssid, pk, serverRandom, userInfo.pinCode, userInfo.pinCode, encrytionType).then((data: any) => {
              this.registrationData['password'] = data;
              this.regisrationCompleted(this.registrationData).then((data: any) => {
                if (data.result) {
                  debugger
                  resolve(true);
                } else {
                  reject(false);
                }
              });
            }, error => {
              this.logger.log(error)
              reject(error);
            })
          }
        }, (error: any) => {
          reject(error);
        });
      });
    } catch (error) {
      this.logger.log(error);
      this.errorLog(error);
    } finally {
      return promise;
    }
  }

  /**
   * @description - this method is for encrypt password and return it.
   */
  getEncrytedText(e2ssid, pk, serverRandom, oldPlaintText, newPlaintText, oaep_hash) {
    let promise;
    try {
      promise = new Promise((resolve, reject) => {
        this.iSprint.encryptPassword(e2ssid, pk, serverRandom, oldPlaintText, oaep_hash).then((data: any) => {
          resolve(data);
        }, error => {
          reject(error);
          throw new Error(error);
        });
      })
    } catch (error) {
      this.errorLog(error);
    } finally {
      return promise;
    }

  }
  /**
   * @description - this method is for the user has successful completion of otp process encryption password
   *  and complete the journey of registration flow or forgot flow
   *  now avail to register. or update password. , final state of registration. or forgot password.
   * pinServieResponseAutoLogin this is set for auto login after registration completes need to fetch all user details
   * from pin service providing access_token
   */
  private regisrationCompleted(registrationData) {
    let headers = {};
    headers["oauth-client-id"] = ENV.oAuthClientID;
    headers["oauth-client-secret"] = ENV.oAuthClientSecret;

    return new Promise((resolve, reject) => {
      this.httpService.httpPost(routes.setPin.url, registrationData, headers).then((data: any) => {
        this.pinServieResponseAutoLogin = data;
        // is SCB customer and loggedinuser deatils set to cache..
        this.cacheService.setCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER, registrationData.isScblifeCustomer);
        console.log(registrationData.isScblifeCustomer, '111 isScblifeCustomer 111');
        this.CONSTANT.URM_ID = data.result.urmid;
        // updating cache
        this.updateCache(registrationData);
        this.cacheToken(data.result.token_type + " " + data.result.access_token);

        this.cacheService.setCache(this.CONSTANT.KEY_URM_ID, data.result.urmid);
        resolve(data);
      }, error => {
        reject(error);
      })
    })
  }

  updateCache(regDetails) {
    // reseting flag which was set during login 3 attempt block need to remove so hense set up as false
    this.cacheService.setCache(this.CONSTANT.KEY_LOGIN_IS_USER_LOCKED, false);
    this.cacheService.setCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED, true);
    this.cacheService.setCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED, false);
    this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((data: any) => {
      // if params contains the updated value which need to set in cache,
      // some of data may not availble in params so hense validating it with what it contains and what need to set.
      let registrtionDetails = {};
      for (let i = 0; i < this.itemNeedToStoreInCache.length; i++) {
        let key = this.itemNeedToStoreInCache[i];
        if (regDetails.hasOwnProperty(key)) {
          registrtionDetails[key] = regDetails[key];
        } else {
          registrtionDetails[key] = data[key];
        }
      }
      this.cacheService.setCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS, registrtionDetails);
      this.loginService.setRequireData(registrtionDetails);
    }, error => {
      // set up email and type in cache
      this.setCache(regDetails);
    }).catch(error => {
      // set up email and type in cache
      this.setCache(regDetails);
    });
  }

  setCache(regDetails) {
    let registrtionDetails = {};
    for (let i = 0; i < this.itemNeedToStoreInCache.length; i++) {
      let key = this.itemNeedToStoreInCache[i];
      if (regDetails.hasOwnProperty(key)) {
        registrtionDetails[key] = regDetails[key];
      }
    }
    this.cacheService.setCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS, registrtionDetails);
    this.loginService.setRequireData(registrtionDetails);
  }


  errorLog(error?) {
    this.errorHandler.handleError(error);
  }

  /**
   * 
   * @param tokenValue setting up token value 
   * @description to get registered user details calling getUserDetails();
   */
  private cacheToken(tokenValue: string) {
    this.deviceInfoService.bearerToken = tokenValue;
  }



}