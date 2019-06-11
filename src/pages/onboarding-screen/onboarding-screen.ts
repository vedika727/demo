import { LoadingServiceProvider } from './../../providers/ion-service/loading-service';
import { AppInit } from './../../providers/app-init-service/appinit-service';
import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { NoInternetPage } from './../pages';
import { ModalServiceProvider } from './../../providers/modal-service/modal-service';
import { LogServiceProvider } from './../../providers/data-service/log-service';
import { DeviceInfoServiceProvider } from './../../providers/deviceInfo-service/deviceInfo-service';
import { CacheServiceProvider } from './../../providers/ion-service/cache-service';
import { IonicPage, NavController, Tabs } from "ionic-angular";
import { KEY_IS_DEVICE_REGISTERED } from '../../common/constants/config';
import { RegisterUserPage, TabsPage } from "../pages";
import { Component, OnInit } from "@angular/core";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { RegistrationProcessProvider } from '../../providers/registration-process-service/registration-process';
import { RegisterDeviceProvider } from '../../providers/register-device/register-device';
import { BaseApp } from './../../app/base'
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { TranslateService } from 'ng2-translate';
/**
 * @author Kundan Patil
 * @description Onboarding screen with slider .
 */

@IonicPage()
@Component({
  selector: "page-onboarding-screen",
  templateUrl: "onboarding-screen.html"
})
export class OnboardingScreenPage extends BaseApp implements OnInit {

  tempVar: any;

  constructor(
    public navCtrl: NavController,
    private RegistrationProcessProvider: RegistrationProcessProvider,
    private fba: FirebaseAnalyticsService,
    private cacheService: CacheServiceProvider,
    private registerDevice: RegisterDeviceProvider,
    private deviceInfoService: DeviceInfoServiceProvider,
    private logger: LogServiceProvider,
    public modalService: ModalServiceProvider,
    public toastService: ToastServiceProvider,
    public appInit: AppInit,
    public loadingService: LoadingServiceProvider,
    public translate: TranslateService
  ) {
    super();
    //set flag for first time when app is open for first time
    this.RegistrationProcessProvider.setValue("firstTimeAppOpen", true);
    // FBA anylatics data 
    this.fba.setCurrentScreen("register_tutorial_start");
    // FBA Event 
    this.fba.logEvent("register_tutorial_start", "Start tutorial session");
  }

  genericActionDeviceInfoRetry = <IDialogButton<any>>{
    name: this.translate.instant('errors.errorButtons.next'),
    click: (data?) => {
      this.logger.debug("callback from retry");
      this.showGenericView = true;
      this.checkIfDeviceRegistered();
    }
  }

  // deviceResponse = <IServiceResponse<any>>{
  //   success: (data: any) => {
  //     // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
  //     console.log("REsponse objcet : ", data);
  //     this.toastService.presentToast("device registered successfully");
  //   },
  //   fail: (errorService) => {
  //     console.log("deviceResponse Error - ", errorService)
  //     // this.toastService.presentToast("device registered successfully");
  //     this.toastService.presentToast(errorService.resonseErrorMessage);

  //   },
  //   systemFailure: (errorService) => {
          
  //     this.toastService.presentToast(errorService.errorMessage);
  //   },

  //   progress: (isProgress) => {
  //     this.loadingService.isLoading(isProgress);
  //   }
  // }


  ngOnInit(): void {
    this.registerDevice.registerDeviceInfo();
  }


  ionViewDidEnter() {
    // this.appInit.registerService(this.deviceResponse);
  }


  Apply() {
    this.cacheService.setCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED, false);
    this.navCtrl.setRoot(RegisterUserPage);
  }


  gotopage() {
    // FBA Event
    this.cacheService.setCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED, false);
    this.fba.logEvent("register_tutorial_skip", "Skip tutorial session");
    this.navCtrl.setRoot(TabsPage);
  }

  /**
   * this method will get all device data and call register device info
   */

  checkIfDeviceRegistered() {
    // this.appInit.registerService(this.deviceResponse);
  }
}