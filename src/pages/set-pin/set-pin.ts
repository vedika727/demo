import { IDialogButton } from './../../components/generic-view/iDialog-action';
import { BaseApp } from './../../app/base';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { Platform } from "ionic-angular";
import { TouchID } from "@ionic-native/touch-id";
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { RegistrationServivceProvider } from '../../providers/registration-service/registration-service';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { NoInternetPage } from '../pages';
import { ToastServiceProvider } from '../../providers/ion-service/toast-service';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { LoginGetCustomerInfoProvider } from '../../providers/login-module/login-get-customer-info-service/login-get-customer-info-service';
import { TranslateService } from 'ng2-translate';

/**
 * @author Vedika Bangre
 * @description Set Pin Page
 */

@IonicPage()
@Component({
  selector: 'page-set-pin',
  templateUrl: 'set-pin.html',
})
export class SetPinPage extends BaseApp {
  userData: any;
  counter: number;
  pinNotMatchedFlag: boolean;
  confirmPin: string;
  pin1: any;
  arrayOfNumbers1: any;
  flag: string;
  count: number;
  setEmptyArray: boolean;
  sendObject: any[];
  setPin: string;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  flow: any;
  pin: string;
  arrayOfNumbers: any;
  label1: string;
  textBox1: string;
  label2: string;
  textBox2: string;
  header: string;
  whichPageToNavigate: string;
  page: string;
  biometricType: string = null; // default null means user won't gave access to set hardware auth details for app 
  // like in case of user set bio or face but don't allow for app to auth then skipping set finger print page
  callTriggered: boolean = false;
  tryAgainMessage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sharedataservice: SharedataProvider,
    private androidFingerprintAuth: AndroidFingerprintAuth,
    private cacheService: CacheServiceProvider,
    private platform: Platform,
    private touchId: TouchID,
    private logger: LogServiceProvider,
    private registerService: RegistrationServivceProvider,
    public modalService: ModalServiceProvider,
    public toastService: ToastServiceProvider,
    public loginService: LoginServivceProvider,
    public getUserInfo: LoginGetCustomerInfoProvider,
    public translate: TranslateService
  ) {
    super();
    this.arrayOfNumbers = [];
    this.pin = '';
    this.pin1 = ''
    this.header = 'login.setANewPin';
    this.label1 = 'login.enterYour6DigitPinToSetPin';
    this.userData = this.navParams.get('data');
    this.headerInput.nav = navCtrl;
    if(this.navParams.get('flag')){
      this.headerInput.backNavTo = {};
      this.headerInput.isBackButton = true;
      this.setPin = this.navParams.get('setpin');
      this.headerInput.backNavTo.page = SetPinPage; 
      this.headerInput.backNavTo.navData = this.userData;
      this.flag = 'confirmpin';
    } else {
      this.headerInput.isBackButton = false;
      this.setPin = '';
      this.flag = 'setpin';
    }
    this.confirmPin = ''
    this.counter = 3;
    // try again message and ok message
    this.tryAgainMessage = this.translate.instant("errors.errorButtons.tryAgain");
  }

  keyboardPressError = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      this.showGenericView = false;
      // this.keypadButtonPress(this.confirmPin);
      this.setConfirmPin();
    }
  }


  ionViewDidLoad() {
    if (this.userData.type == "forgotPin") {
      this.whichPageToNavigate = "SetNewpinSuccessfulLoginPage";
    }
    else {
      if (this.platform.is("android")) {
        this.androidFingerprintAuth.isAvailable().then(result => {
          this.logger.log("the result is", result);
          if (result.isHardwareDetected) {
            this.whichPageToNavigate = "SetFingerprintPage";
          } else {
            this.whichPageToNavigate = "RegistrationSuccessfulPage";
            this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, false);
          }
        },
          err => {
            this.whichPageToNavigate = "RegistrationSuccessfulPage";
            this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, false);
          });
      }
      else if (this.platform.is("ios")) {
        this.whichPageToNavigate = "RegistrationSuccessfulPage";
        this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, false);
        /**
         * default next page is RegistrationSuccessfulPage bcz in case of iPhone x if user prevent auth or set hardware authentication for
         * scb app don't get any response in isAvailable() from touch plugin 
         */
        this.touchId.isAvailable().then((res) => {
          this.whichPageToNavigate = "SetFingerprintPage";
          this.biometricType = res;
          this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, true);
        }, (err) => {
          // -7 means user won't have finder print or bio avaialbe in phome
          // as per debugging state
          if (err.code == -7) {
            this.whichPageToNavigate = "SetFingerprintPage";
            this.biometricType = err.biometryType;
            this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, true);
          }
        })
      }
    }
  }

  ionViewDidEnter() {
    if (this.flag == 'confirmpin') {
      this.header = "login.confirm";
      this.label1 = "login.confirmThe6DigitPinNumber";
    }
  }
  /**
   * @description This will push and pop the number on button click
   * @param number 
   */
  keypadButtonPress(number) {
    // setTimeout need for delay call to give to time to render dots on pin html
    //bcz script runs faster than html.
    if (this.flag == 'confirmpin') {
      console.log("confirm pin ", number);
      this.arrayOfNumbers = number;
      this.confirmPin = "";
      for (let i = 0; i < 6; i++) {
        this.confirmPin += number[i];
      }
      console.log("set pin  :", this.setPin);
      console.log("confirm pin :", this.confirmPin);
      console.log("check1 :", this.confirmPin == this.setPin);
      console.log("check2 ", this.confirmPin === this.setPin);
      if (this.confirmPin == this.setPin) {
        // due to pin pad misbehave of call multiple time same function for confirmation i have added flag callTriggerd 
        // so call should be happen in only once.
        if (!this.callTriggered) {
          this.setConfirmPin();
        }
      } else {
        this.pinNotMatchedFlag = true;
        this.setEmptyArray = true;
        this.sendObject = [this.setEmptyArray, this.count];
        this.sharedataservice.changeMessage(this.sendObject);
      }
    }
    else if (this.flag == 'setpin') {
      this.arrayOfNumbers = number;
      console.log("set pin ", number);
      this.setPin = "";
      for (let i = 0; i < 6; i++) {
        this.setPin += number[i];
      }
      this.logger.log("set-pin:", this.arrayOfNumbers)
      this.flag = 'confirmpin';
      
      console.log("THIS IS NAVPARAMS",this.userData);
      this.navCtrl.setRoot(SetPinPage, { data: this.userData, flag:this.flag ,setpin:this.setPin});

      this.logger.log("set pin: ", this.setPin)
      this.arrayOfNumbers.length = 0;
      this.setEmptyArray = true;
      this.sendObject = [this.setEmptyArray, this.count];
      this.sharedataservice.changeMessage(this.sendObject);
      this.logger.log("empty array(set-pin):", this.arrayOfNumbers);

    }
  }

  // set up pin 
  setConfirmPin() {
    this.arrayOfNumbers = [];
    this.callTriggered = true;
    this.logger.log("confirmPin==setPin:", this.confirmPin == this.setPin);
    this.userData['pinCode'] = this.confirmPin;
    // check if device is having BIO auth if then registration success will called on finger print page
    if (this.whichPageToNavigate == "SetFingerprintPage") {
      this.userData['acceptFingerPrint'] = true;
    }
    console.log(this.userData, 'printing this.userData in setconfirm pin process $$$YASH$$$');
    this.registerService.registerProcessCompleted(this.userData).then(data => {
      this.modalService.dismissModal();
      console.log('====================================');
      console.log(this.whichPageToNavigate, this.biometricType);
      console.log('====================================');
      console.log("fetching user Details");
      // call when not forgot pin flow.
      if (this.userData.type !== "forgotPin") {
        this.getUserInfo.getCustomerInfoWithAccessToken(this.getCustomerInfoResponse);
      }
      this.navCtrl.push(this.whichPageToNavigate, { 'data': this.biometricType, userDetails: this.userData });
      console.log('==================================== Data Values', this.biometricType);
    }, error => {
      this.toastService.presentToast('error in set pin');
      this.modalService.presentModal(NoInternetPage, { 'data': this.keyboardPressError });
    })
  }

  genericActionRetry = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      this.genericDialog = null;
      this.getUserInfo.getCustomerInfoWithAccessToken(this.getCustomerInfoResponse);
    }
  }

  getCustomerInfoResponse = <IServiceResponse<any>>{
    success: (data) => {
      this.setRequireData();
      console.log(data.result, "res in set-pin ##sumit##");
      this.loginService.customerInfo = Object.assign({}, data.result);
      this.loginService.email = Object.assign({}, data.result.email);
      // this.cacheService.setCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS, data.result);
      // unwated set cache removed which is only set in registration service.
    },
    fail: (errorService) => {
      console.log("get user info fail  ", errorService);
      // fail condition not handled bcz get user info may not contain data so service may send bad 
      // request response for no data
      this.setRequireData();
    },
    systemFailure: (errorService) => {
      console.log("get user info Error system ", errorService);
      if (errorService.httpStatus == 0) {
        this.getInternetConnectionGenericInterface(this.genericActionRetry)
      } else {
        this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage, this.genericActionRetry)
      }
    },
    progress: (isProgress) => {
      console.log("get user info Progress:", isProgress);
    }
  }

  // below code require in hambgermenu list menu page
  setRequireData() {
    this.loginService.isLoggedIn = true;
    this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res: any) => {
      this.loginService.isSCBCustomer = res.isScblifeCustomer;
      console.log(res, "res in setRequireData ##sumit 444##");
      // this.loginService.customerInfo = res;
      this.loginService.email = res.email;

    });
  }
}

