import { ModalServiceProvider } from './../../providers/modal-service/modal-service';
import { LoadingServiceProvider } from './../../providers/ion-service/loading-service';
import { EnterOtpPage, TabsPage, ModelRegisterUserWithConsentAcceptPage, NoMobileModalPage } from './../pages';
import { CacheServiceProvider } from './../../providers/ion-service/cache-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { VerifyPhonePage, TermsAndConditionsPage, CallSupportPage } from '../pages';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BaseApp } from '../../app/base';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { ToastServiceProvider } from '../../providers/ion-service/toast-service';
import { RegistrationServivceProvider } from '../../providers/registration-service/registration-service';
import { AppInit } from '../../providers/app-init-service/appinit-service';
import { AlertServiceProvider } from '../../providers/ion-service/alert-service';
import { TranslateService } from "ng2-translate";
import { IDialogButton } from "../../components/generic-view/iDialog-action";

/**
 * Generated class for the ScbLaterProcessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scb-later-process',
  templateUrl: 'scb-later-process.html',
})
export class ScbLaterProcessPage extends BaseApp {
  genericErrorMessage: string = null;
  okMessage: any;
  registrationLaterProcess: FormGroup;
  setPositionAbsolute: boolean;
  public headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  customerInfo: any = {};
  data: any = {};
  termsCheck: boolean = false;
  requestUrlType: string = "existingNormal";
  isNewDevice: string = "No";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public cacheService: CacheServiceProvider,
    public loginService: LoginServivceProvider,
    public toastService: ToastServiceProvider,
    public registerService: RegistrationServivceProvider,
    public loadingService: LoadingServiceProvider,
    public modalService: ModalServiceProvider,
    public translate: TranslateService,
    public appInit: AppInit,
    public alertService: AlertServiceProvider
  ) {
    super();
    let data = this.navParams.get('data');
    console.log('data params ', data);
    if (data) {
      this.headerInput.isBackButton = true;
      this.headerInput.backNavTo = { page: TabsPage, activeIndex: 3 };//menu page index
    } else {
      this.headerInput.isBackButton = false;
    }
    this.headerInput.nav = navCtrl;
    this.headerInput.isPageRegisterLaterProcess = true;
    
    this.setPositionAbsolute = true
    this.registrationLaterProcess = this.fb.group({
      thaiID: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(13),
      Validators.pattern(/^[a-zA-Z0-9]{1,13}$/)]],
      acceptTerms: [false, [Validators.required, Validators.requiredTrue]]
    });

    this.registerService.stateConfig = {
      retryAction: { getPhonesRetry: this.getOtp },
      success: { successGetPhones: this.getPhoneNumbersSuccess },
      fail: this.getPhoneNumbersFail
    }
    this.okMessage = this.translate.instant("errors.errorButtons.ok");
  }

  getPhoneNumbersFail = (errorService) => {
    debugger;
    switch (errorService.errorCode) {
      case this.CONSTANT.CODE_E_BLOCKED_THAI_ID:
        this.registerService.buttonDismissModal = true;
        this.modalService.presentModal(CallSupportPage);
        debugger;
        break;
      case this.CONSTANT.CODE_E_INVALID_THAI_ID:
        this.genericErrorMessage = "registration.authIdWarning";
        break;
      case this.CONSTANT.CODE_E_NO_MOBILE_NUMBER:
        this.modalService.presentModal(NoMobileModalPage); //SCBLIFE-3296
        break;
      case this.CONSTANT.CODE_E_USER_REGISTERD_AS_SCB_CUSTOMER:
        // USER REGISTERD AS SCB AND TRYING TO REGISTER AS NON SCB
        this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept });
        break;
      case this.CONSTANT.CODE_E_EMAIL_ID_ALREADY_REGISTERED:
        this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept });
        break;
      case this.CONSTANT.CODE_USER_ID_ALREADY_REGISTERED:
        this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept });
        break;
      default:
      this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage, this.genericActionOkDeviceLock24Hr);
        break;
    }
  }
  consentAccept = (res) => {
    console.log("consent Acceptance == ", res);
    this.modalService.dismissModal();
    if (res === true) {
      this.isNewDevice = "Yes";
      this.getOtp();
    }
  }

  genericActionOkDeviceLock24Hr = <IDialogButton<any>>{
    name: this.okMessage,
    click: (data?) => {
      this.genericDialog = null;
    }
  }

  getPhoneNumbersSuccess = (res) => {
    let phoneNumbers = res.customerPhoneNumbers;
    this.data['type'] = "registration";
    this.data['isSCBCustomer'] = true;
    if (phoneNumbers.length > 1) {
      this.data['phoneNumbers'] = phoneNumbers;
      this.navCtrl.push(VerifyPhonePage, { "data": this.data });
    }
    else {
      this.data['phoneNumbers'] = phoneNumbers[0].phoneNumber;
      this.navCtrl.push(EnterOtpPage, { "data": this.data });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScbLaterProcessPage');
    this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res: any) => {
      console.log('customer info', res);
      this.customerInfo['email'] = res.email;
      this.customerInfo['flow'] = "registration";
    });
  }

  terms() {
    console.log("terms check is valid", this.registrationLaterProcess.controls.acceptTerms.value)
    this.termsCheck = !this.registrationLaterProcess.controls.acceptTerms.value;
  }

  getOtp = () => {
    if (this.registrationLaterProcess.controls.acceptTerms.value) {
      if (this.registrationLaterProcess.valid) {
        this.customerInfo['customerId'] = this.registrationLaterProcess.controls['thaiID'].value;
        this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((result: any) => {
          let setRegDetails = {
            existingCustomer: "Yes",
            email: result.email,
            authenticationID: this.customerInfo['customerId']
          }
          // registration details needs during registration flow so setting up in service.
          this.registerService.verifyAndSetRegDetail(setRegDetails);
          let id = this.registrationLaterProcess.controls['thaiID'].value;
          this.registerService.identifyExistingCustomer(this.registerService.getPhoneNumbersResponse, this.requestUrlType, this.isNewDevice, id, result.email);
        }, err => {
          console.log('phone err', err);
          // this.toastService.presentToast(err.message);
        });
      } else {
        console.log('invalid form');
      }
    }
    else {
      this.termsCheck = true;
    }
  }

  showTerms() {
    this.navCtrl.push(TermsAndConditionsPage);
  }

  validateThaiId() {
    debugger;
    if (this.registrationLaterProcess.controls.thaiID.valid) {
      this.genericErrorMessage=null
    } else {
      this.genericErrorMessage="registration.authIdError"
    }
  }

  valid() {
    debugger;
    if (this.registrationLaterProcess.controls.thaiID == null) {
      this.genericErrorMessage=null;
      
    } else if(this.registrationLaterProcess.controls.thaiID.invalid){
      this.genericErrorMessage="registration.authIdError";
    }
  }
}
