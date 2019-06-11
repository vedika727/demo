import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service'
import { PaymentDashboardPage, HomeDashboardCreditlifePage, SingleLoanPage, RegisterUserPage, ContactUsPage, MultipleLoanPage, EmailVerificationPopupPage, PolicyInfoPage, PaymentChangeBookPage, DashboardFullViewAccidentPage, PolicyDashboardPage, TabsPage } from '../../pages/pages';
import { NavController, Events } from 'ionic-angular';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { BaseApp } from '../../app/base';
import { IServiceResponse } from "../../common/service-models/iServiceResponse";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { FilteredLoanData } from '../../providers/policy-loan-services/services-request-data-model-class';
import { PolicyLoanServicesProvider } from '../../providers/policy-loan-services/policy-loan-services';
import { ThaiDateConversionProvider } from "../../providers/thai-date-conversion/thai-date-conversion";
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
/**
 *@author Banti Sutar
 */
@Component({
  selector: 'home-policy-tabs-details',
  templateUrl: 'home-policy-tabs-details.html'
})
export class HomePolicyTabsDetailsComponent extends BaseApp implements OnInit {
  showPayoutAcount: boolean;
  loansDataToModal: { email: any; };

  totalLoanAmount: string;
  data: { email: string; };
  text: string;
  @Input('in') insTypes: string;
  @Input('PolicyData') PolicyData: string;
  @Input('isRegistered') isRegistered: boolean;
  @Input('isSCBCustomer') isSCBCustomer: boolean;
  @Input('PolicyLoansData') PolicyLoansData: FilteredLoanData;

  filteredData: FilteredLoanData;
  totalcoverage: any = [];
  PolicyCoverage: any = [];
  CashBack: any = [];
  paymentDue: any = [];
  policyRiders: any;
  spinnerFlag: boolean;
  creditLifeData: any = [];
  showClaimItems: boolean;
  showClaimHistories: boolean;
  notClaimItemsAndNotClaimHistories: boolean;
  claimDataObject: any;
  claimdata: any;
  claimItemsData: any;
  claimHistoriesData: any;
  constructor(
    private firebaseAnalyticsService: FirebaseAnalyticsService,
    public navCtrl: NavController,
    public logger: LogServiceProvider,
    public policyLoanService: PolicyLoanServicesProvider,
    public modalService: ModalServiceProvider,
    private thaiDateConverter: ThaiDateConversionProvider,
    public events: Events,
    private homePdService: HomePdServiceProvider,
    public cacheService: CacheServiceProvider
  ) {
    super();
    logger.log('Hello HomePolicyTabsDetailsComponent Component');
    this.text = 'Hello World';
    this.showPayoutAcount = false;
    this.insTypes = "Information";
    this.totalLoanAmount = '1000000';
    this.showClaimItems = false;
    this.showClaimHistories = false;
    this.notClaimItemsAndNotClaimHistories = true;
    console.log(this.totalcoverage);
  }
  /**
    * @author Banti Sutar
    * @description This method is used to toggle the isLoggedIn value
    */
  ngOnInit(): void {
    this.getspinner(true);
    this.spinnerFlag = true;
    console.log("Policy loans data", this.PolicyLoansData)
    this.ifSinglePolicy();
    //this.insTypes = "Information";
    console.log("isSCBCustomer In Policy Tabs >>>>> ", this.isSCBCustomer);
    console.log("isRegistered In Policy Tabs >>>>> ", this.isRegistered);
    this.paymentDue = this.PolicyData["paymentDue"];
    this.CashBack = this.PolicyData["cashback"];
    this.policyRiders = this.PolicyData["policyCoverage"];
    this.creditLifeData = this.PolicyData["creditLifePolicy"];
    this.totalcoverage = [
      {
        label: this.policyRiders ? this.policyRiders[0].coverageShortName : "",
        value: this.policyRiders ? this.policyRiders[0].coverageAmount : 0,
        icon:
          "assets/scbl-icons/life-coverage"
      },
      {
        label: this.policyRiders ? this.policyRiders[1].coverageShortName : "",
        value: this.policyRiders ? this.policyRiders[1].coverageAmount : 0,
        icon: "assets/scbl-icons/accident"
      },
      {
        label: this.policyRiders ? this.policyRiders[2].coverageShortName : "",
        value: this.policyRiders ? this.policyRiders[2].coverageAmount : 0,
        icon:
          "assets/scbl-icons/cancer"
      },
      {
        label: this.policyRiders ? this.policyRiders[3].coverageShortName : "",
        value: this.policyRiders ? this.policyRiders[3].coverageAmount : 0,
        icon: "assets/scbl-icons/illness"
      },
      {
        label: this.policyRiders ? this.policyRiders[4].coverageShortName : "",
        value: this.policyRiders ? this.policyRiders[4].coverageAmount : 0,
        icon:
          "assets/scbl-icons/medicine"
      },
      {
        label: this.policyRiders ? this.policyRiders[5].coverageShortName : "",
        value: this.policyRiders ? this.policyRiders[5].coverageAmount : 0,
        icon:
          "assets/scbl-icons/ipd"
      },
      {
        label: this.policyRiders ? this.policyRiders[6].coverageShortName : "",
        value: this.policyRiders ? this.policyRiders[6].coverageAmount : 0,
        icon: "assets/scbl-icons/hospital-opd"
      }
    ];

    // calling claims API for homepage tab details section
    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then(res => {
      this.homePdService.getClaimsData().then((res) => {
        console.log('^^^got claims data in HOMEPAGE', res);
        this.claimDataObject = res;
        this.claimdata = this.claimDataObject.claimList;
        console.log('this.claimdata in HOMEPAGE has', this.claimdata);
        if (this.claimdata) {
          this.claimItemsData = this.claimdata[0].ClaimItems;
          this.claimHistoriesData = this.claimdata[0].ClaimHistories;

          //analytics function is called depending on status received for claimsHistories
          // for(var x in this.claimHistoriesData){
          //   if(this.claimHistoriesData[x].Status == 'อนุมัติเรียบร้อยแล้ว'){
          //     this.fba.logEvent('claim_completed','View claim information - visit with complete status');
          //   }
          //   else if(this.claimHistoriesData[x].Status == 'ได้รับเอกสารและอยู่ระหว่างการพิจารณา'){
          //     this.fba.logEvent('claim_require_document','View claim information - visit with document required');
          //   }
          //   else {
          //     this.fba.logEvent('claim_rejected','View claim information - visit with reject status');
          //   }
          // }

          // //analytics function is called depending on status received for claimsItems
          // for(var x in this.claimItemsData){
          //   if(this.claimItemsData[x].Status == 'อนุมัติเรียบร้อยแล้ว'){
          //     this.fba.logEvent('claim_completed','View claim information - visit with complete status');
          //   }
          //   else if(this.claimItemsData[x].Status == 'ได้รับเอกสารและอยู่ระหว่างการพิจารณา'){
          //     this.fba.logEvent('claim_require_document','View claim information - visit with document required');
          //   }
          //   else {
          //     this.fba.logEvent('claim_rejected','View claim information - visit with reject status');
          //   }
          // }


          console.log('this.claimItemsData in HOMEPAGE has', this.claimItemsData);
          console.log('this.claimHistoriesData in HOMEPAGE has', this.claimHistoriesData);
          if (this.claimItemsData.length > 0) {
            this.showClaimItems = true;
            this.showClaimHistories = false;
            this.notClaimItemsAndNotClaimHistories = false;
          }
          else if (this.claimHistoriesData.length > 0) {
            this.showClaimItems = false;
            this.showClaimHistories = true;
            this.notClaimItemsAndNotClaimHistories = false;
          }
        }
        // console.log('claimdata ^^$$^^', this.claimdata);
      }, (err) => {
        console.log('^^^NO claims data in HOMEPAGE', err);
      });
    });
  }

  ifSinglePolicy() {
    if (this.PolicyLoansData && this.isRegistered) {
      if (this.PolicyLoansData.eligibleLoanPolicies.length == 1) {
        if (this.PolicyLoansData.eligibleLoanPolicies[0].preferPayoutBankAccount) {
          this.showPayoutAcount = true
        }
      }
    }
  }

  changePayoutAccount() {
    this.navCtrl.parent.parent.push(PaymentChangeBookPage)
  }

  logIn() {
    this.isRegistered = !this.isRegistered;
  }

  moreInfo(policyNum) {
    this.navCtrl.push(PaymentDashboardPage, { policyNumber: policyNum });
  }
  GotoCreditLife() {
    this.navCtrl.parent.select(1);
    //this.navCtrl.push(HomeDashboardCreditlifePage);
    // this.logger.log("call HomeDashboardCreditlifePage ")
  }


  findKeyValue(obj: any, key: string) {
    let result;

    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        // in case it is an object
        if (typeof obj[property] === "object") {
          result = this.findKeyValue(obj[property], key);

          if (typeof result !== "undefined") {
            return result;
          }
        }
        else if (property === key) {
          return obj[key]; // returns the value
        }
      }
    }
  }


  // Go to register page 
  // Go to register page 
  redirectDetail() {
    this.navCtrl.parent.select(1);
  }
  toregister() {
    this.navCtrl.parent.parent.setRoot(RegisterUserPage);
    this.navCtrl.popToRoot();
  }

  toCustomerCars() {
    this.navCtrl.push(ContactUsPage);
  }

  loansFlow() {
    console.log("loans Flow clicked");
  }
  toLoans() {
    if (!this.PolicyLoansData.isEmailVerify) {
      this.loansDataToModal = {
        email: this.PolicyLoansData.email
      }
      this.modalService.presentModal(EmailVerificationPopupPage, { data: this.loansDataToModal, "nav": this.navCtrl });
    }
    else if (this.PolicyLoansData.eligibleLoanPolicies.length == 1) {
      if (!this.PolicyLoansData.eligibleLoanPolicies[0].preferPayoutBankAccount) {
        let navigationData = {
          pageToNavigate: PolicyDashboardPage,
          navParamsData: null
        }
        this.navCtrl.parent.parent.push(PaymentChangeBookPage, { navigationData: navigationData })
      }
      else {
        this.policyLoanService.setSelectedPolicy(this.PolicyLoansData.eligibleLoanPolicies[0]);
        let policyData = {
          SelectedTab: 'Loan', isSingle: true,
        }
        this.policyLoanService.setPolicyData(policyData);
        //this.navCtrl.setRoot(TabsPage, { selecttab: 1 });
        this.navCtrl.parent.select(1);
      }
    }
    else {
      let policyData = {
        SelectedTab: 'Loan', isSingle: false,
      }
      this.policyLoanService.setPolicyData(policyData);
      //this.navCtrl.setRoot(TabsPage, { selecttab: 1 });
      this.navCtrl.parent.select(1);
    }

  }

  gotoStories() {
    console.log('stories are here');
    // navigate to stories
    this.events.publish('slideChangeTo', 4);
  }
}
