import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { FitsenseServiceProvider } from '../../providers/homepage-module/fitsense-service/fitsense-service';
import { RegistrationProcessProvider } from '../../providers/registration-process-service/registration-process';
import { BaseApp } from '../../app/base';
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { RegisterUserPage, MyAccountPage, NotificationsPage } from '../pages';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { CmsServiceProvider } from '../../providers/cms-service/cms-service';
import { WeeklyContent } from '../../common/models/cms-weekly.class';
import { DeviceInfoServiceProvider } from '../../providers/deviceInfo-service/deviceInfo-service';
import { Broadcaster } from '@ionic-native/broadcaster';



@IonicPage()
@Component({
  selector: 'page-activity-full-view',
  templateUrl: 'activity-full-view.html',
})
export class ActivityFullViewPage extends BaseApp {

  ActivityStateIcon1: any;
  isRegistered: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  dashboardheader: any;
  isFitsenseRegister: any;
  //Fitsense variables
  activityScoreToday: any;
  activityScoreGoal: any;
  StateIcon: any;
  ActivityStateIcon: any;
  weeklyContentList: WeeklyContent[] = new Array(0);

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private cacheService: CacheServiceProvider,
    public loginService: LoginServivceProvider,
    public fitsenseService: FitsenseServiceProvider,
    public registrationProvider: RegistrationProcessProvider,
    public cmsService: CmsServiceProvider,
    public deviceInfoService: DeviceInfoServiceProvider,
    private broadcaster: Broadcaster) {
    super();
    if (this.deviceInfoService.isRunningOnDevice()) {
      this.subscribeToFitsense();
    }
    this.headerInput.nav = navCtrl;
    this.headerInput.isProfile = true;
    this.headerInput.nav = navCtrl;

    this.headerInput.isNotification = true;
    this.activityScoreToday = this.fitsenseService.fitsense.activityToday;
    this.activityScoreGoal = 100;
    this.ActivityStateIcon = "Fitsense-bages-Bronze";
    this.StateIcon = this.fitsenseService.fitsense.statusLevel;
    this.ActivityStateIcon1 = this.fitsenseService.fitsense.statusLevel;
    if (this.ActivityStateIcon1 == "gold") {
      this.ActivityStateIcon = "Fitsense-bages-Gold";
    } else if (this.ActivityStateIcon1 == "bronze") {
      this.ActivityStateIcon = "Fitsense-bages-Bronze";
    } else {
      this.ActivityStateIcon = "Fitsense-bages-Silver";
    }
    this.dashboardheader = {
      "title": 'FitSense',
      "icon": 'scbl-fitsense'
    }
    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got is Registered', res);
      this.isRegistered = res;
      // if(this.isRegistered){
      //   this.openFitsenseScreen("ActivityMain")
      // }
    }, (err) => {
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    })

    this.cacheService.getCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED).then((res) => {
      console.log('got is Registered to fitsense', res);
      this.isFitsenseRegister = res;

    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd to fitsense', err);
      // this.isRegistered = err;
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityFullViewPage');
    this.weeklyContentList = this.cmsService.weeklyContentList;

  }
  /**
    * @author Manish
    * @description Function to assign fitsense score value to range slider.
    */
  activeRangeWidth() {
    if (this.activityScoreToday > this.activityScoreGoal)
      return "100";
    else
      return (this.activityScoreToday / this.activityScoreGoal) * 100;
  }
  subscribeToFitsense() {
    // .filter(event => event.result == true)
    this.broadcaster
      .addEventListener("onboarding")
      .subscribe(event => {
        // debugger;
        console.log("onboarding event subscribe = ", event);;
        // var height = this.loginService.tabBarHeight;
        this.cacheService.setCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED, true);
        // console.log(">>> onboarding event in Ionic Height == " + height);
        // if (height == undefined || height == null) {
        // console.log('>>> onboarding event in Ionic Height == if condition ==' + height);
       // this.navigatePage();
        // }
      });
  }
  ionViewDidEnter() {
    debugger;
    this.cacheService.getCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED).then((res) => {
      console.log('got is Registered to fitsense', res);
      this.isFitsenseRegister = res;
      if (this.isRegistered) {
        if (this.fitsenseService.isChallengeScreenCalled) {
          this.openFitsenseScreen("ChallengesMain")
          this.dashboardheader = {
            "title": 'FitSense',
            "icon": 'scbl-fitsense'
          }
        } else {
          if (this.isFitsenseRegister && this.fitsenseService.isFitStatusScreenCalled) {
            let screenInfo: any;
            screenInfo = {
              "ScreenIDLevel1": "ActivityMain",
              "ScreenIDLevel2": "Explainer"
            }
            var height = this.loginService.tabBarHeight;
            //this.navCtrl.parent.select(1);
            this.fitsenseService.isFitStatusScreenCalled = false;
            this.fitsenseService.startFitsenseScreen(screenInfo, height);
          }else  if (this.isFitsenseRegister) {

            this.openFitsenseScreen("ActivityMain");
          }else{
            console.log("IsFitsense Flag Value :::",this.isFitsenseRegister);
            this.fitsenseService.endFitsenseScreen();
          }
        }
      } else {
        this.fitsenseService.endFitsenseScreen();
      }

    }, (err) => {
      console.log('DIDNT GET isregesiterd to fitsense', err);

    })
  }
  openFitsenseScreen(screenID) {
    var height = this.loginService.tabBarHeight;
    //this.navCtrl.parent.select(1);
    this.fitsenseService.startFitsenseScreen(screenID, height);
  }
  gotoRegister() {
    this.navCtrl.parent.parent.setRoot(RegisterUserPage)
  }
  runFitsense() {
   
  }
  // ionViewDidLeave(){
  //   this.fitsenseService.isChallengeScreenCalled = false;
  //   this.fitsenseService.isFitStatusScreenCalled = false;

  // }

}
