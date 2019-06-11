import { Injector } from '@angular/core';

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular/index';
import { PolicyListPage } from '../../pages/pages';
import { SharedataProvider } from '../../providers/sharedata/sharedata'

import { SlideInOutAnimation } from './animation';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';
import { BaseApp } from '../../app/base';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
import { element } from 'protractor';

@Component({
  selector: 'allpolicy-detail-tabs',
  templateUrl: 'allpolicy-detail-tabs.html',
  animations: [SlideInOutAnimation]
})
export class AllpolicyDetailTabsComponent extends BaseApp implements OnInit {
  @Input('in') policyLists: any = [];
  @Input('DetailPolicy') policySingleData: any = [];
  @Input('polStatus') pdStatusdata: any;
  @Input('creditLife') isCreditLife: any;
  @Output() addPolicy = new EventEmitter();
  @Output() detailPolicy = new EventEmitter();
  public newPolicyData: any = [];
  segmentPolicy: any = [2];
  policies: any;
  public count: number;
  showList: boolean = true;
  policyCount: boolean = true;
  animationState: any;
  timelineData: any;
  PolicyNumberArray: any = [];
  policyData: any = [];
  policyalllist: any = [];
  ind: any = 0;
  polCoverage: boolean = false;
  spinnerFlag: boolean;
  spinnerFlagDetail: boolean;
  spinnerFlagAll: boolean;
  policyDetailData: any = [];
  policyDetailDatainfo: any = [];
  isIndented: boolean = true;
  pdStatus: any;
  selectOptions: { title: string; subTitle: string; mode: string; };

  constructor(public homePdService: HomePdServiceProvider,
    public navCtrl: NavController, 
    public nav: NavController, 
    public logger:LogServiceProvider,
    private share: SharedataProvider,
     public injector:Injector,
    private fba:FirebaseAnalyticsService) {
    super(injector);

    this.count = 0;
    this.policies = "0";
    this.animationState = 'out';
    this.selectOptions = {
      title: 'Pizza Toppings',
      subTitle: 'Select your toppings',
      mode: 'md'
    };


    this.logger.log("constructor of policy status from main page ", this.pdStatus);
    this.logger.log("credit life of policy status from main page ", this.isCreditLife);
    // this.policyDatas = [
    //   {
    //       "policyNumber": "40000408",
    //       "policyNumberIL": "40000408",
    //       "policyCommercialName": "Pra-Gun-Orm-Sabai Chod-Choie-Rai-Wan",
    //       "policyNextDueDate": "2561-08-18"
    //   },
    //   {
    //     "policyNumber": "40000408",
    //     "policyNumberIL": "40000408",
    //     "policyCommercialName": "Pra-Gun-Orm-Sabai Chod-Choie-Rai-Wan",
    //     "policyNextDueDate": "2561-08-18"
    // }
    //  ]


    // this.policyList= this.PolicyData;

    /**
     * @author Banti Sutar
     * @description This is used to get NewAddedPolicy in newPolicyData Array
     */
    // this.share.currentMessage.subscribe(message => {
    //   logger.log("message :",message);
    //   if(message != 0){
    //     // this.newPolicyData[this.count] = message;
    //     this.newPolicyData.push(message);
    //     this.count++;
    //   }
    //   else {
    //     logger.log("nothing in message");
    //   }
    // })
    this.logger.log('Hello AllpolicyDetailTabsComponent Component');
  }
  toggleShowDiv(divName: string) {
    if (divName === 'divA') {
      this.animationState = this.animationState === 'in' ? 'out' : 'in';
    }
  }

  toggleShowDiv1(PolicyNumber: any, k: any) {
    
    this.animationState = this.animationState === 'in' ? 'out' : 'in';
    // this.detailPolicy.emit(PolicyNumber);
    this.detailSinglePolicy(PolicyNumber)


    console.log(" k is  ==" ,k);
    k = k+2 ;
    console.log("k i late =====",k)
    if (this.ind == 0) {
      let i = 0;
      this.segmentPolicy.forEach(element => {
        if (this.policyLists[k] == undefined) {
          this.segmentPolicy[i] = this.policyLists[0];
        } else {
          this.segmentPolicy[i] = this.policyLists[k];
          i++;
          k++;
        }
      });
    } else {
      let i = 1;
      this.segmentPolicy.forEach(element => {
        if (this.policyLists[k] == undefined) {
          this.segmentPolicy[i] = this.policyLists[0];
        } else {
          this.segmentPolicy[i] = this.policyLists[k];
          i--;
          k++;
        }
      });
    }
    console.log(" data after click on list ", this.segmentPolicy);
    this.policies = this.ind;


  }
  toggleShowDiv2(PolicyNumber:any,n:any){
    this.fba.logEvent("policy_view_"+PolicyNumber,"Click to view policy info via tab");
    if(this.ind != n){
      this.ind= n;
      console.log("call service its a different tab")
      this.detailSinglePolicy(PolicyNumber);
    }else{
      console.log("its the same tab dont call any service")
    }
    console.log(" policies value after click" ,this.policies);
    this.logger.log(" afterclick check  status",this.pdStatus);
    // this.detailPolicy.emit(PolicyNumber); 
  }

  /**
   * @author Banti Sutar
   * @description This method is used to call edit policy page
   */

  policyDetail(PolicyNumber) {
    alert("edit policy");
    this.logger.log("Policy Detail called :", PolicyNumber);

  }
  ionViewDidEnter() {

  }
  ngOnInit() {
    console.log("Data in All Policy Component before passing", this.policySingleData);
    this.policyDetailData = this.policySingleData;
    this.policyDetailDatainfo = this.policySingleData;
    console.log("Data in All Policy Component before passing to insurance card...", this.policyDetailDatainfo);
    this.pdStatus = this.pdStatusdata;
    this.policies = 0;

    this.logger.log(" policy status from main page ", this.pdStatus);
    this.logger.log("credit life of ngoninit ", this.isCreditLife);
    let length = this.policyLists.length;
    if (length == 1) {
      this.segmentPolicy[0] = this.policyLists[0];
    } else {
      for (let i = 0; i <= 1; i++) {
        this.segmentPolicy[i] = this.policyLists[i];
      }
    }
    if (length <= 2) {
      this.showList = false;
    }
    console.log("show list for data", this.showList);
    if (length < 5) {
      this.policyCount = false;
    }
    console.log("policy for check count", this.policyCount);

    console.log(" new list of ours ", this.segmentPolicy);
    console.log(" data to all policy detail ", this.policyDetailData);

       // validating covergage data 
       if(this.policyDetailData.policyRiders.length > 0){

        this.policyDetailData.policyRiders.forEach((obj)=>{
          if(this.policyDetailData.policyRiders.every(obj => obj.riderGroupName === "")){
            this.polCoverage = true;
          }else{
            this.polCoverage = false ;
          }
          
           
      })

      }else{
        this.polCoverage= true ;
      }
        console.log(" polcoverage ", this.polCoverage);
  
   
    // this.PolicyData.forEach(element => {
    //   this.PolicyNumberArray[i] = element.policyDetails.policynumber;
    //   i++;
    // });
    // console.log(this.PolicyNumberArray);
    //    this.logger.log(this.PolicyData);
  }


  /**
   * @author Banti Sutar
   * @description This method is used to navigate to policy list page
   */

  getPolicyList() {
    this.animationState = this.animationState === 'in' ? 'out' : 'in';

    this.nav.push(PolicyListPage, { data: this.policyLists, callback: this.getData });
  }


  getData = data => {

    return new Promise((resolve, reject) => {
      /* 
   It changes the value in segment array, e.g if uh select index 2nd value in list
   it will add 2nd and 3rd value of list as first two value of segment array by
   keeping 1st one as active,

   also if user selects last index , the instead of setting last value  & one undefinde vale
   it will select last value and first value as segment array value

      
   */ 
      console.log(" data from policy info page ",data);
      this.getspinner(true);
      this.policyDetailData = '';
      this.spinnerFlagDetail = true;
      // get policy by policy number
      this.homePdService.getPolicyByPolicyNumber(data[0].policyNumberIL).then((res) => {
        this.policyDetailData = res;
        this.policyDetailDatainfo = res;

        this.getspinner(false);
        //this.policyDetailData = '';
        this.spinnerFlagDetail = false;

        if (this.policyDetailData.policyStatus == "inactive" || this.policyDetailData.policyStatus == "lapsed" || this.policyDetailData.policyStatus == "surrender" || this.policyDetailData.policyStatus == "matured") {
          this.pdStatus = false;
        } else {
          this.pdStatus = true;
        }
        console.log("response from PolicyByNumber service ", this.policyDetailData);
      });


      this.policies = 0;
      let i = 0;
      this.segmentPolicy.forEach(element => {
        if (this.policyLists[data[0].index] == undefined) {
          this.segmentPolicy[i] = this.policyLists[0];
        } else {
          this.segmentPolicy[i] = this.policyLists[data[0].index];
          i++;
          data[0].index++;
        }
      });
      console.log(" data after click on list ", this.segmentPolicy);
      this.policies = this.ind;
      resolve();
    });
  };
  /**
   * @author Banti Sutar
   * @description This method is used to call Respective Page shown on Grid(Policy Info,Support Docs,Insurrance card)
   * @param it takes page-name as parameters
   */
  navigate(page, policyData) {
    let data=policyData;
    data["isCreditLife"] = this.isCreditLife;
    this.navCtrl.push(page, { data });
  }

  detailSinglePolicy(policyNumber) {
    this.getspinner(true);
    this.policyDetailData = '';
    this.spinnerFlagDetail = true;
    this.homePdService.getPolicyByPolicyNumber(policyNumber).then((res) => {
      this.policyDetailData = res;
    
      this.policyDetailDatainfo = res;
      console.log("in single policy call ", this.policyDetailDatainfo);
      // to change date format for timeline
      this.getspinner(false);
      //this.policyDetailData = '';
      this.spinnerFlagDetail = false;
      this.policyDetailData.policyPremium= this.policyDetailData.policyPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
      this.policyDetailData.currentCashBack.cashNetReturnPrevious= this.policyDetailData.currentCashBack.cashNetReturnPrevious.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 

      if (this.policyDetailData.policyStatus == "inactive" || this.policyDetailData.policyStatus == "lapsed" || this.policyDetailData.policyStatus == "surrender" || this.policyDetailData.policyStatus == "matured") {
        this.pdStatus = false;
      } else {
        this.pdStatus = true;
      }
      
      // validating covergage data 
      if(this.policyDetailData.policyRiders.length > 0){

        this.policyDetailData.policyRiders.forEach((obj)=>{
          if(this.policyDetailData.policyRiders.every(obj => obj.riderGroupName === "")){
            this.polCoverage = true;
          }else{
            this.polCoverage = false ;
          }
          
           
      })

      }else{
        this.polCoverage= true ;
      }
    
      console.log(" polcoverage ", this.polCoverage);

      console.log(" pd status 22222====", this.pdStatus);
      console.log("response from PolicyByNumber service ", this.policyDetailData);
      this.getspinner(false);
      //this.policyDetailData = '';
      this.spinnerFlagDetail = false;
    });
  }
}
