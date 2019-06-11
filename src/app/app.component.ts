import { BaseApp } from "./base";
import { ModalServiceProvider } from "./../providers/modal-service/modal-service";
import { Component, ViewChild, OnInit, NgZone, Injector } from "@angular/core";
import { Nav, Platform, MenuController, App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import {
  OnboardingScreenPage,
  LoginPage,
  RegisterUserPage,
  MyAccountPage,
  NotificationsPage,
  SessionTimeOutPage,
  DeviceAlreadyRegisteredPromptPage,
  MenuPage
} from "../pages/pages";
import { LoginServivceProvider } from "../providers/login-module/login-service/login-service";
import { PushNotificationDynamicLinkService } from "../providers/firebase-service/pnotification-dlink-service";
import { TranslateService } from "ng2-translate";
import { Events } from "ionic-angular";
import { CacheServiceProvider } from "../providers/ion-service/cache-service";
import { RegistrationProcessProvider } from "../providers/registration-process-service/registration-process";
import { Broadcaster } from "@ionic-native/broadcaster";
import { CodePush, SyncStatus, InstallMode } from "@ionic-native/code-push";
import { LoadingServiceProvider } from "../providers/ion-service/loading-service";
import { SecureStorageProvider } from "../providers/secure-storage/secure-storage";
import { RegisterDeviceProvider } from "../providers/register-device/register-device";
import { DeviceInfoServiceProvider } from "../providers/deviceInfo-service/deviceInfo-service";
import { TooltipServiceProvider } from "../providers/tooltip-service/tooltip-service";
import { FitsenseServiceProvider } from "../providers/homepage-module/fitsense-service/fitsense-service";
import { FirebaseAnalyticsService } from "../providers/firebase-service/firebase-analytics-service";
import { SharedataProvider } from "../providers/sharedata/sharedata";
/**
 * @author Sandesh Uttarwar
 * @description This method is used to open modal through sidemenu
 */

declare var window: any;

@Component({
  templateUrl: "app.html"
})
export class MyApp extends BaseApp implements OnInit {
  splash: boolean;
  showSplash = true; // <-- show animation
  isScblifeCustomer: boolean;
  ngOnInit(): void { }
  @ViewChild(Nav)
  nav: Nav;

  rootPage: any;
  pages: Array<{ title: string; component: any }>;
  placeholder = "assets/scbl-icons/default-profile-picture.svg";
  userAppState: boolean = false;
  myVal: number = 0;
  progressStatus: string = "";
  progressCounter: number = 1;
  userInfo = this.loginService.customerInfo;
  constructor(
    private cacheService: CacheServiceProvider,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private translateService: TranslateService,
    private loginService: LoginServivceProvider,
    public modalService: ModalServiceProvider,
    public menu: MenuController,
    private registrationProcessProvider: RegistrationProcessProvider,
    private broadcaster: Broadcaster,
    private events: Events,
    private codePush: CodePush,
    public ngZone: NgZone,
    private loadingService: LoadingServiceProvider,
    private secureStorage: SecureStorageProvider,
    private registerDevice: RegisterDeviceProvider,
    public deviceInfoService: DeviceInfoServiceProvider,
    public app: App,
    private pNotificationDLink: PushNotificationDynamicLinkService,
    public toolTipService: TooltipServiceProvider,
    public fitsenseService: FitsenseServiceProvider,
    public firebaseAnalytic: FirebaseAnalyticsService,
    public sharedataservice: SharedataProvider,
    public injector?: Injector
  ) {
    super(injector);

    console.log("After GetCache Service in App Component");

    // Default lang is Thai
    this.translateService.setDefaultLang(this.CONSTANT.DEFAULT_APP_LANGUAGE);
    //calling this method checks for dy links and push notifications
    platform.ready().then(() => {
      this.secureStorage.initStorage("");

      //this method is called to enable message receiving from push notification and dynamic links
      this.initDyLinkAndPushNotifications();
      //console.log("Device Id" + this.device.uuid);
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString("#ffffff");
      if (this.platform.platforms().indexOf("cordova") >= 0) {
        //For tracking and monitoring app
        this.appsflyer();
        //this method is called to check if notification received when app starts
        this.pNotificationDLink.receivedNotificationMessage();
      }
      this.statusBar.styleDefault();

      // <-- hide animation after 3s
      //this method is called for checking if any changes in app arenpm avialable;if so updtae app
      // this.updateCode();
      this.statusBar.overlaysWebView(false);
      this.menu.swipeEnable(false);
      this.statusBar.hide();
      this.statusBar.styleLightContent();
      this.loadApp();
      if (this.deviceInfoService.isRunningOnDevice()) {
        this.subscribeToFitsense();
      }
    });

    //this method is added here to check if any notification message is received when app resume
    this.onResume();
  }

  /**
   * @description - this method called when only user accepted the android permissions.
   */
  loadApp() {
    console.log("loadApp called");
    //- add descritpion here--
    console.log("load app called");
    this.initializeApp();
  }

  startFunction() {
    setTimeout(() => (this.splash = false), 300);
  }

  initializeApp() {
    console.log("app initialized");
    // this.checkifAppOpensFirstTime();
    this.registerDevice.registerDeviceInfo();
    //  this.cacheService.getCache(this.CONSTANT.TOOL_TIPS_STATUS).then((res)=>{
    //    this.toolTipService.toolTipVerify = res;
    //  },err=>{
    //    this.cacheService.setCache(this.CONSTANT.TOOL_TIPS_STATUS, this.toolTipService.toolTipVerify);
    //  });
    setTimeout(() => {
      var state = this.cacheService
        .getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED)
        .then(
          (res: any) => {
            console.log("cache checked");
            if (res == true) {
              console.log(
                "<y> found isregistered in cache: now will go to login page",
                res
              );
              this.nav.setRoot(LoginPage);
            } else {
              this.nav.setRoot(RegisterUserPage);
              console.log(
                "<y> didnt find isregistered in cache: now will go to reg page",
                res
              );
            }
          },
          err => {
            /*the if condition is added for checking 
           if app opens through dynamic link and user is not registered */
            if (this.pNotificationDLink.deepLinkObject.call2action) {
              this.nav.setRoot(
                this.pNotificationDLink.deepLinkObject.call2action
              );
              this.pNotificationDLink.clearDeepLinkObject();
            } else {
              this.nav.setRoot(OnboardingScreenPage);
            }
          }
        );
    }, 500);

    this.events.subscribe("user:logout", data => {
      this.isScbCustomer();
      this.deviceInfoService.bearerToken = "";
      console.log("Session expired - ", data);
      let isCodeDefined: boolean = false;
      // case added if their is another error code occure then need to show it.
      if (data.status) {
        isCodeDefined = true;
        switch (data.status.code) {
          case this.CONSTANT.CODE_E_USER_REGISTERED_ON_ANOTHER_DEVICE:
            this.modalService.presentModal(DeviceAlreadyRegisteredPromptPage, {
              isScbLifeCustomer: this.isScblifeCustomer
            });
            break;
          default: {
            this.app.getRootNav().setRoot(LoginPage, { data: true });
          }
        }
      }
      // this.nav.setRoot(LoginPage, { 'data': true });
      if (!isCodeDefined) {
        this.app.getRootNav().setRoot(LoginPage, { data: true });
      }
    });

    this.events.subscribe("MULTIPLE_REGISTRATION", data => {
      this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res: any) => {
        this.isScblifeCustomer = res.isScblifeCustomer;
        // case added if their is another error code occure then need to show it.
        if (data.status) {
          switch (data.status.code) {
            case this.CONSTANT.CODE_E_USER_REGISTERED_ON_ANOTHER_DEVICE:
              this.modalService.presentModal(DeviceAlreadyRegisteredPromptPage, {
                isScbLifeCustomer: this.isScblifeCustomer
              });
              break;
            default: {
              this.app.getRootNav().setRoot(LoginPage, { data: true });
            }
          }
        }
      }, err => {
        console.log(err, "loggedInUserDetails error");
      });
    });

    this.loginService.getProfilePic();
    // Okay, so the platform is ready and our plugins are available.
    // Here you can do any higher level native things you might need.
    // logs the current orientation, example: 'landscape'
    this.statusBar.styleDefault();
    console.log(this.loginService.isLoggedIn);
  }

  getCacheValue(key: string) {
    return new Promise((resolve, reject) => {
      var state = this.registrationProcessProvider.getValue(key);
      state.then(
        (res: any) => {
          resolve(res);
        },
        res => {
          reject(res);
        }
      );
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page);
  }

  openMoal(page) {
    this.modalService.presentModal(page);
  }

  /**
   * @description - this method initalizes push notifications and dynamic link
   */
  initDyLinkAndPushNotifications() {
    this.pNotificationDLink.initDynamicLink();
    this.pNotificationDLink.initPushNotification();
    // this.events.subscribe(this.CONSTANT.SUB_NOTIFICATION_RECEIVED, (data: any) => {
    //   console.log("data received from notification");
    //   console.log(data.additionalData);
    // });
    this.events.subscribe(this.CONSTANT.SUB_REGISTRATION, (data: any) => {
      console.log(" Notification ID", data.deviceToken);
    });
  }

  /**
   * @description - This method is for tracking and monitoring
   */
  appsflyer() {
    console.log("In appsflyer");
    var options = {
      devKey: "dvHtMyRQCK5nHkU2hZHiuW",
      isDebug: false,
      onInstallConversionDataListener: true
    };
    if (this.platform.is("ios")) {
      options["appId"] = "1409529297"; // your ios app id in app store
    }
    var onSuccess = function (result) {
      console.log(" In appsflyer Success");
    };
    function onError(err) {
      console.log("Error initializing AppsFlyser SDK");
    }
    //window.plugins.appsFlyer
    window.plugins.appsFlyer.initSdk(options, onSuccess, onError);
  }

  // /***
  //  * @description- this method accepts data for analytics from
  //  * Fitsense Scrrens using local Broadcast Receiver ;
  //  *
  //  */
  // subscribeToFitsense() {
  //   this.broadcaster
  //     .addEventListener("screenID")
  //     .subscribe(event =>
  //       console.log(">>> Navigate to screenID " + event.screenID)
  //     );
  // }

  /**
   * @author Sumit Lokhande
   * @description- this method is used for updating the
   * new code from code-push
   */
  // updateCode() {
  //   this.platform.ready().then(() => {

  //     this.loadingService.presentLoading();
  //     this.codePush
  //       .sync({
  //         installMode: InstallMode.IMMEDIATE
  //       })
  //       .subscribe(status => {
  //         if (status == SyncStatus.CHECKING_FOR_UPDATE)
  //           console.log("CHECKING_FOR_UPDATE");
  //         if (status == SyncStatus.DOWNLOADING_PACKAGE)
  //           console.log("DOWNLOADING_PACKAGE");
  //         if (status == SyncStatus.IN_PROGRESS) console.log("IN_PROGRESS");
  //         if (status == SyncStatus.INSTALLING_UPDATE)
  //           console.log("INSTALLING_UPDATE");
  //         if (status == SyncStatus.UP_TO_DATE) {
  //           this.showSplash = false;
  //           this.loadingService.dismissLoading();
  //           console.log("UP_TO_DATE");
  //         }
  //         if (status == SyncStatus.UPDATE_INSTALLED) {
  //           this.showSplash = false;
  //           this.loadingService.dismissLoading();
  //           console.log("UPDATE_INSTALLED");
  //         }
  //         if (status == SyncStatus.ERROR) {
  //           this.showSplash = false;
  //           this.loadingService.dismissLoading();
  //         }
  //         console.log("ERROR");
  //       });
  //   });
  // }

  /**
   * @description- this method gets called everytime when apps resumes from background
   */
  onResume() {
    this.platform.resume.subscribe(res => {
      console.log("app resume", res);
      this.pNotificationDLink.receivedNotificationMessage();
    });
  }

  /***
   * @description- this method accepts data for analytics from
   * Fitsense Scrrens using local Broadcast Receiver ;
   *
   */
  subscribeToFitsense() {
    //Subscribe to Fitsense Onboarding Event
    this.broadcaster
      .addEventListener("onboarding")
      // .filter(event => event.result == true)
      .subscribe(event => {
        console.log("onboarding event subscribe from app component =", event);
        console.log(">>> onboarding Event in App Component " + event.result);
        this.cacheService.setCache(
          this.CONSTANT.KEY_IS_FITSENSE_REGISTERED,
          true
        );
      });

    //this.endFitsenseScreen();
    console.log("In subscribeToFitsense:In App Component");
    //Subscribe to Fitsense ionicNavigation Event
    this.broadcaster.addEventListener("ionicNavigation").subscribe(event => {
      console.log("BANTI", JSON.stringify(event));
      this.endFitsenseScreen();
      switch (event.screenID) {
        case "Profile":
          this.app.getActiveNav().push(MyAccountPage);
          break;
        case "Notification":
          this.app.getActiveNav().push(NotificationsPage);
          break;
        default:
          break;
      }
    });
    this.broadcaster
      .addEventListener("reactNativeNavigation")
      .subscribe(event => {
        console.log("BANTI SUTAR ::", JSON.stringify(event));
        //  if(event.screenID == 'ChallengesMain'){
        //   this.sharedataservice.setFitsenseStatus("ChallengesMain");
        //   this.fitsenseService.isChallengeScreenCalled == true
        //   //this.app.getActiveNav().parent.select(1);
        //  }else{
        //   this.sharedataservice.setFitsenseStatus("ChallengesMainClose");
        //   this.fitsenseService.isChallengeScreenCalled == false;
        //  }
      });

    //this listner will capture fitsense alanlytics and submit it to scb firebase
    this.broadcaster.addEventListener("fitsenseAnalytics").subscribe(event => {
      console.log("In fitsenseAnalytics event", JSON.stringify(event));
      // if(event.eventName == 'challenge_listing'){
      //   this.app.getActiveNav().parent.select(1)
      // }
      switch (event) {
        case event.screenName:
          this.firebaseAnalytic.setCurrentScreen(event.screen);
          break;

        case event.eventName:
          console.log("In event.eventName", JSON.stringify(event));
          this.firebaseAnalytic.logEvent(
            event.eventName,
            event.measurableMetric
          );
          break;
      }
    });
  }

  endFitsenseScreen() {
    this.fitsenseService.endFitsenseScreen();
  }

  async isScbCustomer() {
    await this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res: any) => {
      debugger;
      this.isScblifeCustomer = res.isScblifeCustomer;
    }, err => {
      console.log(err, "loggedInUserDetails error");
    });
  }
}
