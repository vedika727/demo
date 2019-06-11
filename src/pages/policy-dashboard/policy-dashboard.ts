import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { CmsServiceProvider } from './../../providers/cms-service/cms-service';
import Pusher from "pusher-js";
import {
  FitsenseServiceProvider,
  Fitsense
} from "./../../providers/homepage-module/fitsense-service/fitsense-service";
import { Component, ViewChild, OnInit, Directive, NgZone, Injector } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Content,
  Platform
} from "ionic-angular";
import {
  ChallengesFullViewPage,
  RewardsFullViewPage,
  StoriesFullViewPage,
  ActivityFullViewPage,
  StoryDetailPage
} from "../pages";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { HeaderData } from "../../components/dashboard-header/dashboard-header";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { Broadcaster } from "@ionic-native/broadcaster";
import { GetAvailableLoan } from "../../common/models/get-available-loan.class";
import { PolicyLoanServicesProvider } from "../../providers/policy-loan-services/policy-loan-services";
import { HomeSliderComponent } from '../../components/home-slider/home-slider';
/**
 * Generated class for the PolicyDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
import { LoadingServiceProvider } from "../../providers/ion-service/loading-service";
import { RegistrationProcessProvider } from "../../providers/registration-process-service/registration-process";
import { Device } from "../../../node_modules/@ionic-native/device";
import { HomePdServiceProvider } from "../../providers/homepage-module/home-pd-service/home-pd-service";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { RegisterUserPage } from "../../pages/pages";
import { BaseApp } from '../../app/base';
import { NotificationsPage } from "../../pages/pages";
import { MyAccountPage, EmailVerificationPopupPage, PaymentChangeBookPage, DashboardFullViewAccidentPage, SingleLoanPage } from "../../pages/pages";
import { LoginServivceProvider } from "../../providers/login-module/login-service/login-service";
import { Stories } from '../../common/models/cms-stories.class';
import { Challenges } from '../../common/models/cms-challenges.class';
import { Rewards } from 'common/models/cms-rewards.class';
import { DeviceInfoServiceProvider } from '../../providers/deviceInfo-service/deviceInfo-service';
import { WeeklyContent } from '../../common/models/cms-weekly.class';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { FilteredLoanData } from '../../providers/policy-loan-services/services-request-data-model-class';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { DeepLinkObject } from 'common/models/deep-Link.class';
import { dyLinkOBJConst } from "../../common/constants/cta-const"
import { Events } from 'ionic-angular';
import { TranslateService } from 'ng2-translate';



/**
 * @author Banti Sutar.
 * @description Page for showing Home Screen to user with fitsense ,reward , challenges , Activity and policy dashboard.
 */

@IonicPage()
@Component({
  selector: "page-policy-dashboard",
  templateUrl: "policy-dashboard.html"
})

export class PolicyDashboardPage extends BaseApp implements OnInit {
  loansDataToModal: { email: any; };
  totalLoanAmount: string;
  // **************** tooltip example for demo *****************
  // toolTipButton = <IDialogButton<any>>{
  //   name: "ถัดไป",
  //   click: (data?) => {
  //     this.alert();
  //   }
  // }
  // toolTipDig = <ITooltipView<any>> {imagearray:["https://pbs.twimg.com/media/DSkz7UWVMAAivei.png","https://i.stack.imgur.com/rJeXI.png","https://static1.squarespace.com/static/51631b3be4b02e535cc9a645/t/5a63c6128165f52495d97b8f/1516488218106/ScreenshotAppInDeviceiPhone_X-1.png"], imgDesc : "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน",title:"Register Page",actionCTA:this.toolTipButton}
  // ***************   end demo  **********************************
  isFitsenseRegister: any;
  ActivityStateIcon1: any;
  isSCBCustomer: {};
  data: (string | { "activity": { "activityScoreToday": number; "activityScoreGoal": number; "activityScoreAverage": number; "numberOfConnectedDataSources": number; "statusLevel": string; }; "balance": { "pointsBalance": number; }; "challenges": { "joinedOngoingChallenges": string; "ongoingChallenges": string; }; code?: undefined; message?: undefined; } | { "code": number; "message": string; activity?: undefined; balance?: undefined; challenges?: undefined; })[];
  tabNum: number;
  isHalf: boolean;
  channel: any;
  currenttabname: string;
  index: any;
  dashboardheader: HeaderData = new HeaderData();
  isLoggedIn: boolean = true;
  policytabs: any = ["Information", "Claim", "Loan"];
  today: any;
  todayhours: any;
  filteredData: FilteredLoanData;
  showClaimCard: boolean;
  //Fitsense variables
  ActivityStateIcon: any;
  StateIcon: any;
  challengeCompleted: any;
  activityScoreToday: any = 0;
  activityScoreGoal: any = 0;
  numberOfChallenges: any = 0;
  challengesCompleted: number = 0;
  isRegistered: any;
  fitsenseData: Fitsense;
  deviceId: any;
  piechartAPIData: any = [];
  ngRepeateCount: any = [10, 1, 1, 1, 1, 1, 2, 2, 2, 2];
  randomSentence:string="";
  moreMinutes:number=0;
  translationData:any={};

  // stories are
  storiesList: Stories[] = new Array(0);
  generalStories: Stories[] = new Array(0);
  inspirerStories: Stories[] = new Array(0); //vdo
  exclusiveStories: Stories[] = new Array(0);

  // rewards are
  rewadsList: Rewards[] = new Array(0);
  yourPointsRewards: Rewards[] = new Array(0);
  howToEarnRewards: Rewards[] = new Array(0);
  howToSpendRewards: Rewards[] = new Array(0);

  challengesList: Challenges[] = new Array(0);

  weeklyContentList: WeeklyContent[] = new Array(0);
  @ViewChild(Content) content: Content;

  //this is used for dynamically moving home slider if page is pushed using dynamic link and push notification 
  @ViewChild(HomeSliderComponent) homeSlider: HomeSliderComponent;

  private tabBarHeight;
  private topOrBottom: string;
  private contentBox;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  spinnerFlag: boolean;
  spinnerFlagDashboard: boolean;
  allLoansData: GetAvailableLoan;
  //@ViewChild(Content) Content: Content;
  obj: any;
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  tryAgainText: any;
  constructor(
    public fitsenseService: FitsenseServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public sharedataservice: SharedataProvider,
    public loadingService: LoadingServiceProvider,
    public registrationProvider: RegistrationProcessProvider,
    private device: Device,
    private platform: Platform,
    public homePdService: HomePdServiceProvider,
    private logger: LogServiceProvider,
    private cacheService: CacheServiceProvider,
    private broadcaster: Broadcaster,
    public loginService: LoginServivceProvider,
    private zone: NgZone,
    public cmsService: CmsServiceProvider,
    public toastService: ToastServiceProvider,
    public deviceInfoService: DeviceInfoServiceProvider,
    public policyLoanService: PolicyLoanServicesProvider,
    public modalService: ModalServiceProvider,
    public toolTipService: TooltipServiceProvider,
    public event: Events,
    public translateService: TranslateService,
    public injector?: Injector
  ) {
    //initiate Base App
    super(injector);
    this.homeFitsense();

    //athis.index == 3;
    //this.getspinner(true);
    //     let hideFooterTimeout = setTimeout( () => {
    //      this.getspinner(false);
    //  }, 10000);
    // console.log('============================================================================================================================')
    this.headerInput.nav = navCtrl;
    this.headerInput.isProfile = true;
    // this.headerInput.daynightFlag = "day";
    this.headerInput.isNotification = true;
    this.today = new Date().getHours();
    this.isHalf = true;
    this.tabNum = 0;
    this.sharedataservice.changeMessage(0);

    //Check if it is a browser
    if (this.platform.platforms().indexOf("cordova") >= 0) {
      this.deviceId = this.CONSTANT.URM_ID;

      console.log("URMID Id in Policy " + this.deviceId);
    } else {
      console.log("In browser");
      this.deviceId = "0";
    }
    this.tryAgainText = this.translateService.instant("errors.errorButtons.tryAgain");

    //this.currenttabname = "howtoRedeem";

    //this.getFitsenseData();
    //this.isRegistered = true;
    // this.sharedataservice.getCurrentTab.subscribe(message => {
    //   console.log("In this.sharedataservice.currentMessage ", message);
    //   if(message){

    //     if(message == 'YourPoints'){
    //       this.tabNum = 2;
    //     }else if (message == 'howtoEarn'){
    //       this.tabNum = 1;
    //     }else{
    //       this.tabNum = 0;
    //     }
    //     this.currenttabname = message;
    //   }
    // });
    this.sharedataservice.currentMessage.subscribe(message => {
      console.log("In this.sharedataservice.currentMessage ", this.currenttabname)
      this.index = message;
      console.log(this.index);
      // TODO - Removed from Release 1
      // if (this.index == 4) {
      //   this.dashboardheader = {
      //     title: "PolicyDashboard",
      //     icon: "scbl-policy-dashboard"
      //   };
      //   this.polictTabTooltip();
      //   this.currenttabname = "Information";
      //   this.tabNum = 0;
      //   this.policytabs = ["Information", "Claim", "Loan"];
      // } else
      if (this.index == 0) {
        this.dashboardheader = {
          title: "FitSense",
          icon: "scbl-fitsense"
        };
      } else if (this.index == 2) {
        this.dashboardheader = {
          title: "Products",
          icon: "scbl-sales"
        };
        this.currenttabname = "Products";
        this.tabNum = 0;
        this.policytabs = ["Products"];
      } else if (this.index == 3) {
        this.dashboardheader = {
          title: "Challenges",
          icon: "scbl-challenge"
        };
        this.currenttabname = "Challenges";
        this.policytabs = ["Challenges"];
      }
      // TODO - removed from Release 1
      // else if (this.index == 5) {
      //   this.dashboardheader = {
      //     title: "Stories",
      //     icon: "scbl-story"
      //   };
      //   if (this.isRegistered == true) {
      //     this.currenttabname = "HealthyTips";
      //     this.tabNum = 0;
      //   } else {
      //     this.currenttabname = "ExclusiveCustomers";
      //     this.tabNum = 2;
      //   }
      //   this.policytabs = ["HealthyTips", "Inspirer", "ExclusiveCustomers"];
      // }
      else if (this.index == 1) {
        this.dashboardheader = {
          title: "Rewards",
          icon: "scbl-reward"
        };
        // this.currenttabname = "howtoRedeem";

        if (this.isRegistered == true) {
          this.currenttabname = "howtoRedeem";
          this.tabNum = 0;
        } else {
          this.currenttabname = "YourPoints";
          this.tabNum = 2;
        }
        this.policytabs = ["howtoRedeem", "howtoEarn", "YourPoints"];
      }
    });
    this.fitsenseService.fitsense = new Fitsense(
      this.isLoggedIn,
      "0",
      "0",
      "0",
      "0"
    );

    this.fitsenseData = this.fitsenseService.fitsense;
  }


  getdashboardData() {
    this.getspinner(true);
    this.spinnerFlagDashboard = true;
    console.log("Init called");
    this.index = 0; //when view is initialized
    this.homePdService.getDashboardData().then((res) => {
      this.piechartAPIData = res;
      this.cacheService.setCache("PiechartData", this.piechartAPIData);
      this.getspinner(false);
      this.spinnerFlagDashboard = false;
    }, (err) => {
      this.logger.log('error', err);

    })
  }

  getCacheValue() {
    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      debugger;
      console.log('got is Registered', res);
      console.log('Type of reg Flag', typeof (res));
      this.isRegistered = res;
      if (this.isRegistered) {
        this.getFitsenseData();
      }
    }, (err) => {
      debugger;
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    });
  }
  ngOnInit() {

    this.event.subscribe('slideChangeTo', (index) => {
      this.homeSlider.changeslide(index);
    });
    this.index = 0;

    this.cacheService.getCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER).then((res) => {
      console.log('got is isSCBCustomer', res);
      ;
      this.isSCBCustomer = res;
      if (this.isSCBCustomer == true && this.isRegistered == true) {
        this.getdashboardData();
        this.policyLoanService.getAvailableLoan(this.getAvailableLoanResponse);
      }
    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isSCBCustomer = err;
    })

    this.cacheService.getCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED).then((res) => {
      console.log('got is Registered to fitsense', res);
      this.isFitsenseRegister = res;

    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd to fitsense', err);
      // this.isRegistered = err;
    });

    this.cmsService.getStories().then((res: Stories[]) => {
      console.log('stories are -', res);
      this.storiesList = res;
      this.inspirerStories = this.storiesList.filter(res => res.field_isvdo == "True");
      this.exclusiveStories = this.storiesList.filter(res => res.field_isexclusive == "True");
      this.generalStories = this.storiesList.filter(res => res.field_isgeneral == "True");
    }, err => {
      this.toastService.presentToast('error in cms stories', err);
    });


    this.cmsService.getChallenges().then((res: Challenges[]) => {
      console.log('challenges are -', res);
      this.challengesList = res;
    }, err => {
      this.toastService.presentToast('error in cms challenges');
    });

    this.cmsService.getRewards().then((res: Rewards[]) => {
      console.log('rewards are - ', res);
      this.rewadsList = res;
      this.yourPointsRewards = this.rewadsList.filter(res => res.field_tags == 'your_points');
      this.howToSpendRewards = this.rewadsList.filter(res => res.field_tags == 'how_to_spend');
      this.howToEarnRewards = this.rewadsList.filter(res => res.field_tags == 'how_to_earn');
    }, err => {
      this.toastService.presentToast('error in cms rewards');
    });

    // TODO - Removed from Release 1
    // this.cmsService.getWeeklyContent().then((res: WeeklyContent[]) => {
    //   this.weeklyContentList = res;
    // }, err => {
    //   this.toastService.presentToast('error in cms rewards');
    // });

    this.getCacheValue();
  }
  gotoRegister() {
    this.navCtrl.parent.parent.setRoot(RegisterUserPage);
  }
  /**
   * @author Banti Sutar.
   * @description Function for getting time.
   */
  ionViewDidEnter() {
    this.homeFitsense();
    // this.currenttabname = "howtoRedeem";
    if (this.isRegistered == true) {
      this.getFitsenseData();
    }

    this.today = new Date().getHours();
    if (this.today >= 6 && this.today < 18) {
      this.todayhours = "day";
      this.headerInput.daynightFlag = "day";
    } else {
      this.todayhours = "night";
      this.headerInput.daynightFlag = "night";
    }
    if (this.index == "") {
      console.log("===========================", this.index);
      // this.index = 0;
    }

    this.sharedataservice.currentMessage.subscribe(message => {
      console.log("In this.sharedataservice.currentMessage ", this.currenttabname)
      this.index = message;
      console.log(this.index);
      // TODO - Remvoed from Release 1
      // if (this.index == 4) {
      //   this.dashboardheader = {
      //     title: "PolicyDashboard",
      //     icon: "scbl-policy-dashboard"
      //   };
      //   //this.getspinner(true);
      //   this.currenttabname = "Information";
      //   this.tabNum = 0;
      //   this.policytabs = ["Information", "Claim", "Loan"];
      // } else 
      if (this.index == 0) {
        this.dashboardheader = {
          title: "FitSense",
          icon: "scbl-fitsense"
        };


      } else if (this.index == 3) {
        this.dashboardheader = {
          title: "Challenges",
          icon: "scbl-challenge"
        };
        this.currenttabname = "Challenges";
        this.policytabs = ["Challenges"];
        // TODO - Removed from Release 1
        // } else if (this.index == 5) {
        //   this.dashboardheader = {
        //     title: "Stories",
        //     icon: "scbl-story"
        //   };
        //   if (this.isRegistered == true) {
        //     this.currenttabname = "HealthyTips";
        //     this.tabNum = 0;
        //   } else {
        //     this.currenttabname = "ExclusiveCustomers";
        //     this.tabNum = 2;
        //   }
        //   this.policytabs = ["HealthyTips", "Inspirer", "ExclusiveCustomers"];
      } else if (this.index == 1) {
        this.dashboardheader = {
          title: "Rewards",
          icon: "scbl-reward"
        };
        //this.currenttabname = "howtoRedeem";
        // if (this.isRegistered == true) {
        //   this.currenttabname = "howtoRedeem";
        //   this.tabNum = 0;
        // } else {
        //   this.currenttabname = "YourPoints";
        //   this.tabNum = 2;
        // }
        this.policytabs = ["howtoRedeem", "howtoEarn", "YourPoints"];
      }

      this.checkForDyLinkOBJ();
    });


  }


  /**
   * @author Manish Khedekar and Banti Sutar
   * @description Function to get fitsense data from Fitsense API.
   */

  convertToLocalData(apiData: any) {

    this.fitsenseService.fitsense.activityToday = apiData.activity.activityScoreToday;
    this.ActivityStateIcon1 = apiData.activity.statusLevel;
    this.ActivityStateIcon = "Fitsense-bages-Bronze";
    this.StateIcon = apiData.activity.statusLevel ? apiData.activity.statusLevel : "bronze";

    if (this.ActivityStateIcon1 == "gold") {
      this.ActivityStateIcon = "Fitsense-bages-Gold";
    } else if (this.ActivityStateIcon1 == "bronze") {
      this.ActivityStateIcon = "Fitsense-bages-Bronze";
    } else if (this.ActivityStateIcon1 == "silver") {
      this.ActivityStateIcon = "Fitsense-bages-Silver";
    } else {
      this.ActivityStateIcon = "Fitsense-bages-Bronze";
    }

    this.fitsenseService.fitsense.rewards = apiData.balance.pointsBalance;
    this.fitsenseService.fitsense.activityScoreGoal =
      apiData.activity.activityScoreGoal;
    this.fitsenseService.fitsense.statusLevel =
      apiData.activity.statusLevel;

    this.fitsenseService.fitsense.numberOfConnectedDataSources =
      apiData.activity.numberOfConnectedDataSources;

    this.fitsenseService.fitsense.numberOfChallenges =
      apiData.challenges.ongoingChallenges;

    if (apiData.activity.activityRecommendations) {
      this.fitsenseService.fitsense.runningDuration =
        apiData.activity.activityRecommendations.running.durationMinutes;
    }

    this.fitsenseService.fitsense.challegesCompleted = apiData.challenges.joinedOngoingChallenges ? apiData.challenges.joinedOngoingChallenges : 0;
    this.fitsenseData = this.fitsenseService.fitsense;

    this.getRandomSentence(this.fitsenseData.activityToday);

    // Calculating minutes remaining
    if(this.fitsenseData.activityToday<100){
    this.moreMinutes = Math.round((100-this.fitsenseData.activityToday)*0.75);
    } else {
      this.moreMinutes = 0;
    }
    this.translationData = {
      moreMinutes : this.moreMinutes
    }; 
  }

  getRandomSentence(goal:number){
    if(goal<=15){
      this.randomSentence = ['Home_Fitsense.sentences_0-15_1','Home_Fitsense.sentences_0-15_2','Home_Fitsense.sentences_0-15_3'][this.getRandomInt(3)];
    } else if(goal<=80){
      this.randomSentence = ['Home_Fitsense.sentences_16-80_1','Home_Fitsense.sentences_16-80_2','Home_Fitsense.sentences_16-80_3'][this.getRandomInt(3)];
    } else if(goal<=99){
      this.randomSentence = ['Home_Fitsense.sentences_81-100_1','Home_Fitsense.sentences_81-100_2','Home_Fitsense.sentences_81-100_3'][this.getRandomInt(3)];
    } else {
      this.randomSentence = ['Home_Fitsense.sentences_100+_1','Home_Fitsense.sentences_100+_2','Home_Fitsense.sentences_100+_3'][this.getRandomInt(3)];
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getFitsenseData() {
    //this.getspinner(true);
    //this.spinnerFlag = true;
    this.sharedataservice.getCurrentTab.subscribe(message => {
      console.log("In this.sharedataservice.currentMessage ", message);
      if (message) {

        this.currenttabname = message;
      }
    });
    console.log("In getFitsenseData");
    this.fitsenseService.getFitsenseData().then(
      (data: any) => {
        console.log(data);
        this.convertToLocalData(data.result);
        this.pusher();
        //this.getspinner(false);
        //this.spinnerFlag = false;
      },
      err => {
        console.log("Error to get fitsense data", err);
      }
    );
  }

  pusher() {
    console.log("pusher called");
    let pusher = new Pusher("d98268a6b57646e7d840", {
      cluster: "ap1"
    });


    this.channel = pusher.subscribe(this.deviceId);
    console.log("channel name==", this.channel);
    this.channel.bind("scblife_user_status", (data: any) => {
      console.log("dataReceived from Pusher==", data);
      this.convertToLocalData(data);
      console.log(this.fitsenseData);
    });
  }

  /**
   * This method is used changeTab
   * @param currenttab
   */
  changetab(currenttab) {
    debugger;
    console.log("Change tab called ", currenttab);
    this.currenttabname = currenttab;
    this.zone.run(() => { this.currenttabname = currenttab; });

    // if (currenttab == "Claim") {
    //   // making new service call on homepage on selecting middle tab to show 1 claim card
    //   this.homePdService.getClaimsData().then((res) => {
    //     console.log('^^^got claims data', res);
    //     this.claimDataObject = res;
    //     this.claimdata = this.claimDataObject.claimList;
    //     console.log('this.claimdata has', this.claimdata);
    //     if (this.claimdata) {
    //       this.claimItemsData = this.claimdata[0].ClaimItems;
    //       this.claimHistoriesData = this.claimdata[0].ClaimHistories;

    //       //analytics function is called depending on status received for claimsHistories
    //       // for(var x in this.claimHistoriesData){
    //       //   if(this.claimHistoriesData[x].Status == 'อนุมัติเรียบร้อยแล้ว'){
    //       //     this.fba.logEvent('claim_completed','View claim information - visit with complete status');
    //       //   }
    //       //   else if(this.claimHistoriesData[x].Status == 'ได้รับเอกสารและอยู่ระหว่างการพิจารณา'){
    //       //     this.fba.logEvent('claim_require_document','View claim information - visit with document required');
    //       //   }
    //       //   else {
    //       //     this.fba.logEvent('claim_rejected','View claim information - visit with reject status');
    //       //   }
    //       // }

    //       //analytics function is called depending on status received for claimsItems
    //       // for(var x in this.claimItemsData){
    //       //   if(this.claimItemsData[x].Status == 'อนุมัติเรียบร้อยแล้ว'){
    //       //     this.fba.logEvent('claim_completed','View claim information - visit with complete status');
    //       //   }
    //       //   else if(this.claimItemsData[x].Status == 'ได้รับเอกสารและอยู่ระหว่างการพิจารณา'){
    //       //     this.fba.logEvent('claim_require_document','View claim information - visit with document required');
    //       //   }
    //       //   else {
    //       //     this.fba.logEvent('claim_rejected','View claim information - visit with reject status');
    //       //   }
    //       // }


    //       console.log('this.claimItemsData ON HOMEPAGE has', this.claimItemsData);
    //       console.log('this.claimHistoriesData  ON HOMEPAGE  has', this.claimHistoriesData);

    //       if(this.claimItemsData.length>0){
    //         this.showItemsCard = true;
    //       }
    //       else if(this.claimHistoriesData.length > 0){
    //         this.showItemsCard = false;
    //       }
    //     }
    //     // console.log('claimdata ^^$$^^', this.claimdata);
    //   }, (err) => {
    //     console.log('^^^NO claims data  ON HOMEPAGE', err);

    //   });
    // } // end new service call of claims data on homepage
  }

  /**
   * @author Banti Sutar
   * @description Function to navigate to respective full view page from rewatds , challenges, fitsense full view page.
   */
  // expandPage(pageName) {
  //   if (pageName == "challenge") {
  //     this.navCtrl.push(ChallengesFullViewPage);
  //   } else if (pageName == "story") {
  //     this.navCtrl.push(StoriesFullViewPage, {
  //       SelectedTab: this.currenttabname
  //     });
  //   } else if (pageName == "rewards") {
  //     this.navCtrl.push(RewardsFullViewPage, {
  //       SelectedTab: this.currenttabname
  //     });
  //   } else if (pageName == "activity") {
  //     this.navCtrl.push(ActivityFullViewPage, {
  //       SelectedTab: this.currenttabname
  //     });
  //   } else {
  //   }
  // }
  alert() {
    console.log("Load data to cache");
  }
  /**
   * @author Manish
   * @description Function to assign fitsense score value to range slider.
   */
  activeRangeWidth() {
    if (this.fitsenseData.activityToday > this.fitsenseData.activityScoreGoal)
      return "100";
    else
      return (this.fitsenseData.activityToday / this.fitsenseData.activityScoreGoal) * 100;
  }

  async openFitsenseScreen(screenID) {
    // let screenInfo: any;
    // switch (this.currenttabname) {
    //   case "howtoRedeem":
    //     screenInfo = {
    //       ScreenIDLevel1: "BalanceMain",
    //       ScreenIDLevel2: "Rewards"
    //     };
    //     break;
    //   case "howtoEarn":
    //     screenInfo = {
    //       ScreenIDLevel1: "BalanceMain",
    //       ScreenIDLevel2: "EarnMorePoints"
    //     };
    //     break;
    //   case "YourPoints":
    //     screenInfo = {
    //       ScreenIDLevel1: "BalanceMain",
    //       ScreenIDLevel2: "Points"
    //     };
    //     break;

    //   default:
    //     break;
    // }

    var height = this.loginService.tabBarHeight;

    if (screenID == "BalanceMain") {
      //this.fitsenseService.startFitsenseScreen(screenInfo, height);
      this.navCtrl.parent.select(2);
      this.sharedataservice.setCurrentTab(this.currenttabname);
      this.sharedataservice.getCurrentTab.subscribe(message => {
        console.log("In this.sharedataservice.currentMessage ", message);

      });

    } else if (screenID == "ActivityMain") {
      //this.navCtrl.parent.screenID = screenID;
      this.navCtrl.parent.select(1);
      //this.sharedataservice.setFitsenseStatus("ActivityMain");
    
  } else if (screenID == "ActivityMainStatus" ) {
    this.fitsenseService.isFitStatusScreenCalled = true;
    this.navCtrl.parent.select(1);
   // this.sharedataservice.setFitsenseStatus("ActivityMainStatus");
  }
    else if(screenID == "ChallengesMain" ){
       this.fitsenseService.startFitsenseScreen(screenID, height);
       this.fitsenseService.isChallengeScreenCalled = true;
       this.fitsenseService.isChallengeScreenOpen = true;
      await this.sharedataservice.setFitsenseStatus("ChallengesMain");
      this.navCtrl.parent.select(1);
    }
  }

  ionViewDidLeave() {
    console.log(">>> In policy Daashboard ionViewDidLeave");
    if (this.isRegistered == true) {
      this.channel.unsubscribe();
    }
  }

  navigateToIonicPage(pageName) {
    console.log('navigateToIonicPage' + pageName);
    this.navCtrl.setRoot(pageName);
  }

  goToStoryDetails(story) {
    this.navCtrl.push(StoryDetailPage, { "data": story });
  }

  getAvailableLoanResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("get available loan response ", data);
      let allLoansData = data.result;
      console.log("loans data", allLoansData);
      this.totalLoanAmount = allLoansData.totalLoanAmount.toString();
      this.policyLoanService.setAllData(allLoansData);
      this.filteredData = this.policyLoanService.filterData(allLoansData);
      this.policyLoanService.setFilteredData(this.filteredData);
    },
    fail: (errorService) => {
      this.logger.log("In fail of get available loan ", errorService);
      // this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage)
    },
    systemFailure: (errorService) => {
      this.logger.log("In systemFailure of get available loan ", errorService);
      if (errorService.httpStatus == 0) {
        this.getInternetConnectionGenericInterface(this.genericActionRetry);
      } else {
        this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage, this.genericActionRetry)
      }
    },
    progress: (isProgress) => {
      this.logger.log("In progress of get available service ", isProgress);
      this.isLoading(isProgress);
    }
  }

  genericActionRetry = <IDialogButton<any>>{
    name: this.tryAgainText,
    click: (data?) => {
      this.genericDialog = null;
      // this.changetab('Loans');
    }
  }

  // tooltip for policy dashboard 

  polictTabTooltip() {
    this.cta = <IDialogButton<any>>{
      name: this.translateService.instant("errors.errorButtons.next"),
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipData: [{ image: "../assets/imgs/homepd.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "homePagePolicy",
      actionCTA: this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }

  homeFitsense() {
    this.cta = <IDialogButton<any>>{
      name: this.translateService.instant("errors.errorButtons.tryAgain"),
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipData: [{ image: "../assets/imgs/01.Home-activity-tooltips.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "policyDashboadrd",
      actionCTA: this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }


  /**
    * @description -this method checks for dynamic link or push notification,in-app
     * then show that poilcy details accordingly
     */
  checkForDyLinkOBJ() {
    var dyLinkOBJ: DeepLinkObject = this.navParams.get(this.CONSTANT.DY_LINK_OBJ);
    if (dyLinkOBJ) {
      debugger
      switch (dyLinkOBJ.messageGroupId) {
        case dyLinkOBJConst.messageGroupId.policy_dashboard.id1:
          //show policy information
          this.homeSlider.changeslide(3);
          this.tabNum = 0;
          break;
        case dyLinkOBJConst.messageGroupId.policy_dashboard.id2:
          //show policy claims
          this.homeSlider.changeslide(3);
          this.tabNum = 1;
          this.changetab(this.policytabs[1]);
          break;
        case dyLinkOBJConst.messageGroupId.policy_dashboard.id3:
          //show policy loans
          this.homeSlider.changeslide(3);
          this.tabNum = 2;
          this.changetab(this.policytabs[2]);
          break;
      }
    }
  }

  changeToStories() {
    this.event.publish('slideChangeTo', 4);
  }
  challengeRedirect(){
    debugger;
    if(this.isRegistered){
      this.openFitsenseScreen('ChallengesMain')
    }else{
      this.gotoRegister();
    }
  }
}
