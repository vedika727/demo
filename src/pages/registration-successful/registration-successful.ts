import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { RegistrationServivceProvider } from '../../providers/registration-service/registration-service';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { BaseApp } from '../../app/base';
import { Broadcaster } from "@ionic-native/broadcaster";
import { FitsenseServiceProvider } from "./../../providers/homepage-module/fitsense-service/fitsense-service";
import { DeviceInfoServiceProvider } from '../../providers/deviceInfo-service/deviceInfo-service';
import { TabsPage } from '../pages';

/**
 * @author Kundan Patil
 * @description Registration successfull page
 */

@IonicPage()
@Component({
  selector: "page-registration-successful",
  templateUrl: "registration-successful.html"
})
export class RegistrationSuccessfulPage extends BaseApp {
  dataForProcessActionComponent: any;
  public headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  registerSCBLifeCustomer: any;
  emailRegistered: string = "";
  show200points: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fba: FirebaseAnalyticsService,
    public loginService: LoginServivceProvider,
    public registrationSuccess: RegistrationServivceProvider,
    private cacheService: CacheServiceProvider,
    public fitsenseService: FitsenseServiceProvider,
    private broadcaster: Broadcaster,
    public deviceInfoService: DeviceInfoServiceProvider,
    public injector?: Injector) {
    super(injector);

    // get Registration complete process data
    this.registerSCBLifeCustomer = this.registrationSuccess.registerUserDetails;
   // this.cacheService.setCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED, false);

    console.log(this.registerSCBLifeCustomer, '!!!!');
    this.emailRegistered = this.registerSCBLifeCustomer['email'];
    // Log event fba
    this.fbaLogEvent();

    this.dataForProcessActionComponent = {
      iconName: "scbl-success",
      title: "registration.registrationSuccessful",
      message: "registration.regSuccessMessageBody",
      buttonText: "registration.regSuccessBtn",
      headMessage: "registration.regSuccessHeadMessage",
      headMessage2: "registration.regSuccessHeadMessage2"
    };
    this.headerInput.isBackButton = false;
    this.headerInput.nav = this.navCtrl;

    //To Subscibe to Fitsense Navigation Events
    if (this.deviceInfoService.isRunningOnDevice()) {
      this.subscribeToFitsense();
    }
  }

  navigatePage() {
    this.navCtrl.setRoot(TabsPage);
  }


  toFitsenseRegistration() {
    //To show the FItsense Onboarding Screen
    this.fitsenseService.startFitsenseScreen(this.CONSTANT.KEY_FITSENSE_ONBOARDING_SCREEN, 0);
  }

  fbaLogEvent() {
    if (this.registerSCBLifeCustomer['existingCustomer'] == 'Yes') {
      this.fba.setCurrentScreen("register_complete_customer");
      // conditon by Yash
      console.log('@@@@1', this.registerSCBLifeCustomer);
      this.show200points = true;
      //
    } else if (this.registerSCBLifeCustomer['existingCustomer'] == 'No') {
      this.fba.setCurrentScreen("register_complete_prospect");
      //condition by Yash
      console.log('@@@@2', this.registerSCBLifeCustomer);
      this.show200points = false;
    }
  }


  /***
 * @description- this method accepts data for analytics from
 * Fitsense Scrrens using local Broadcast Receiver ;
 *
 */
  subscribeToFitsense() {
    // .filter(event => event.result == true)
    this.broadcaster
      .addEventListener("onboarding")
      .subscribe(event => {
        // debugger;
        console.log("onboarding event subscribe = ", event);;
        // var height = this.loginService.tabBarHeight;
        this.cacheService.setCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED, event.result);
        // console.log(">>> onboarding event in Ionic Height == " + height);
        // if (height == undefined || height == null) {
        // console.log('>>> onboarding event in Ionic Height == if condition ==' + height);
        this.navigatePage();
        // }
      });
  }
}
