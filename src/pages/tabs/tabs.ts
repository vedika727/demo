
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FavoritesPage, NotificationsPage, UserProfilePage, PolicyDashboardPage, MenuPage, DashboardFullViewAccidentPage, ActivityFullViewPage, RewardsFullViewPage, DashboardNotPage, MyAccountPage } from '../pages';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { SharedataProvider } from '../../providers/sharedata/sharedata';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { Tabs } from '../../../node_modules/ionic-angular/components/tabs/tabs';
import { FitsenseServiceProvider } from '../../providers/homepage-module/fitsense-service/fitsense-service'
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { BaseApp } from '../../app/base';
import { LoadingServiceProvider } from '../../providers/ion-service/loading-service';
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';
import { CmsServiceProvider } from '../../providers/cms-service/cms-service';
import { PushNotificationDynamicLinkService } from '../../providers/firebase-service/pnotification-dlink-service';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { DeviceInfoServiceProvider } from '../../providers/deviceInfo-service/deviceInfo-service';
import { Broadcaster } from '@ionic-native/broadcaster';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage extends BaseApp implements OnInit {
  SelectedTab: any;
  screenID: any;
  isSingle: any;
  policyDash: boolean;
  piechartAPIData: any = [];
  tabDetail: any;
  tab1Root = PolicyDashboardPage;
  tab2Root = DashboardFullViewAccidentPage;
  tab3Root = ActivityFullViewPage;
  tab4Root = RewardsFullViewPage;
  tab5Root = MenuPage;



  // tabIcon = "../../assets/scb-icons/Accident.svg"
  index: any;
  firstTabIcon: any;
  activeIndex: number
  isRegistered: any;
  isSCBCustomer: any;
  isFitsenseRegister: any;

  @ViewChild('tabRef') tabRef: Tabs;
  currenttabName: any;
  currenttabname: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public fitsenseService: FitsenseServiceProvider,
    private cacheService: CacheServiceProvider,
    public loginService: LoginServivceProvider,
    public sharedataservice: SharedataProvider,
    public fitsenseProvider: FitsenseServiceProvider,
    public loadingService: LoadingServiceProvider,
    public homePdService: HomePdServiceProvider,
    public cmsService: CmsServiceProvider,
    public pNotificationDLink: PushNotificationDynamicLinkService,
    public modalServcie: ModalServiceProvider,
    public params: NavParams,
    public deviceInfoService: DeviceInfoServiceProvider,
    private broadcaster: Broadcaster,
    public app: App) {
    super();
    if (this.deviceInfoService.isRunningOnDevice()) {
      this.subscribeToFitsense();
    }


    setTimeout(() => {
      let ele = document.getElementsByClassName("tabbar");
      if (ele) {
        this.loginService.tabBarHeight = ele[0].clientHeight;
      }
    }, 200)
    //this.getdashboardData();
    // to check for active index
    let navData = this.navParams.get('data');
    console.log('nav controller - ', navData);
    if (navData) {
      this.activeIndex = navData.activeIndex ? navData.activeIndex : 0;
    } else {
      this.activeIndex = 0;
    }


    this.firstTabIcon = 'planet';
    this.sharedataservice.currentMessage.subscribe(message => {
      this.index = message;
    });
  }

  ionViewDidEnter() {
  
    this.loginService.tabBarHeight = this.tabRef._tabbar.nativeElement.offsetHeight;
  }
  // get dashboard data 

  /**
   * This method is used to change the icon of below tab
   */
  ngOnInit(): void {

    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got is Registered', res);
      console.log('Type of reg Flag', typeof (res));
      this.isRegistered = res;
    }, (err) => {

      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    })

    this.sharedataservice.currentMessage.subscribe(message => {
      this.index = message;
    });

  }

  closeFitSenseScreen(tabname) {
    // if(this.fitsenseService.isChallengeScreenOpen == true ||  this.fitsenseService.isFitStatusScreenCalled == true){
    //   this.fitsenseService.isChallengeScreenOpen = false;
    //   this.fitsenseService.isFitStatusScreenCalled = false;
    // }


    /*this if condition gets executed on its own for the first time when Tabspage loads;
     here it check if home page is getting loaded due of push notification or not*/
    if (this.pNotificationDLink.deepLinkObject.call2action) {
      //this condition is added to avoid rentering into register page through cta coming from push notification or dy link
      if (this.pNotificationDLink.deepLinkObject.call2action === this.CONSTANT.REGISTER && this.isRegistered) {
        return;
      }

      if (this.pNotificationDLink.deepLinkObject.call2action === this.CONSTANT.FITSENSE) {
        this.fitsenseService.startFitsenseScreen(this.pNotificationDLink.deepLinkObject.fitsenseScreenPath, this.loginService.tabBarHeight);
      } else if (this.pNotificationDLink.deepLinkObject.call2action === this.CONSTANT.FEEDBACK) {
        this.modalServcie.presentModal(this.pNotificationDLink.deepLinkObject.call2action);
      } else if (this.pNotificationDLink.deepLinkObject.call2action === this.CONSTANT.POLICY_DASHBOARD_FULL_VIEW) {
        this.app.getRootNav().getActiveChildNav().select(1);
      } else {
        this.navCtrl.push(this.pNotificationDLink.deepLinkObject.call2action, { [this.CONSTANT.DY_LINK_OBJ]: this.pNotificationDLink.deepLinkObject });
      }
      this.pNotificationDLink.clearDeepLinkObject();
    } else {
      
      if (tabname == 'Activity') {
        this.tabRef.select(1);
        this.sharedataservice.getfitsenseStatus.subscribe(challenge => {
          console.log("In this.sharedataservice.currentMessage ", challenge);
          if (challenge == 'ChallengesMainClose') {
            this.fitsenseService.isChallengeScreenCalled = false;
          }else{
            this.fitsenseService.isChallengeScreenCalled = true;

          }
        });
        this.app.getActiveNav().pop();
        this.tab3Root = ActivityFullViewPage;
      }

      else if (tabname == 'Rewards') {
        this.tabRef.select(2);
        this.app.getActiveNav().pop();
        //this.tab4Root = RewardsFullViewPage;
        this.sharedataservice.setFitsenseStatus("ChallengesMainClose");

      } else {
        this.fitsenseProvider.endFitsenseScreen();
        // this.fitsenseService.isChallengeScreenCalled = false;
        this.sharedataservice.setFitsenseStatus("ChallengesMainClose");
        //this.navCtrl.pop();
        // this.sharedataservice.setFitsenseStatus("ChallengesMainClose");

      }

      // this.cacheService.getCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED).then((res) => {
      //   console.log('got is Registered to fitsense', res);
      //   this.isFitsenseRegister = res;
      // }, (err) => {
      //   console.log('DIDNT GET isregesiterd to fitsense', err);
      //   // this.isRegistered = err;
      // })

      // if (tabname == 'PolicyDashboard') {
      //   this.fitsenseProvider.endFitsenseScreen();
      //   this.policyDash = true;
      //   this.tab2Root = DashboardFullViewAccidentPage;
      //   //this.navCtrl.setRoot( DashboardFullViewAccidentPage, { PolicyData: this.piechartAPIData });
      // }
      // else if (tabname == 'Activity') {
      //   this.tab3Root = ActivityFullViewPage;
      //   console.log('got is Registered to fitsense : this.isFitsenseRegister', this.isFitsenseRegister);
      //   // if (this.isRegistered == true && this.isFitsenseRegister == true) {

      //   //   this.tab3Root = ActivityFullViewPage;
      //   //   //this.openFitsenseScreen("ActivityMain")

      //   // } else {
      //   //   this.tab3Root = ActivityFullViewPage;
      //   // }
      // }
      // else if (tabname == 'Rewards') {
      //   this.tab4Root = RewardsFullViewPage;
      //   // if (this.isRegistered == true) {
      //   //   this.tab4Root = RewardsFullViewPage;
      //   //  // this.openFitsenseScreen("BalanceMain")

      //   // } else {
      //   //   this.tab4Root = RewardsFullViewPage;
      //   // }
      // }
      // else 
      // {
      //   this.fitsenseProvider.endFitsenseScreen();
      // }
    }
  }

  // openFitsenseScreen(screenID) {
  //   //this.fitsenseProvider.endFitsenseScreen();
  //   this.currenttabname = screenID;
  //   var height = this.loginService.tabBarHeight;
  //   if (screenID == 'ActivityMain') {
  //     this.fitsenseService.startFitsenseScreen(screenID, height);
  //     //this.navCtrl.parent.select(2);
  //   } else {
  //     let screenInfo: any;
  //     screenInfo = {
  //       ScreenIDLevel1: "BalanceMain",
  //       ScreenIDLevel2: "Rewards"
  //     };
  //     //this.navCtrl.parent.select(3);
  //     this.fitsenseService.startFitsenseScreen(screenInfo, height);
  //   }
  // }


  subscribeToFitsense() {
    //Subscribe to Fitsense Onboarding Event
    this.broadcaster.addEventListener("fitsenseAnalytics").subscribe(event => {
      console.log("In fitsenseAnalytics event", JSON.stringify(event));
      // if(event.eventName == 'challenge_listing'){
      //   this.activeIndex = 1;
      //   this.navCtrl.parent.select(1)
      //   console.log("tabds event called", JSON.stringify(this.activeIndex));
      // }
    })


  }

  

}
