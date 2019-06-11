import { HttpServiceProvider } from '../../providers/data-service/http-service';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
    ChallengesFullViewPage,
    DashboardFullViewAccidentPage,
    PolicyDashboardPage,
    RewardsFullViewPage,
    StoriesFullViewPage,
} from '../../pages/pages';
import { FirebaseAnalyticsService} from '../../providers/firebase-service/firebase-analytics-service'
import { SharedataProvider } from '../../providers/sharedata/sharedata';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { RegisterUserPage } from '../../pages/pages';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { BaseApp } from '../../app/base';
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';
@Component({
  selector: 'pd-header-tabs',
  templateUrl: 'pd-header-tabs.html'
})
export class PdHeaderTabsComponent extends BaseApp {
  isSCBCustomer: {};
   insTypes:string;
   @Input("in") policytabs:any;
   @Input("expand") PolicyTabsFlags:PolicyTabsFlags = new PolicyTabsFlags();
   @Input("halfSegment") halfSegment:boolean;
   @Input("tabNumber") tabNumber:number;
   @Input("PolicyData") PolicyData:boolean;

   isRegistered:boolean;
   index:any;
   currenttabname:any;
   anyClaimData:any = [];
   anyClaimDataItems:any = [];
   anyClaimDataHistories:any = [];
   @Output() currenttab = new EventEmitter();
  constructor(
    public logger : LogServiceProvider,
    public navCtrl: NavController,
    public http : HttpServiceProvider,
    public firebaseAnalyticsService:FirebaseAnalyticsService,
    public sharedataservice: SharedataProvider,
    private cacheService:CacheServiceProvider,
    private homePdService: HomePdServiceProvider,
   ){
       super();
    logger.log('Hello TitleHeadComponent Component');
    this.tabNumber=0;
    this.sharedataservice.currentMessage.subscribe(message => {
      this.index = message;
      //this.isRegister = true;
    });
    this.sharedataservice.currentTabs.subscribe(tabsindex => {
      this.insTypes = tabsindex;
      //this.isRegister = true;
    });
    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res:any)=>{
      console.log('got isregesiterd',this.isRegistered);
      this.isRegistered = res;
  },(err)=>{
    console.log('DIDNT GET isregesiterd',err);
    // this.isRegistered = err;
  })

  this.cacheService.getCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER).then((res) => {
    console.log('got is isSCBCustomer', res);
    this.isSCBCustomer = res;
   
  }, (err) => {
     ;
    console.log('DIDNT GET isregesiterd', err);
    // this.isSCBCustomer = err;
  })
    
  }
  /**
   * This method is used to get tabname onSegmentChange
   * @param tabname 
   * @author Banti Sutar
   */
  onSegmentChange(tabname){
    this.currenttabname = tabname;
    this.currenttab.emit(tabname);
    //this.sharedataservice.setTab(tabname)
  }
  gotoRegister(){
   if(!this.isSCBCustomer){

    this.gotodetailpage()
   }else{
    if(this.index == 3){
      console.log("Non SCB Customer Expand View Called...Not Configured.");
    }else{
      this.gotodetailpage()
    }
   }
     
    
  }
  /**
   *@author Banti Sutar
   * This method is called to navigate to DashboardFullViewAccidentPage
   */
   gotodetailpage(){
    let policyNumber;
    let allPolicies;
    let firstPolicy;
    if(this.index == 3){
            /** This method ends here */
      this.navCtrl.push(DashboardFullViewAccidentPage , {"SelectedTab" : this.currenttabname,"PolicyData":this.PolicyData});
    }
    else if(this.index == 4 || this.index == 5){
      this.navCtrl.push(StoriesFullViewPage, {"SelectedTab" : this.currenttabname});
    }
    else if(this.index == 1){
      this.navCtrl.push(RewardsFullViewPage, {"SelectedTab" : this.currenttabname});
    }
    else if(this.index == 2){
      this.navCtrl.push(ChallengesFullViewPage, {"SelectedTab" : this.currenttabname});
    }
    else{
      console.log("It is default");
    }
  
}
 
  ngOnInit(){
   
  
    if(this.PolicyTabsFlags.expandflag){
      this.insTypes = this.PolicyTabsFlags.expandflag;
    }else{
      if(this.tabNumber != 0){
        this.insTypes = this.policytabs[this.tabNumber];
      }
      else{
        this.insTypes = this.policytabs[0];
      }
    }    
  }

}
export class PolicyTabsFlags {
  expandflag: string;
  iconhideflag: boolean= false ;
   constructor(){

  }
}
