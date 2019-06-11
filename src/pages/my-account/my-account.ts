import { SharedataProvider } from './../../providers/sharedata/sharedata';
import { LoginGetCustomerInfoProvider } from './../../providers/login-module/login-get-customer-info-service/login-get-customer-info-service';
import { MyAccountServiceProvider } from './../../providers/my-account-service/my-account-service';
import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { CacheServiceProvider } from './../../providers/ion-service/cache-service';
import { EnterOtpPage } from './../pages';
import { FirebaseAnalyticsService } from './../../providers/firebase-service/firebase-analytics-service';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, App } from 'ionic-angular';
import { ProfileImagePage, InsuranceCardPage } from '../pages';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GetCustomerInfo } from '../../common/models/get-customer-info.class';
import { BaseApp } from '../../app/base';
import { LoadingServiceProvider } from "../../providers/ion-service/loading-service";
import { IServiceResponse } from 'common/service-models/iServiceResponse';

/**
 * @author Sumit Lokhande
 * @description This file contains functions related to my-account page
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage extends BaseApp implements OnInit {
  /** Page Variables Declaration */
  myAccount: FormGroup;
  editName: boolean;
  editWeight: boolean;
  editHeight: boolean;
  editMyBirthday: boolean;
  edittelephoneNumber = true;
  editEmail = true;
  editResidence: boolean;
  public date: any;
  customerDetails: GetCustomerInfo = new GetCustomerInfo();
  public interval: any;
  public minTime: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  userInfo: any;
  userName: string;
  placeholder = "assets/scbl-icons/default-profile-picture.svg";
  isScblifeCustomer: boolean;

  getEmail: any;
  isEmailVerify: any;
  isSCBCustomer: boolean;
  nonSCBEmail: string;
  linkClicked: boolean;
  urm: {};
  contactNumber: any;
  customerAddress: any;
  customerType: any;
  userAddr: string;
  emailVariableInCache: any;
  cacheObject: any;
  /** @description Start of constructor */
  constructor(public platform: Platform, private getCutomerInfo: LoginGetCustomerInfoProvider, private loadingService: LoadingServiceProvider, public cacheService: CacheServiceProvider, public loginService: LoginServivceProvider, public myAccountService: MyAccountServiceProvider, public logger: LogServiceProvider, public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder,
    private fba: FirebaseAnalyticsService, public toastService: ToastServiceProvider, public app: App, public sharedataservice: SharedataProvider) {
    super();
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.userInfo = Object.assign({}, this.loginService.customerInfo);

    console.log(this.userInfo, "this.userInfo;")
    this.isSCBCustomer = this.loginService.isSCBCustomer;
    console.log(this.isSCBCustomer, "this.isSCBCustomer");
    this.nonSCBEmail = this.loginService.email;
    this.urm = this.CONSTANT.URM_ID;
    console.log("URMID Id in My-Account " + this.urm);
    if (this.userInfo.firstName=='') {
      this.userName = 'โปรไฟล์';
    }
    else {
      this.userName = this.userInfo.firstName;
    }
    this.editName = false;
    this.editWeight = true;
    this.editHeight = true;
    this.editMyBirthday = true;
    this.editResidence = true;
    this.date = this.getThaiDate();  // bind current value
    this.minTime = this.getThaiDate(); //set min time validation

    /** @description Getting isEmailVerified after email verification flow */
    this.sharedataservice.getUserConsent.subscribe(emailVerified => {
      console.log("In Consent ", emailVerified);
      if (this.loginService.customerInfo.isEmailVerify) {
        if (emailVerified == "") {
          this.userInfo.isEmailVerify = this.loginService.customerInfo.isEmailVerify
        }
        else {
          this.userInfo.isEmailVerify = emailVerified;
        }
      }
      else {
        this.userInfo.isEmailVerify = this.loginService.customerInfo.isEmailVerify;
      }
    });
  }
  //End of constructor

  ionViewDidEnter() {
    this.fba.logEvent('profile_start', 'View profile screen');
  };

  /** @descriptionStart of prospect customer API response */
  prospectCustomerResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      this.fba.logEvent("profile_update", "Update profile information");
      this.fba.logEvent("profile_update_tel", "Click confirm to update telephone");
      this.fba.logEvent("profile_update_addr", "Click confirm to update address");

      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
      console.log("prospectCustomer Response obj. : ", data);
      // this.toastService.presentToast("ข้อมูลของคุณได้ถูกบันทึกแล้ว",'top',30000,'toastStyle');
      this.toastService.presentToast("ข้อมูลของคุณได้ถูกบันทึกแล้ว",'top',30000,'toastStyle');
      console.log(this.urm, "this.urm")
      this.getCutomerInfo.getLoggedInUserInfo(this.urm).then((res: any) => {
        console.log(res, "getcustomer info call in verify email flow");
        this.loginService.customerInfo = res;
           /** @description updating height and weight after getCustomer API call */
        if(this.loginService.customerInfo.weight==0 && this.loginService.customerInfo.height==0){
          this.loginService.customerInfo.weight=null;
          this.loginService.customerInfo.height=null;
        }
         /** @description updating name after getCustomer API call */
         if ( this.loginService.customerInfo.firstName=='') {
          this.userName = 'โปรไฟล์';
        }
        else {
          this.userName = this.loginService.customerInfo.firstName;
        }
        
        this.loginService.email = res.email;
        // SETING 
        this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res) => {
          this.cacheObject = res;
          console.log("cache object 2 ", this.cacheObject)
          this.cacheObject.email = this.loginService.email;
          console.log("cache email new set ", this.cacheObject.email)
          console.log(this.myAccount.controls['email'].value)
          console.log(" TOTAL NEW cache new set ", this.cacheObject)
          this.cacheService.setCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS, this.cacheObject);
        }, (err) => {
        });
       
        /** @description resetting all flag after saving prospect data */
        this.userInfo = res;
        this.editName = false;
        this.editWeight = true;
        this.editHeight = true;
        this.editMyBirthday = true;
        this.editResidence = true;
        this.edittelephoneNumber = true;
        /** @description setting masking phone number to phoneNumber field */
        this.myAccount.controls['phone'].setValue(this.masked());
        console.log(this.myAccount, "myAccount.status");

      });
    },
    fail: (errorService) => {
      console.log("prospectCustomer Error - ", errorService)

    },
    systemFailure: (errorService) => {

      console.log("prospectCustomer Error system ", errorService)
    },

    progress: (isProgress) => {
      this.loadingService.isLoading(isProgress);
    }
  }
  //End of prospect customer API response

  /** @description Logic to select date of birth */
  getThaiDate() {
    let today: any = new Date();
    let offset = today.getTimezoneOffset();
    let thaiDate = today.toISOString();
    let datetime = thaiDate.split("T");
    let dateStringArray = datetime[0].split("-");
    let dateYear = parseInt(dateStringArray[0]);
    let dateMonth = parseInt(dateStringArray[1]);
    let dateDay = parseInt(dateStringArray[2]);
    let timeStringArray = datetime[1].split(":");
    let timeHours: any = parseInt(timeStringArray[0]);
    let timeMinutes: any = parseInt(timeStringArray[1]);
    if (offset % 60 == 0) {
      let addedhours = -(offset / 60);
      timeHours += addedhours;
      if (timeHours == 24) {
        timeHours = 0;
      }
      if (timeHours > 24) {
        timeHours -= 24;
      }
    } else {
      let minutes = -(offset % 60);
      let addedhours = (-offset - minutes) / 60;
      timeHours += addedhours;
      timeMinutes += minutes;
      if (timeMinutes == 60) {
        timeMinutes = 0;
        timeHours++;
      } else if (timeMinutes > 60) {
        timeMinutes -= 60;
        timeHours++;
      }
    }
    if (timeMinutes.toString().length == 1) {
      timeMinutes = "0" + timeMinutes.toString();
    }
    if (timeHours.toString().length == 1) {
      timeHours = "0" + timeHours.toString();
    }
    dateYear = dateYear + 543;
    let d =
      dateYear.toString() +
      thaiDate.substr(4, 7) +
      timeHours.toString() +
      thaiDate.substr(13, 1) +
      timeMinutes.toString() +
      thaiDate.substr(16, thaiDate.length);
    return d;
  }
  /** @description Validations on initialization */
  ngOnInit() {
    /** @description sending customerType to prospect customer API */
    if (this.isSCBCustomer == true) {
      this.customerType = 1;
    }
    else {
      this.customerType = 2;
    }
    /** @description setting username in form according to getCustomerInfo Response */
    if (this.userInfo.firstName == null && this.userInfo.lastName == null) {
      this.userName = "โปรไฟล์";
    }
    else {
      this.userName = this.userInfo.firstName + " " + this.userInfo.lastName;
    }
    /** @description setting contactNumber and customerAddress in form according to getCustomerInfo Response */
    if (this.userInfo.customerContacts == null || this.userInfo.customerAddresses == null) {
      this.contactNumber = this.userInfo.customerContacts;
      this.customerAddress = this.userInfo.customerAddresses;
    }
    else {
      this.contactNumber = this.userInfo.customerContacts[0].phone
      this.customerAddress = this.userInfo.customerAddresses[0].address;
    }

    let mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$"; //mobile number validation pattern
    console.log(this.userInfo.firstName, "this.userInfo.firstName");
    /** @description Start ofmyAccount Form validation and initialization */
    this.myAccount = this.fb.group({
      name: [this.userName],
      gender: [this.userInfo.gender],
      weight: [this.userInfo.weight],
      height: [this.userInfo.height],
      dateOfBirth: [this.userInfo.dateOfBirth],
      phone: [this.contactNumber, [Validators.maxLength(10), Validators.minLength(10), Validators.pattern(mobnumPattern)]],
      email: [this.userInfo.email, [Validators.required, Validators.email]],
      address: [this.customerAddress]
    })
    //End of myAccount Form validation and initialization 

    /** @description On change in email address setting isEmailVerify flag */
    this.myAccount.get('email').valueChanges.subscribe(changedEmail => {
      console.log(this.loginService.customerInfo.isEmailVerify, "this.loginService.customerInfo.isEmailVerify");
      if (this.loginService.customerInfo.isEmailVerify) {
        if (changedEmail != this.loginService.customerInfo.email) {
          this.userInfo.isEmailVerify = false;
          console.log("this.userInfo.isEmailVerify ==false", this.userInfo.isEmailVerify)
        }
        else {
          this.userInfo.isEmailVerify = true;
          console.log("this.userInfo.isEmailVerify ==True", this.userInfo.isEmailVerify)
        }
      }
      else {
        this.userInfo.isEmailVerify = false;
      }
    })
    // console.log(this.myAccount.controls['name'].value,"name form control");
  }
  //End of ngOnInit

  /** @description Get fields for validation */
  get name() {
    return this.myAccount.get('name');
  }
  get weight() {
    return this.myAccount.get('weight');
  }
  get height() {
    return this.myAccount.get('height');
  }
  get dateOfBirth() {
    return this.myAccount.get('dateOfBirth');
  }
  get phone() {
    return this.myAccount.get('phone');
  }
  get email() {
    return this.myAccount.get('email');
  }
  get address() {
    return this.myAccount.get('address');
  }

  /** @description Navigation to Insurance Card Page */
  toInsuranceCard() {
    this.navCtrl.push(InsuranceCardPage)
  }
  /** @description Navigation to Profile Image Page */
  profilePictureChange() {
    this.navCtrl.push(ProfileImagePage);
  }
  /** @description updating email address and verify after it */
  updateEmail() {
    this.fba.logEvent("profile_update_email", "Click confirm to update email");
    this.linkClicked = true;
    this.myAccountService.updateEmail(this.myAccount.controls['email'].value).then((res) => {
      console.log(res, "updateEmail Service Response");
      this.userInfo.email = this.myAccount.controls['email'].value;
      console.log("1 1 1 ", this.userInfo.email)
      //also setting new value of email in cache Storage
      this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res) => {
        this.cacheObject = res;
        console.log("cache object 2 ", this.cacheObject)
        this.cacheObject.email = this.myAccount.controls['email'].value;
        console.log("cache email new set ", this.cacheObject.email)
        console.log(this.myAccount.controls['email'].value)
        console.log(" TOTAL NEW cache new set ", this.cacheObject)
        this.cacheService.setCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS, this.cacheObject);
      }, (err) => {
      });
      this.verifyEmail();
    },
      err => {
        console.log(err, "updateEmail Service Error");
      });
  }
  /** @description verifying email address after updating email address */
  verifyEmail() {
    this.linkClicked = false;
    console.log(this.linkClicked, "linkClicked");
    const userData = {
      isSCBCustomer: true,
      type: "myAccount",
      email: this.myAccount.controls['email'].value
    }
    this.navCtrl.parent.parent.push(EnterOtpPage, { 'data': userData });
  }
  /** @description checking form validation status before saving it */
  checkFormValidation() {
    if (this.isSCBCustomer) {
      if (this.myAccount.controls['phone'].value.indexOf('XXX') == 0 && this.myAccount.invalid && this.myAccount.controls['email'].status == "VALID") {
        this.onSubmit();
      }
      else {
        this.toastService.presentToast("Form is Invalid! Unable to save user data.");
      }
    }
    else {
      if (this.myAccount.invalid) {
        if (this.myAccount.controls['phone'].value.indexOf('XXX') == 0 && this.myAccount.controls['email'].status == "VALID") {
          this.onSubmit();
        }
        else {
          this.toastService.presentToast("Form is Invalid! Unable to save user data.");
        }
      }
      else {
        this.onSubmit();
      }
    }
  }

  /** @description Submitting data to backend */
  onSubmit() {
    /** @description sending data to API according to form status */
    if (this.myAccount.controls['name'].value == "โปรไฟล์") {
      this.myAccount.get('name').setValue("");
    }

    if (this.myAccount.controls['phone'].value != null) {
      if (this.myAccount.controls['phone'].value.indexOf('XXX') == 0) {
        this.myAccount.controls['phone'].setValue(this.userInfo.customerContacts[0].phone);
      }
    }
    if (this.myAccount.controls['address'].value == null) {
      this.userAddr = "";
    }
    else {
      this.userAddr = this.myAccount.controls['address'].value;
    }

    /** @description data object sending to API */
    let data = {
      customerId: this.urm,
      firstName: this.myAccount.controls['name'].value,
      lastName: "",
      dateOfBirth: this.myAccount.controls['dateOfBirth'].value,
      gender: this.myAccount.controls['gender'].value,
      height: this.myAccount.controls['height'].value,
      weight: this.myAccount.controls['weight'].value,
      address: this.userAddr,
      phoneNumber: this.myAccount.controls['phone'].value,
      email: this.myAccount.controls['email'].value,
      customerType: this.customerType,
      isEmailVerify: this.userInfo.isEmailVerify
    }
    // if(this.userName == 'โปรไฟล์'){
    //   data.firstName = "";
    // }
    // console.log(data, "prospect Customer Data $$$111");

    /** @description save prospect customer API call */
    this.myAccountService.prospectCustomer(this.prospectCustomerResponse, data);

    // this.logger.log("form submitted", this.myAccount.value);
  }

  /** @description unmasking phone number on click on edit */
  editNumber() {
    if (this.edittelephoneNumber) {
      console.log(this.myAccount.controls['phone'].value, "this.myAccount.controls['phone'].value in editnumber");
      this.edittelephoneNumber = false;
      if (this.userInfo.customerContacts != null) {
        this.myAccount.get('phone').setValue(this.userInfo.customerContacts[0].phone);
      }
    }
  }
  /** @description setting input field to blank if user name is "โปรไฟล์" */
  editUserName() {
    if (!this.editName) {
      this.editName = true;
      if (this.myAccount.controls['name'].value == "โปรไฟล์") {
        this.myAccount.get('name').setValue("");
      }
    }

  }
  /** @description masking phoneNumber */
  masked(): string {
    if (!this.edittelephoneNumber) {
      if (this.userInfo.customerContacts != null) {
        return this.userInfo.customerContacts[0].phone;
      } else {
        return "";
      }
    } else {
      let value = this.userInfo.customerContacts != null ? this.userInfo.customerContacts[0].phone : '';
      // console.log('value', value);
      let lastdigits;
      let masked;

      if (value == null) {
        // console.log('if');
        return "";
      } else {
        let len = value.length;
        if (len >= 9) {
          lastdigits = value.substring(len - 4, len);
          masked = "XXX-XXX-" + lastdigits;
        } else {
          masked = value;
        }
      }
      return masked;
    }
  }
}
