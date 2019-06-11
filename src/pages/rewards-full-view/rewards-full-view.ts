import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { FitsenseServiceProvider } from '../../providers/homepage-module/fitsense-service/fitsense-service';
import { RegistrationProcessProvider } from '../../providers/registration-process-service/registration-process';
import { PolicyTabsFlags } from '../../components/pd-header-tabs/pd-header-tabs';
import { BaseApp } from '../../app/base';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { CmsServiceProvider } from '../../providers/cms-service/cms-service';
import { Rewards } from '../../common/models/cms-rewards.class';
import { RegisterUserPage, MyAccountPage, NotificationsPage } from '../pages';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { SharedataProvider } from '../../providers/sharedata/sharedata';
import { DeviceInfoServiceProvider } from '../../providers/deviceInfo-service/deviceInfo-service';
import { Broadcaster } from '@ionic-native/broadcaster';

/**
 *@author Rajul Dixit
 */

@IonicPage()
@Component({
  selector: 'page-rewards-full-view',
  templateUrl: 'rewards-full-view.html',
})
export class RewardsFullViewPage extends BaseApp {
  screenID: string;

  rewardsheader = {
    "title": 'score',
    "icon": 'scbl-reward'
  }
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  PolicyTabsFlagsinputs: PolicyTabsFlags = new PolicyTabsFlags();

  policytabs: any = ['howtoRedeem', 'howtoEarn', 'YourPoints'];
  currenttabname: string;
  boolval: any
  yourPointsRewards: Rewards[];
  howToSpendRewards: Rewards[];
  howToEarnRewards: Rewards[];
  isRegistered: any;
  tabNum: any;
  constructor(public logger: LogServiceProvider, public navCtrl: NavController, public navParams: NavParams,
    public fitsenseService: FitsenseServiceProvider, public registrationProvider: RegistrationProcessProvider,
    public loginService: LoginServivceProvider,
    public cmsService: CmsServiceProvider,
    private cacheService: CacheServiceProvider,
    public sharedataservice: SharedataProvider,
    public deviceInfoService: DeviceInfoServiceProvider,
    private broadcaster: Broadcaster,
    private fba: FirebaseAnalyticsService) {
    // Initiate Base App
    super();
    if (this.deviceInfoService.isRunningOnDevice()) {
      this.subscribeToFitsense();
    }
    this.headerInput.isBackButton = false;
    this.headerInput.nav = navCtrl;
    this.headerInput.isProfile = true;
    this.headerInput.isNotification = true;
    this.PolicyTabsFlagsinputs.iconhideflag = true;
    //this.currenttabname = this.navParams.get("currenttabName");
    this.currenttabname = "howtoRedeem";
    if (this.navParams.get('SelectedTab')) {
      this.currenttabname = this.navParams.get('SelectedTab');
      if (this.currenttabname == 'YourPoints') {
        this.PolicyTabsFlagsinputs.expandflag = 'YourPoints';
      } else if (this.currenttabname == 'howtoEarn') {
        this.PolicyTabsFlagsinputs.expandflag = 'howtoEarn';
      } else {
        this.PolicyTabsFlagsinputs.expandflag = 'howtoRedeem';
      }

    } else {
      this.currenttabname = "howtoRedeem";
      this.PolicyTabsFlagsinputs.expandflag = 'howtoRedeem';
    }
    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got is Registered', res);
      console.log('Type of reg Flag', typeof (res));
      this.isRegistered = res;
    //  if(this.isRegistered){
    //   this.openFitsenseScreen("BalanceMain");
    // }
    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    });
    //console.log(this.navParams.get('SelectedTab'));
    //this.screenID=
    
  }
  ngOnInit() {
    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got is Registered', res);
      console.log('Type of reg Flag', typeof (res));
      this.isRegistered = res;
    //  if(this.isRegistered){
    //   this.openFitsenseScreen("BalanceMain");
    // }
    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    });
  }
  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad RewardsFullViewPage');
    //this.openFitsenseScreen("BalanceMain");
    // if(this.isRegistered){
    //   this.openFitsenseScreen("BalanceMain");
    // }
  }

  // ionViewWillEnter() {
  //   if(this.isRegistered){
     
  //     this.openFitsenseScreen("BalanceMain");
  //   }
  // }
  ionViewDidLeave() {
    
    }
  ionViewDidEnter() {
   

    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got is Registered', res);
      console.log('Type of reg Flag', typeof (res));
      this.isRegistered = res;
     if(this.isRegistered){
      this.openFitsenseScreen("BalanceMain");
    }
    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    });
    this.fba.logEvent('rewards_view_all', 'View All Rewards items');
    //this.currenttabname = "howtoRedeem";
    this.yourPointsRewards = this.cmsService.rewadsList.filter(res => res.field_tags == 'your_points');
    this.howToSpendRewards = this.cmsService.rewadsList.filter(res => res.field_tags == 'how_to_spend');
    this.howToEarnRewards = this.cmsService.rewadsList.filter(res => res.field_tags == 'how_to_earn');
  }
  /**
   * This method is used to change the tab
   * @param evt 
   */
  changetab(evt) {
    this.currenttabname = evt;
  }

  openFitsenseScreen(screenID) {
    this.sharedataservice.getCurrentTab.subscribe(message => {
      console.log("In this.sharedataservice.currentMessage ", message);
      if(message){
       
       
        this.currenttabname = message;
        if(this.currenttabname == 'YourPoints'){
          this.tabNum = 2;
        }else if (this.currenttabname == 'howtoEarn'){
          this.tabNum = 1;
        }else{
          this.tabNum = 0;
        }
        //this.navCtrl.parent.select(2);
      }
    });
    let screenInfo: any;
    switch (this.currenttabname) {
      case "howtoRedeem":
        screenInfo = {
          "ScreenIDLevel1": "BalanceMain",
          "ScreenIDLevel2": "Rewards"
        }
        break;
      case "howtoEarn":
        screenInfo = {
          "ScreenIDLevel1": "BalanceMain",
          "ScreenIDLevel2": "EarnMorePoints"
        }
        break;
      case "YourPoints":
        screenInfo = {
          "ScreenIDLevel1": "BalanceMain",
          "ScreenIDLevel2": "Points"
        }
        break;

      default:
        break;
    }

    // let isRegistered = this.registrationProvider.getValue(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED);
    // isRegistered.then(
    //   (res: any) => {
    //     console.log("In Then condition", res);
    var height = this.loginService.tabBarHeight;
    this.fitsenseService.startFitsenseScreen(screenInfo, height);

    //   },
    //   res => {
    //   }
    // );
  }

  gotoRegister() {
    this.navCtrl.parent.parent.setRoot(RegisterUserPage);
  }

  subscribeToFitsense() {
    //Subscribe to Fitsense Onboarding Event
   

    //this.endFitsenseScreen();
    console.log("In subscribeToFitsense:In App Component");
    //Subscribe to Fitsense ionicNavigation Event
    // this.broadcaster
    //   .addEventListener("ionicNavigation")
    //   .subscribe(event => {
    //     this.fitsenseService.endFitsenseScreen();
    //     switch (event.screenID) {
    //       case "Profile":
    //         this.navCtrl.push(MyAccountPage);
    //         break;
    //       case "Notification":
    //         this.navCtrl.push(NotificationsPage)
    //         break;
    //       default:
    //         break;
    //     }
    //   });


  }
}
