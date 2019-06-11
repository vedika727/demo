import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { VerifyPhonePage, EnterOtpPage, ModelRegisterUserWithConsentAcceptPage, CallSupportPage, DiffUserFailPage, DeviceAlreadyRegisteredPromptPage } from '../pages';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseApp } from '../../app/base';
import { ToastServiceProvider } from '../../providers/ion-service/toast-service';
import { RegistrationServivceProvider } from '../../providers/registration-service/registration-service';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';

@IonicPage()
@Component({
  selector: "page-forgot-pin",
  templateUrl: "forgot-pin.html"
})
export class ForgotPinPage extends BaseApp {
  genericErrorMessage: string = null;
  data: any;
  thai: any;
  placeholderValue: string;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  forgotPin: FormGroup;
  authenticationIDInvalid: boolean;
  requestUrlType: string = "existingNormal";
  isNewDevice: string = "No";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public modalService: ModalServiceProvider,
    public toastService: ToastServiceProvider,
    public registerService: RegistrationServivceProvider,
    public cacheService: CacheServiceProvider
  ) {
    // super Call
    super();
    this.placeholderValue = "login.idCardOrPassportNumber";
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.data = this.navParams.get("data");
    this.forgotPin = this.fb.group({
      thaiID: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(13),
      Validators.pattern(/^[a-zA-Z0-9]{1,13}$/)]
      ]
    });
    this.registerService.stateConfig = {
      retryAction: { getPhonesRetry: this.getOTP },
      success: { successGetPhones: this.getPhoneNumbersSuccess },
      fail: this.getPhoneNumbersFail
    }
  }

  getPhoneNumbersFail = (errorService) => {
    switch (errorService.errorCode) {
      case this.CONSTANT.CODE_E_BLOCKED_THAI_ID:
        this.modalService.presentModal(CallSupportPage);
        break;
      case this.CONSTANT.CODE_E_THAI_ID_INVALID_IN_FORGOT_PIN:
        // this.toastService.presentToast(errorService.resonseErrorMessage);
        // this.authenticationIDInvalid = true;
        this.genericErrorMessage = "registration.authIdError";
        break;
      case this.CONSTANT.CODE_E_USER_DIFF_USER_REGISTERD:
        this.modalService.presentModal(DiffUserFailPage)
        break;
      case this.CONSTANT.CODE_E_EMAIL_ID_ALREADY_REGISTERED:
        this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept });
        break;
      case this.CONSTANT.CODE_E_USER_REGISTERD_AS_SCB_CUSTOMER:
        // USER REGISTERD AS SCB AND TRYING TO REGISTER AS NON SCB
        this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept });
        break;
      // case this.CONSTANT.CODE_E_THAI_ID_INVALID_IN_FORGOT_PIN:
      //   this.modalService.presentModal(ModelRegisterUserWithConsentAcceptPage, { callBack: this.consentAccept });
      //   break;
      case this.CONSTANT.CODE_E_USER_REGISTERED_ON_ANOTHER_DEVICE:
        // default true is passed because forgot pin only calls when user is scb customer with register reccessfull
        this.modalService.presentModal(DeviceAlreadyRegisteredPromptPage, { "isScbLifeCustomer": true });
        break;
      case this.CONSTANT.CODE_E_CANNOT_CONNECT_SERVER:
        // default true is passed because forgot pin only calls when user is scb customer with register reccessfull
        debugger;
        this.genericErrorMessage=errorService.resonseErrorMessage;
        break;
      default:
        break;
    }
  }

  consentAccept = (res) => {
    console.log("consent Acceptance == ", res);
    this.modalService.dismissModal();
    if (res === true) {
      this.isNewDevice = "Yes";
      this.getOTP();
    }
  }

  getPhoneNumbersSuccess = (res) => {
    let customerPhoneNumbers = res.customerPhoneNumbers
    this.data["flow"] = "Login";
    this.data["isSCBCustomer"] = true
    if (customerPhoneNumbers.length > 1) {
      this.data["phoneNumbers"] = customerPhoneNumbers;
      this.navCtrl.push(VerifyPhonePage, { 'data': this.data })
    }
    else {
      // only when having 1 mobile number 
      this.data["phoneNumbers"] = customerPhoneNumbers[0].phoneNumber;
      this.navCtrl.push(EnterOtpPage, { 'data': this.data });
    }
  }
  validateThaiId() {
    if (this.forgotPin.controls.thaiID.valid) {
      // this.authenticationIDInvalid = false;
      this.genericErrorMessage = null;
    } else {
      // this.authenticationIDInvalid = true;
      this.genericErrorMessage = "registration.authIdError";
    }
  }

  getOTP = () => {
    this.thai = this.forgotPin.value;
    this.registerService.identifyExistingCustomer(this.registerService.getPhoneNumbersResponse, this.requestUrlType, this.isNewDevice, this.thai.thaiID);
  }
}
