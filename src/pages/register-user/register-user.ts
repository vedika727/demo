import { LoadingServiceProvider } from './../../providers/ion-service/loading-service';
import { BaseApp } from './../../app/base';
import { DeviceInfoServiceProvider } from './../../providers/deviceInfo-service/deviceInfo-service';
import { Component, Injector, ElementRef, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VerifyPhonePage, EnterOtpPage, TabsPage, SetPinPage, TermsAndConditionsPage, CallSupportPage, ModelRegisterUserWithConsentAcceptPage, SessionTimeOutPage, NoMobileModalPage } from "../../pages/pages";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { LoginServivceProvider } from "../../providers/login-module/login-service/login-service";
import { RegistrationServivceProvider } from '../../providers/registration-service/registration-service';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { OtpServicesProvider } from "../../providers/otp-service/otp-process";
import { IDialogButton } from 'components/generic-view/iDialog-action';
import { RegisterDeviceProvider } from '../../providers/register-device/register-device';
import { ToastServiceProvider } from '../../providers/ion-service/toast-service';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { AppInit } from '../../providers/app-init-service/appinit-service';
import { AlertServiceProvider } from '../../providers/ion-service/alert-service';
import { TranslateService } from 'ng2-translate';

/**
 * @author - Keyur Joshi
 * @description - This Page takes user details for registration 
 */
@IonicPage()
@Component({
  selector: "page-register-user",
  templateUrl: "register-user.html"
})
export class RegisterUserPage extends BaseApp {
  genericErrorMessage: string=null;
  authenticationIDInvalidWarning: boolean = false;
  phone = "1122334455";
  data: any = {};
  registerSCBLifeCustomer: FormGroup;
  emailInvalid: boolean = false;
  existingCustomerInvalid: boolean = false;
  authenticationIDInvalid: boolean = false;
  acceptTermsInvalid: boolean = false;
  getPhoneNumberServiceObject: any;
  headerConfig = {
    isBackBtnActive: false
  };
  authenticationID: any;
  headerInput = new ScbHeaderInputs();
  isExistingCustomerRegistration: boolean = false;
  customerEmail: string;
  customerUniqueId: string;
  isExistingCustomerRadio: string;
  requestUrlType: string = "";
  isNewDevice: string = "No";
  tryAgainMessage: any;
  okMessage: any;

  constructor(
    public navCtrl: NavController,
    public fb: FormBuilder,
    public navParams: NavParams,
    private fba: FirebaseAnalyticsService,
    private cacheService: CacheServiceProvider,
    public loginService: LoginServivceProvider,
    public registerService: RegistrationServivceProvider,
    public modalService: ModalServiceProvider,
    public otpService: OtpServicesProvider,
    public deviceInfoService: DeviceInfoServiceProvider,
    public registerDevice: RegisterDeviceProvider,
    public toastService: ToastServiceProvider,
    public appInit: AppInit,
    public loadingService: LoadingServiceProvider,
    private elRef: ElementRef,
    private renderer: Renderer,
    public alertService: AlertServiceProvider,
    public translate: TranslateService,
    public injector?: Injector) {
    super(injector);
    // FBA Event
    this.fba.setCurrentScreen('register_landing');
    this.fba.logEvent("register_landing", "Landing in Register screen");
    this.data['type'] = 'registration';
    let data = this.navParams.get('data');
    console.log('data params ', data);
    if (data) {
      this.headerInput.isBackButton = true;
      this.headerInput.backNavTo = { page: TabsPage, activeIndex: 3 };
    } else {
      this.headerInput.isBackButton = false;
    }
    this.headerInput.nav = navCtrl;
    this.registerSCBLifeCustomer = this.fb.group({
      email: ["", [Validators.required, Validators.email,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
      Validators.maxLength(40)]
      ],
      existingCustomer: ["", [Validators.required]],
      authenticationID: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(13),
      Validators.pattern(/^[a-zA-Z0-9]{1,13}$/)]],
      acceptTerms: [false, [Validators.required, Validators.requiredTrue]]
    });
    console.log("registerSCBLifeCustomer", this.registerSCBLifeCustomer)
    // try again message and ok message
    this.tryAgainMessage = this.translate.instant("errors.errorButtons.tryAgain");
    this.okMessage = this.translate.instant("errors.errorButtons.ok");
  }

  consentAccept = (res) => {
    console.log("consent Acceptance == ", res);
    this.modalService.dismissModal();
    if (res === true) {
      this.isNewDevice = "Yes";
      this.registrationSCBLifeCustomer();
    }
  }

  deviceResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
      console.log("REsponse objcet : ", data);
    },
    fail: (errorService) => {
      console.log("deviceResponse Error - ", errorService)
      this.toastService.presentToast("error device registered successfully");

    },
    systemFailure: (errorService) => {
      this.toastService.presentToast(errorService.errorMessage);
    },

    progress: (isProgress) => {
      // this.loadingService.isLoading(isProgress);
    }
  }

  getPhoneNumbersResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      let res = data.result
      console.log("getPhoneNumbers success : ", res);
      this.modalService.dismissModal();
      this.isExistingCustomerRegistration ? this.successScbCustomerCall(res) : this.successNonSCBCustomerCall(res);
    },
    fail: (errorService) => {
      console.log("getPhoneNumbers Response Error - ", errorService);
      switch (errorService.errorCode) {
        case this.CONSTANT.CODE_E_BLOCKED_THAI_ID:
          this.modalService.presentModal(CallSupportPage);
          break;
        case this.CONSTANT.CODE_E_INVALID_THAI_ID:
          // this.authenticationIDInvalidWarning = true;
          this.genericErrorMessage="registration.authIdWarning";
          break;
        case this.CONSTANT.CODE_E_NO_MOBILE_NUMBER:
          this.modalService.presentModal(NoMobileModalPage); //SCBLIFE-3296
          break;
        case this.CONSTANT.CODE_E_EMAIL_ID_ALREADY_REGISTERED:
          this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept, CODE: errorService.errorCode });
          break;
        case this.CONSTANT.CODE_USER_ID_ALREADY_REGISTERED:
          this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept, CODE: errorService.errorCode });
          break;
        case this.CONSTANT.CODE_E_USER_REGISTERD_AS_SCB_CUSTOMER:
          // USER REGISTERD AS SCB AND TRYING TO REGISTER AS NON SCB
          this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept });
          break;
        default:
          this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage, this.genericActionOkDeviceLock24Hr);
          break;
      }
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
      console.log("getPhoneNumbers Progress:", isProgress);
      this.isLoading(isProgress);
    }
  }

  successScbCustomerCall = (res) => {
    let phoneNumbers = res.customerPhoneNumbers;
    if (phoneNumbers.length > 1) {
      this.data['phoneNumbers'] = phoneNumbers;
    }
    else {
      this.data['phoneNumbers'] = phoneNumbers[0].phoneNumber;
    }
    this.navCtrl.push(phoneNumbers.length > 1 ? VerifyPhonePage : EnterOtpPage, { "data": this.data });
  }

  successNonSCBCustomerCall = (res) => {
    this.data[this.CONSTANT.KEY_IS_SCB_CUSTOMER] = false
    this.navCtrl.push(SetPinPage, { "data": this.data });
  }
  genericActionRetry = <IDialogButton<any>>{
    name: this.translate.instant("errors.errorButtons.tryAgain"),
    click: (data?) => {
      this.genericDialog = null;
      this.registrationSCBLifeCustomer();
    }
  }

  genericActionOkDeviceLock24Hr = <IDialogButton<any>>{
    name: this.translate.instant("errors.errorButtons.ok"),
    click: (data?) => {
      this.genericDialog = null;
    }
  }

  ionViewDidEnter() {
    this.fba.setCurrentScreen("register_customer");
    this.appInit.registerService(this.deviceResponse);
  }

  /**
   * @description registration of SCB customer process
   */
  registrationSCBLifeCustomer() {
    this.customerEmail = this.registerSCBLifeCustomer.controls.email.value;
    this.customerUniqueId = this.registerSCBLifeCustomer.controls.authenticationID.value;
    this.isExistingCustomerRadio = this.registerSCBLifeCustomer.controls['existingCustomer'].value;
    this.isExistingCustomerRegistration = (this.isExistingCustomerRadio && this.isExistingCustomerRadio == 'Yes') ? true : false;
    if (!this.validateData(this.isExistingCustomerRegistration)) {
      return;
    }
    this.data[this.CONSTANT.KEY_IS_SCB_CUSTOMER] = this.isExistingCustomerRegistration
    this.registerService.verifyAndSetRegDetail(this.registerSCBLifeCustomer.value);
    this.isExistingCustomerRegistration ? this.requestUrlType = "existingNormal" : this.requestUrlType = "new";
    this.registerCustomer();
  }

  registerCustomer() {
    this.appInit.identifyExistingCustomer(this.getPhoneNumbersResponse, this.requestUrlType, this.isNewDevice, this.customerEmail, this.customerUniqueId);
  }

  applyLater() {
    this.loginService.isLoggedIn = false;
    this.loginService.isRegistered = false;
    this.cacheService.setCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED, false);
    this.navCtrl.setRoot(TabsPage);
  }

  showTerms() {
    this.navCtrl.push(TermsAndConditionsPage);
  }
  valid() {
    if (this.registerSCBLifeCustomer.controls.authenticationID == null) {
      // this.authenticationIDInvalidWarning = true;
      this.genericErrorMessage=null;
      
    } else if(this.registerSCBLifeCustomer.controls.authenticationID.invalid){
      // this.authenticationIDInvalidWarning = false;
      this.genericErrorMessage="registration.authIdError";
    }
  }
  validateData(isCustomer) {
    // reason existingCustmer validation is for rendering the validation messages on html 
    // true is set bcz without selecting thier is no option to trigger button and during email validaton
    // radio validiaton also render in html so making it true default
    this.emailInvalid = false;
    this.existingCustomerInvalid = false;
    // this.authenticationIDInvalid = false;
    this.genericErrorMessage=null;
    this.acceptTermsInvalid = false;
    let constrols = this.registerSCBLifeCustomer.controls;
    let existingCustmer = constrols['existingCustomer'];
    let email = constrols['email'];
    let authenticationID = constrols['authenticationID'];
    let acceptTerms = constrols['acceptTerms'];

    if (isCustomer) {
      if (!email.valid) {
        this.emailInvalid = true;
        return false;
      }
      if (existingCustmer.value != "") {
        if (!existingCustmer.valid) {
          this.existingCustomerInvalid = true;
          return false;
        }
      } else {
        return true;
      }
      if (!authenticationID.valid) {
        // this.authenticationIDInvalid = true;
        this.genericErrorMessage="registration.authIdError"
        return false;
      }
      if (!acceptTerms.valid) {
        this.acceptTermsInvalid = true;
        return false;
      }
    } else {
      if (!email.valid) {
        this.emailInvalid = true;
        return false;
      }
      if (existingCustmer.value != "") {
        if (!existingCustmer.valid) {
          this.existingCustomerInvalid = true;
          return false;
        }
      } else {
        return true;
      }
      if (!acceptTerms.valid) {
        this.acceptTermsInvalid = true;
        return false;
      }
    }
    return true;
  }

  validateThaiId() {
    if (this.registerSCBLifeCustomer.controls.authenticationID.valid) {
      // this.authenticationIDInvalid = false;
      this.genericErrorMessage=null
    } else {
      // this.authenticationIDInvalid = true;
      this.genericErrorMessage="registration.authIdError"
    }
  }

  fbaLogTnCEvent(fbaEvent: string) {
    this.fba.logEvent("registration_term_and_condition_accepted", fbaEvent);
  }

  backToTabs() {
    this.navCtrl.push(TabsPage, { "data": { activeIndex: 3 } })
  }

  markAcceptTermsValid(event) {
    if (this.acceptTermsInvalid && event.checked) {
      this.acceptTermsInvalid = false;
    }
  }

  validateEmail(){
    if(!this.registerSCBLifeCustomer.controls.email.valid){
      this.emailInvalid=true;
    }
  }
}