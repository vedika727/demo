import { FirebaseAnalyticsService } from './../../providers/firebase-service/firebase-analytics-service';
import { MyAccountServiceProvider } from './../../providers/my-account-service/my-account-service';
import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { LoginServivceProvider } from './../../providers/login-module/login-service/login-service';
import { IServiceResponse } from './../../common/service-models/iServiceResponse';
import { CacheServiceProvider } from "./../../providers/ion-service/cache-service";
import { ScbHeaderInputs } from "./../../components/scb-header/scb-header";
import { Component, OnInit, NgZone, Injector } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SetPinPage } from "../../pages/pages";
import { LoadingServiceProvider } from "../../providers/ion-service/loading-service";
import { BaseApp } from '../../app/base';
import { RegistrationServivceProvider } from "../../providers/registration-service/registration-service";
/**
 * @author - Sumit Lokhande
 * @description - This file contains functions related to settings page
 */
@IonicPage()
@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage extends BaseApp implements OnInit {
  headerInputs: ScbHeaderInputs = new ScbHeaderInputs();
  unlockType: string;
  isScblifeCustomer: any;
  userInfo: any
  data: any = {};
  customerId: String;
  isPushNotification: boolean;
  isMobile: any;
  isEmail: any;
  isNotification: any;
  settingObj: { this: any; };
  urm: {};
  setSettings: {
    isMobile: String,
    isEmail: String,
    isNotification: String
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cacheService: CacheServiceProvider,
    private loadingService: LoadingServiceProvider,
    public registerService: RegistrationServivceProvider,
    public loginService: LoginServivceProvider,
    public toastService: ToastServiceProvider,
    public myAccountService: MyAccountServiceProvider,
    private zone: NgZone,
    private fba :FirebaseAnalyticsService,
    public injector?: Injector) {
    super(injector);
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;
    this.unlockType = 'fingure';
    this.urm = this.CONSTANT.URM_ID;
    console.log("URMID Id in Settings " + this.urm);
    this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then(
      (res: any) => {
        console.log('user profile is ', res);
        this.userInfo = res;
        this.isScblifeCustomer = res ? res.isScblifeCustomer : false;
      },
      err => {
        console.log(err, "loggedInUserDetails error")
      }
    );
  }

  ionViewDidEnter() {
    this.fba.logEvent('menu_setting', 'Click setting button');
  }

  getSettingResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
      console.log("get Setting Response obj. : ", data);
      this.mapSettings(data)
    },
    fail: (errorService) => {
      console.log("get Setting Error - ", errorService);
    },
    systemFailure: (errorService) => {
      console.log("get Setting Error system ", errorService);
    },

    progress: (isProgress) => {
      console.log('Progrss status ', isProgress)
      this.isLoading(isProgress);

    }
  }

  setSettingResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
      console.log("set Setting Response obj. : ", data);
    },
    fail: (errorService) => {
      console.log("set Setting Error - ", errorService)
    },
    systemFailure: (errorService) => {

      console.log("set Setting Error system ", errorService)
    },

    progress: (isProgress) => {
      this.isLoading(isProgress);
    }
  }

  mapSettings(data) {
    this.zone.run(() => {
      this.isMobile = data.result.isMobile === "Y" ? true : false;
      this.isEmail = data.result.isEmail === "Y" ? true : false;
      // this.isNotification = data.result.isNotification === "Y" ? true : false;
    });

  }

  ngOnInit() {
    // this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res) => {
    //   this.urm = res;
    //   console.log(res,"urm from cache response in setting $umit");
    // });
    this.myAccountService.getSettings(this.getSettingResponse, this.urm)
    // if push Notification activate then setting up notification button active
    this.cacheService.getCache(this.CONSTANT.KEY_NOTIFICATION_STATUS).then(res => {
      res === true ? this.isPushNotification = true : "";
    });
    this.loadingService.presentLoading();
    this.cacheService.getCache(this.CONSTANT.KEY_BIOMETRIC_TYPE).then(res => {
      this.loadingService.dismissLoading();
      if (res == "face") {
        this.unlockType = 'face';
        console.log('face detected');
      }
    }, err => {
      this.unlockType = 'fingure';
      this.loadingService.dismissLoading();
    });
  }

  /** @description Navigation to set pin page */
  toChangePIN() {
    this.fba.logEvent("setting_update_pin","Update pin code");

    this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((result: any) => {
      let setRegDetails = {
        email: result.email
      }
      if (result.isScblifeCustomer) {
        setRegDetails["existingCustomer"] = "Yes";
        setRegDetails["authenticationID"] = result.customerIdentity;
      } else {
        setRegDetails["existingCustomer"] = "No";
      }
      // registration details needs during registration flow so setting up in service.
      this.registerService.verifyAndSetRegDetail(setRegDetails);
      // this.data['type'] = "forgotPin";
      this.data['type'] = "forgotPin";
      this.data['isSCBCustomer'] = result.isScblifeCustomer;
      this.navCtrl.parent.parent.push(SetPinPage, { 'data': this.data });
    });
    // here if error block added means user is not registered in app hense not added error catch block 
  }
  updateSettings() {
    const settingsPostObj = {
      isMobile: this.isMobile ? "Y" : "N",
      isEmail: this.isEmail ? "Y" : "N",
      isNotification:"N",
      // isNotification: this.isNotification ? "Y" : () => {
      //   settingsPostObj.isMobile = "N";
      //   settingsPostObj.isEmail = "N";
      //   return "N";
      // },
      customerId: this.urm
    }
    console.log(settingsPostObj, "settings OBject");
    this.myAccountService.setSettings(this.setSettingResponse, settingsPostObj);
  }
  pushNotification(status) {
    this.cacheService.setCache(this.CONSTANT.KEY_NOTIFICATION_STATUS, status);
  }
}
