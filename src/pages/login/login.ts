import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { LoginServivceAuthProvider } from './../../providers/login-module/login-service.auth/login-service-auth';
import { LoginServivceProvider } from "../../providers/login-module/login-service/login-service";
import { TabsPage, LoginPopupPage, ForgotPinPage, SessionTimeOutPage, CallSupportPage } from "../pages";
import { Component, ViewChild, Injector } from "@angular/core";
import { IonicPage, NavController, Nav } from "ionic-angular";
import { Platform, NavParams } from "ionic-angular";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { TouchID } from "@ionic-native/touch-id";
import { NoInternetPage } from "../pages";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { WrongPinPopupPage, DeviceAlreadyRegisteredPromptPage } from "../pages";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { LoginGetCustomerInfoProvider } from '../../providers/login-module/login-get-customer-info-service/login-get-customer-info-service';
import { PushNotificationService } from '../../providers/firebase-service/push-notification-service';
import { DynamicLinkService } from "../../providers/firebase-service/dynamic-link-service";
import { BaseApp } from '../../app/base';
import { DeviceInfoServiceProvider } from '../../providers/deviceInfo-service/deviceInfo-service';
import { FitsenseServiceProvider } from '../../providers/homepage-module/fitsense-service/fitsense-service';
import { TranslateServiceProvider } from '../../providers/translate-service/translate-service';
import { HeaderInputs } from '../../components/scb-header-icon/scb-header-icon';
import { AlertServiceProvider } from '../../providers/ion-service/alert-service';
import { IServiceResponse } from "../../common/service-models/iServiceResponse";
import { LoginAuthProvider } from "../../providers/login-module/login-service.auth/login-auth";
import { TranslateService } from 'ng2-translate';

/**
 * @author - Vedika Bangre
 * @description - Login Page
 */
@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage extends BaseApp {
  loginMethod: string;
  pinCode: any;
  otp: any;
  data: any = {};

  customerType: {};
  accessToken: {};
  @ViewChild(Nav) nav: Nav;

  showPopup: any;
  checkedBiometric: Promise<void>;
  forgotPinFlag: boolean;
  sendObject: (number | boolean)[];
  header: string;
  password: string;
  arrayOfNumbers: any;
  count: number;
  pinValidate: boolean;
  inputPins: any[];
  forgetpin: boolean;
  pin: string;
  completePin: string[];
  setpin: boolean;
  isAndroid: any;
  setEmptyArray: boolean;
  androidFingerHardwareAvailable: boolean;
  showFingerprintIcon: boolean;
  headerInput = new ScbHeaderInputs();
  rootPage: any;
  isScbLifeCustomer: boolean;
  mixedNumber: any;
  authType: string;
  fingerPrintPopMessage: string;
  fingerPrintPopTitleMessage: string;
  isSessionTimeout: boolean;
  genericActionRetry = <IDialogButton<any>>{
    name: this.translate.instant('errors.errorButtons.tryAgain'),
    click: (data?) => {
      this.genericDialog = null;
      this.authenticate(this.loginMethod);
    }
  }
  constructor(
    public navCtrl: NavController,
    private loggerService: LogServiceProvider,
    public platform: Platform,
    public touchId: TouchID,
    private modalService: ModalServiceProvider,
    public sharedataservice: SharedataProvider,
    public androidFingerprintAuth: AndroidFingerprintAuth,
    private cacheService: CacheServiceProvider,
    private fba: FirebaseAnalyticsService,
    public navParams: NavParams,
    public loginService: LoginServivceProvider,
    private authUser: LoginAuthProvider,
    private getCutomerInfo: LoginGetCustomerInfoProvider,
    private dynamicLinkService: DynamicLinkService,
    private pushNotificationService: PushNotificationService,
    public toastService: ToastServiceProvider,
    public deviceService: DeviceInfoServiceProvider,
    public fitsenseService: FitsenseServiceProvider,
    public translateService: TranslateServiceProvider,
    public translate: TranslateService,
    public alertService: AlertServiceProvider,
    public injector?: Injector) {
    super(injector);    // method for firebase analytics
    this.fba.setCurrentScreen("login_complete");
    this.headerInput.isLogoNeedBlur = true;
    this.headerInput.loginPageIconSize = true;
    this.setpin = false;
    this.password = "";
    this.pin = "";
    this.arrayOfNumbers = [];
    this.header = "Wrong PIN entered 3 times";
    this.setEmptyArray = false;
    this.setpin = false;
    this.forgotPinFlag = true;
    this.showFingerprintIcon = false;
    this.rootPage = TabsPage;
    this.isAndroid = this.deviceService.isAndroid();
    // native method to check if platform ready
    this.translateService.translateText("login.enterPin").subscribe(response => {
      this.fingerPrintPopMessage = response;
    })
    this.translateService.translateText("login.scanFingerprint").subscribe(response => {
      this.fingerPrintPopTitleMessage = response;
    })

    // if user locked on entering 3 times wrong pin and again opening app then need to go to forgot pin flow only.
    this.cacheService.getCache(this.CONSTANT.KEY_LOGIN_IS_USER_LOCKED).then(res => {
      res === true ? this.modalService.presentModal(WrongPinPopupPage) : this.checkIfFingerAvail();
    }).catch(res => { this.checkIfFingerAvail() });

    this.isSessionTimeout = this.navParams.get('data');
    this.loginService.isLoggedIn = false;
  }

  ionViewDidLoad() {
    this.cacheService.setCache(this.CONSTANT.KEY_POP_UP, "true");
    if (this.isSessionTimeout) {
      this.isSessionTimeout = false;
      this.modalService.presentModal(SessionTimeOutPage);
    }
    this.cacheService.getCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER).then((res: boolean) => {
      this.loginService.isSCBCustomer = res;
      console.log(this.loginService.isSCBCustomer, " this.loginService.isSCBCustomer in login getting from cache");
    });
    // below code require in hambgermenu list menu page
    this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res) => {
      // below code added for hamberger menu.
      this.loginService.setRequireData(res);
      console.log(this.loginService.customerInfo, " this.loginService.customerInfo in login getting from cache");
    });
  }

  checkIfFingerAvail() {
    this.cacheService.getCache(this.CONSTANT.DEVICEID_AND_RANDOM_SIX_DIGIT_NUMBER).then((res) => {
      this.pinCode = res;
      console.log(this.pinCode, 'mixedNumber pinCode for bio');
    }, (err) => {
      console.log(err);
    })
    this.cacheService.getCache(this.CONSTANT.KEY_IS_BIO_ENABLED).then(
      res => {
        console.log('key_is_enabled response', res);
        if (res == true) {
          this.platform.ready().then(readySource => {
            if (this.isAndroid == true) {
              console.log('entered device==android');
              this.androidFingerprintAuth
                .encrypt({
                  clientId: "myAppName",
                  username: "myUsername",
                  password: "myPassword"
                })
                .then(result => {
                  if (result.withFingerprint) {
                    this.loginMethod = "BIO";
                    this.authenticate(this.loginMethod);
                    console.log('now integrate API 1');
                  }
                })
                .catch(error => {
                  if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                  }
                });
            }
            if (this.isAndroid == false) {
              this.touchId
                .verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(this.fingerPrintPopTitleMessage,// this will be shown in the native scanner popup
                  this.fingerPrintPopMessage, // this will become the 'Enter password' button label
                )
                .then(
                  res => {
                    this.loginService.isLoggedIn = true;
                    this.loginMethod = "BIO";
                    this.authenticate(this.loginMethod);
                  },
                  err => {
                    // this.loggerService.error('Wroong finger print', err);
                  }
                );
            }
          });
        } else {
          this.loggerService.log("biometric not enabled");
          this.showFingerprintIcon = false;
        }
      },
      err => {
        this.loggerService.log("biometric cache not set");
        this.showFingerprintIcon = false;
      });
    this.pinValidate = false;
    this.count = 3;
  }

  keypadButtonPress(number) {
    if (number != -1) {
      if (this.arrayOfNumbers.length < 6) {
        this.arrayOfNumbers.push(number);
        if (this.arrayOfNumbers.length == 6) {
          // Re generate pin string 
          this.pin = "";
          for (let i = 0; i < 6; i++) {
            this.pin = this.pin + this.arrayOfNumbers[i];
          }
          this.pinCode = this.pin
          this.pin = ''
          this.arrayOfNumbers = []
          this.loginMethod = "PIN";
          this.authenticate(this.loginMethod);
        }
      }
      else {
        this.loggerService.log("array is full")
      }
    }
    else {
      this.arrayOfNumbers.pop();
    }
  }

  authenticate(authType) {
    this.authType = authType;
    this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res: any) => {
      this.showGenericView = false;
      this.isScbLifeCustomer = res.isScblifeCustomer;
      this.authUser.authenticateUser(this.pinCode, authType, this.loginResponse)
    }, erro => {
      //debugger;
      this.showGenericView = true;
      this.toastService.presentToast('error of getLoggedInUserInfo')
      this.modalService.dismissModal();
      if (erro.status == 0) {
        this.getInternetConnectionGenericInterface(this.genericActionRetry);
        return;
      }
    }).catch(res => {
      console.log(res);
    });
  }

  /**
   *@description: this function shows error pop whenever user is locked or device is locked
   */
  showErrorMessage(statusCode: string) {
    switch (statusCode) {
      case this.CONSTANT.CODE_E_BLOCKED_THAI_ID:
        this.modalService.presentModal(CallSupportPage);
        break;
      case this.CONSTANT.CODE_E_USER_REGISTERED_ON_ANOTHER_DEVICE:
        this.modalService.presentModal(DeviceAlreadyRegisteredPromptPage, { "isScbLifeCustomer": this.isScbLifeCustomer });
        break;
    }
  }
  /**
   * @author - Yashodhan Apte
   * @description: This function will show modal on screen
   */
  triggerModal() {
    this.modalService.presentModal(NoInternetPage);
  }
  /**
   * end triggerModal()
   */

  /**
   * @author - Yashodhan Apte
   * @description: this is a callback function to navigate to different page depending on component's output
   * @param pagename
   */
  callbackForgotPin(pagename) {
    let data = {
      type: "forgotPin",
    }
    if (pagename == 'EnterOtpPage') {
      data['isSCBCustomer'] = false
    }
    else if (pagename == 'ForgotPinPage') {
      data['isSCBCustomer'] = true
    }
    this.navCtrl.push(pagename, { "data": data });
  }

  getCustomer(data) {
    this.getCutomerInfo.getLoggedInUserInfo(data).then((res: any) => {
      this.loggerService.log("Get Customer Info Success:::::", res);
      this.loginService.customerInfo = res
      this.loginService.isSCBCustomer = this.isScbLifeCustomer;
    }, err => {
      console.log(err, "error in get customer info");
      // this.alertService.presentSimpleAlert('Customer info', 'Error in getting customer info');
    })
  }

  loginResponse = <IServiceResponse<any>>{
    success: (data) => {
      //debugger;
      this.modalService.dismissModal();
      this.loginService.isLoggedIn = true;
      this.CONSTANT.URM_ID = data.result.urmid;
      console.log("loginResponse data",data);
      this.getCustomer(data);
      this.navCtrl.setRoot(TabsPage);
    },
    fail: (errorService) => {
      //debugger;
      this.count--;
      this.arrayOfNumbers.length = 0;
      this.pin = "";
      this.setEmptyArray = true;
      this.sendObject = [this.setEmptyArray, this.count];
      this.sharedataservice.changeMessage(this.sendObject);
      if (this.count == 0) {
        this.modalService.presentModal(WrongPinPopupPage);
        // user is locked need to forgot pin later time
        this.cacheService.setCache(this.CONSTANT.KEY_LOGIN_IS_USER_LOCKED, true);
      }
      this.showErrorMessage(errorService.errorCode);
    },
    systemFailure: (errorService) => {
      console.log("getPhoneNumbers Error system ", errorService);
      if (errorService.httpStatus == 0) {
        this.getInternetConnectionGenericInterface(this.genericActionRetry)
      } else {
        this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage, this.genericActionRetry)
      }
    },
    progress: (isProgress) => {
      //debugger;
      console.log("getPhoneNumbers Progress:", isProgress);
      this.isLoading(isProgress);
    }

  }

}
