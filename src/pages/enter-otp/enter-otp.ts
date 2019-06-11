import { ModalServiceProvider } from './../../providers/modal-service/modal-service';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { SetPinPage, ConsentPage, NoInternetPage, LoanSubmissionPage } from "../../pages/pages";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { OtpServicesProvider } from "../../providers/otp-service/otp-process";
import { TranslateService } from "ng2-translate";
import { BaseApp } from "./../../app/base";
import { IDialogButton } from "../../components/generic-view/iDialog-action";
import { ToastServiceProvider } from "../../providers/ion-service/toast-service";
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { LoginGetCustomerInfoProvider } from '../../providers/login-module/login-get-customer-info-service/login-get-customer-info-service';
import { SharedataProvider } from '../../providers/sharedata/sharedata';
@IonicPage()
@Component({
  selector: "page-enter-otp",
  templateUrl: "enter-otp.html"
})
export class EnterOtpPage extends BaseApp {
  enableOtpButton: boolean;
  retryMail: any;
  dataToSetPin: { isSCBCustomer: any; type: any };
  isSCBLifeCust: boolean = true;
  otpInformation: any;
  userData: any = [];
  emailOtpIsWrong: boolean;
  pinNotMatched: boolean;
  numberOrEmail: string;
  email: string;
  otp: any;
  correctOtp: any;
  arrayOfNumbers: any;
  show: boolean;
  displayKeypadOnly: boolean;
  flow: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  enterOtpInvalid: boolean = false;
  otpIsWrong: boolean = true;
  customerPhone: any;
  userOTP: any;
  refCode: string;
  param: any;
  changedPhoneNumber: any;
  lastdigits: any;
  otpObject: any;
  urm: {};
  buttonText: string;
  showLoanFlowButton: boolean;
  tryAgainMessage: string;
  defaultErrorMessage:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: LogServiceProvider,
    private cacheService: CacheServiceProvider,
    private FirebaseAnalyticsService: FirebaseAnalyticsService,
    private otpServicesProvider: OtpServicesProvider,
    private translateService: TranslateService,
    public modalService: ModalServiceProvider,
    public toastService: ToastServiceProvider,
    public loginService: LoginServivceProvider,
    private getCutomerInfo: LoginGetCustomerInfoProvider,
    private shareDataService: SharedataProvider,
  ) {
    super();
    this.displayKeypadOnly = true;
    this.show = false;
    this.showLoanFlowButton = false;

    //changing text of button in otp screen depending on which flow user is going through
    this.buttonText = this.navParams.get('flow');
    if (this.buttonText == 'loan') {
      this.showLoanFlowButton = true;
    }

    this.logger.log("otp info: ", JSON.stringify(this.userData['otpCode']));
    this.headerInput.isBackButton = true;
    this.headerInput.nav = this.navCtrl;
    this.FirebaseAnalyticsService.setCurrentScreen("EnterOtpPage");
    this.arrayOfNumbers = [];
    this.otpIsWrong = true;
    this.emailOtpIsWrong = true;
    this.enableOtpButton = false;
    this.userOTP = "";

    if (this.navParams.get('data')) {
      this.userData = this.navParams.get('data');
      console.log(this.userData, "userData in enterotp page");
      this.isSCBLifeCust = this.userData.isSCBCustomer;
      this.init();
    } else {
      //the esle condition is added to handle push notification , dynamic link...
      this.checkForDyLinkOBJ();
    }
    // try again message
    this.tryAgainMessage=this.translateService.instant("errors.errorButtons.tryAgain");
    this.defaultErrorMessage=this.translateService.instant("errors.errorButtons.agreed");
  }

  sendPhoneOtpError = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      console.log("sendPhoneOtpError page click handler");
      this.showGenericView = false;
      this.sendPhoneOtp();
    }
  };

  emailOtpError = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      console.log("emailOtpError click handler");
      this.showGenericView = false;
      this.sendEmailOtp(this.retryMail);
    }
  };

  resendOtpError = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      console.log("resendOtpError click handler");
      this.showGenericView = false;
      this.sendEmailOtp(this.retryMail);
    }
  };

  confirmOtpError = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      console.log("confirmOtpError click handler");
      this.showGenericView = false;
      this.modalService.dismissModal();
    }
  };

  /**
   * @description - this method check for usedData type and based on it send otp to mail or phone number
   */
  init() {
    this.otpIsWrong = true;
    this.emailOtpIsWrong = true;
    this.enableOtpButton = false;

    if (this.userData.hasOwnProperty("phoneNumbers")) {
      this.otpServicesProvider.setOptions({
        recipient: this.userData.phoneNumbers,
        mobileno: this.userData.phoneNumbers
      });
    }
    if (
      !this.isSCBLifeCust ||
      (this.isSCBLifeCust && this.userData.type == "myAccount") ||
      this.userData.type == "emailVerification"
    ) {
      if (this.userData.type == "myAccount" || this.userData.type == "emailVerification") {
        this.email = this.userData.email
        this.sendEmailOtp(this.userData.email);
      } else {
        this.cacheService.getCache(this.CONSTANT.KEY_REGISTERED_USER).then(
          (res: any) => {
            this.email = res.email
            this.sendEmailOtp(res.email);
          },
          err => {
            this.logger.log("err", err);
          }
        );
      }
    }
    else if (this.isSCBLifeCust && (this.userData.type != "myAccount" || this.userData.type == "policyLoanConfirmation")) {
      this.customerPhone = this.userData.phoneNumbers;
      let len = this.customerPhone.length;
      this.changedPhoneNumber = this.customerPhone.substring(len - 4, len);
      this.lastdigits = { lastDigits: this.changedPhoneNumber };
      this.translateService.setTranslation("en", { phoneNumber: "XXX-XXX-{{lastDigits}}" }, true);
      this.translateService.setTranslation("th", { phoneNumber: "XXX-XXX-{{lastDigits}}" }, true);
      this.sendPhoneOtp();
    }
  }

  sendPhoneOtp() {
    this.otpServicesProvider.sendOTP(this.customerPhone).then(
      (res: any) => {
        this.modalService.dismissModal();
        this.otp = res.otpCode;
        this.refCode = res.refCode;
        this.logger.log("OTP code is ", this.otp);
      },
      err => {
        if (err.status == 0) {
          this.modalService.presentModal(NoInternetPage, { 'data': this.sendPhoneOtpError })
        } else {
          this.toastService.presentToast(this.defaultErrorMessage);
        }
        this.logger.log("Error phone in otp service");
      }
    );
  }

  sendEmailOtp(email) {
    this.retryMail = email;
    this.otpServicesProvider.sendEmailOTP(email).then(
      (res: any) => {
        this.modalService.dismissModal();
        this.otp = res.otpCode;
        this.refCode = res.refCode;
        this.logger.log("OTP code is ", this.otp);
      },
      err => {
        if (err.status == 0) {
          this.modalService.presentModal(NoInternetPage, { 'data': this.emailOtpError })
        } else {
          this.toastService.presentToast(this.defaultErrorMessage);
        }
        this.logger.log("Error in email otp service");
      }
    );
  }

  confirmOTP() {
    console.log(this.arrayOfNumbers)
    if (this.arrayOfNumbers.length == 6) {
      for (let i = 0; i < 6; i++) {
        this.userOTP = this.userOTP + this.arrayOfNumbers[i];
      }
      this.logger.log("user otp ", this.userOTP);
      this.arrayOfNumbers.length = 0;
      this.otpServicesProvider.validateOTP(this.userOTP, this.userData).then(
        (res: any) => {
          this.modalService.dismissModal();
          // as verify otp is not having result so message success treating as success.
          if (res.status.message == "success") {
            this.logger.log("OTPVerified");
            switch (this.userData.type) {
              case "myAccount":
                this.setConfigMyAccount();
                break;
              case "policyLoanConfirmation":
                let otpDetails = { otpCode: this.otp, otpReference: this.refCode, mobileNumber: this.userData.phoneNumbers };
                this.shareDataService.confirmationPolicyLoan(otpDetails);
                this.navCtrl.push(LoanSubmissionPage, { data: this.userData });
                break;
              case "addCreditCard":
                this.navCtrl.push(LoanSubmissionPage, { data: this.userData });
                break;
              case "emailVerification":
                this.setConfigMyAccount();
                break;
              default:
                this.dataToSetPin = { isSCBCustomer: this.userData.isSCBCustomer, type: this.userData.type };
                this.navCtrl.setRoot(SetPinPage, { data: this.dataToSetPin });
                break;
            }
          } else {
            this.resetData();
          }
        },
        err => {
          console.log("otp error is ----", err);
          if (err.status == 0) {
            this.logger.log("Error in otp service");
            this.toastService.presentToast(this.defaultErrorMessage);
            this.modalService.presentModal(NoInternetPage, { 'data': this.confirmOtpError });
          } else {
            this.resetData();
          }
        }
      );

    } else {
      // need to optimise the code
      this.resetData();
    }
  }

  resetData() {
    this.logger.log("Wrong otp");
    this.otpIsWrong = false;
    this.enableOtpButton = false;
    this.userOTP = "";
    this.arrayOfNumbers.length = 0;
    this.logger.log("OTP Service error");
  }

  setConfigMyAccount() {
    // this.loginService.customerInfo.emailVerify = true;
    this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res) => {
      this.urm = res;
    })
    this.getCutomerInfo.getLoggedInUserInfo(this.urm).then((res: any) => {
      console.log(res, "getcustomer info call in verify email flow");
      this.loginService.customerInfo = res;
      this.loginService.email = res.email;
    })
    this.navCtrl.push(ConsentPage, {
      data: "success"
    });
  }

  keypadButtonPress(number) {
    if (number != -1) {
      if (this.arrayOfNumbers.length < 6) {
        this.arrayOfNumbers.push(number);
        if (this.arrayOfNumbers.length == 6) {
          this.enableOtpButton = true;
        }
      }
      else {
        this.logger.log("array is full");
      }
    } else {
      this.arrayOfNumbers.pop();
      this.enableOtpButton = false;
    }
  }

  resendOtp() {
    //BACKEND SERVICE
    this.arrayOfNumbers.length = 0;
    // reset error message and button disabled as per flag avaible urlear otpIsWrong and enableOtpButton
    this.otpIsWrong = true;
    this.enableOtpButton = false;
    this.otpServicesProvider.resendOTP().then(
      (res: any) => {
        this.modalService.dismissModal();
        this.otp = res.otpCode;
        this.refCode = res.refCode;
        console.log(res, "resend otp response");
        console.log("OTP code is ", this.otp);
        // this.ToastServiceProvider.presentToast("OTP Code is =" + this.otpServicesProvider.otpResponse.otpCode + "'", "top", 7000);
      },
      (error: any) => {
        this.toastService.presentToast(this.defaultErrorMessage);
        this.modalService.presentModal(NoInternetPage, { 'data': this.resendOtpError });
        this.otpServicesProvider.errorLog(error);
      }
    );
  }

  /**
   * @description - this method check if this page is called by push notification , in app or dynamic link;
   * for email verification.
   */
  private checkForDyLinkOBJ() {
    var dyLinkOBj = this.navParams.get(this.CONSTANT.DY_LINK_OBJ);
    if (dyLinkOBj) {
      this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then(res => {
        this.userData = {
          isSCBCustomer: res["isScblifeCustomer"],
          type: "emailVerification",
          email: res["email"]
        }
        this.init();
      })
    } else {
      this.init();
    }
  }

}
