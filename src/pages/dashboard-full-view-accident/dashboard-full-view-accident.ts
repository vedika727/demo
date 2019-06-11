import { LogServiceProvider } from '../../providers/data-service/log-service';
import { Component, OnInit, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddPolicyPage, EmailVerificationPopupPage, SingleLoanPage, PaymentChangeBookPage, PolicyLoanConfirmationPage, PolicyInfoPage, NonLoanablePolicyListPage } from '../pages';
import { HeaderInputs } from '../../components/scb-header-icon/scb-header-icon';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { PolicyTabsFlags } from '../../components/pd-header-tabs/pd-header-tabs';
import { PolicyDashboardServiceProvider } from '../../providers/policy-dashboard-service/policy-dashboard-service';
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';
import { LoadingServiceProvider } from '../../providers/ion-service/loading-service';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { BaseApp } from '../../app/base';
import { FilteredLoanData, IndividualPolicyInformation } from '../../providers/policy-loan-services/services-request-data-model-class';
import { PolicyLoanServicesProvider } from '../../providers/policy-loan-services/policy-loan-services';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { IServiceResponse } from 'common/service-models/iServiceResponse';
import { IDialogButton } from "components/generic-view/iDialog-action";
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { ThaiDateConversionProvider } from "../../providers/thai-date-conversion/thai-date-conversion";
import { DeepLinkObject } from 'common/models/deep-Link.class';
import { TranslateService } from 'ng2-translate';

@IonicPage()
@Component({
  selector: 'page-dashboard-full-view-accident',
  templateUrl: 'dashboard-full-view-accident.html',
})
export class DashboardFullViewAccidentPage extends BaseApp implements OnInit {
  loansData: any;
  thaiDateToConfirmationPage: string;
  todaysDate: string;
  singlePolicyDetails: IndividualPolicyInformation;
  isSinglePolicy: any;
  withoutPayout: boolean;
  withPayoutCount: number;
  withPayout: boolean;
  tabNum: any;
  multipleLoansData: any;
  loansDataToModal: { email: any; };
  totalLoanAmount: any;
  pieChartData1: any;
  filteredData: FilteredLoanData;
  isHalf:boolean = true;
  dashboardheader = {
    "title": 'PolicyDashboard',
    "icon": 'scbl-policy-dashboard'
  }
  dataForClaimsHistory: any;
  policyLists: any = [];
  pdStatus: boolean = true;
  isCreditLife: boolean = false;
  spinnerFlag: boolean;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  PolicyTabsFlagsinputs: PolicyTabsFlags = new PolicyTabsFlags();
  thaiCalendar: any = [`มกราคม`,
    `กุมภาพันธ์`,
    `มีนาคม`,
    `เมษายน`,
    `พฤษภาคม`,
    `มิถุนายน`,
    `กรกฎาคม`,
    `สิงหาคม`,
    `กันยายน`,
    `ตุลาคม`,
    `พฤศจิกายน`,
    `ธันวาคม`];

  englishCalendar: any = [`January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`];


  policyData: any = [];
  totalcoverage: any = [];
  newPolicies: any = [];
  pieChartData: any = [];
  currenttabname: any;
  policytabs: any = ['Information', 'Claim', 'Loan'];
  boolval: any;
  policyList: any = [];
  policyDetailsFull: any;
  piechartAPIData: any = [];
  isRegistered: any;
  isSCBCustomer: any;
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public logger: LogServiceProvider,
    private pdService: PolicyDashboardServiceProvider,
    public homePdService: HomePdServiceProvider,
    public loadingService: LoadingServiceProvider,
    private cacheService: CacheServiceProvider,
    public policyLoanService: PolicyLoanServicesProvider,
    public modalService: ModalServiceProvider,
    public toolTipService: TooltipServiceProvider,
    private thaiDateConversion: ThaiDateConversionProvider,
    public translate: TranslateService,
    public injector?: Injector,

  ) {
    super(injector);
    
    this.policyDashToolTip();
    this.tabNum = 0;
    this.headerInput.isProfile = true;
    this.withPayout = false;
    this.withoutPayout = false
    this.headerInput.nav = navCtrl;
    debugger
    this.loansData=this.policyLoanService.getPolicyData();
    this.tabNum=this.loansData? this.tabNum=2 : this.tabNum=0;
    this.headerInput.isNotification = true;
    this.PolicyTabsFlagsinputs.iconhideflag = true;
    this.todaysDate = new Date().toISOString();
    this.thaiDateToConfirmationPage = this.thaiDateConversion.convertIsoToDate(this.todaysDate, true, 2);
    this.cacheService.getCache("PiechartData").then((res) => {
      console.log('data from cache....:', res);
      if (res) {
        this.pieChartData1 = res;

        this.pieChartData = this.pieChartData1.policyCoverage;
        if (this.pieChartData == null) {
          this.isCreditLife = true;
        } else {
          this.isCreditLife = false;
        }

        console.log(" credit life status is ", this.isCreditLife);
        this.totalcoverage = [
          {
            label: this.pieChartData[0].coverageShortName,
            value: this.pieChartData[0].coverageAmount,
            icon: "assets/scbl-icons/life-coverage"
          },
          {
            label: this.pieChartData[1].coverageShortName,
            value: this.pieChartData[1].coverageAmount,
            icon: "assets/scbl-icons/accident"
          },
          {
            label: this.pieChartData[2].coverageShortName,
            value: this.pieChartData[2].coverageAmount,
            icon: "assets/scbl-icons/cancer"
          },
          {
            label: this.pieChartData[3].coverageShortName,
            value: this.pieChartData[3].coverageAmount,
            icon: "assets/scbl-icons/illness"
          },
          {
            label: this.pieChartData[4].coverageShortName,
            value: this.pieChartData[4].coverageAmount,
            icon: "assets/scbl-icons/medicine"
          },
          {
            label: this.pieChartData[5].coverageShortName,
            value: this.pieChartData[5].coverageAmount,
            icon: "assets/scbl-icons/ipd"
          },
          {
            label: this.pieChartData[6].coverageShortName,
            value: this.pieChartData[6].coverageAmount,
            icon: "assets/scbl-icons/hospital-opd"
          }
        ];
      }
    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    })


  }


  /**
   * @author Rajul Dixit
   * @description This method is used to call Add New Policy Page
   * @param evt 
   */
  addNewPolicy(evt) {
    this.logger.log("Add new Policy", evt);
    this.navCtrl.push(AddPolicyPage);
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad DashboardFullViewAccidentPage');

  }
  ionViewDidEnter() {
    this.policyDashToolTip();
  }
  ngOnInit() {
    //this.policyDashToolTip();
    this.getspinner(true);
    this.spinnerFlag = true;
    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got is Registered', res);
      console.log('Type of reg Flag', typeof (res));

      this.isRegistered = res;
      if(!this.isRegistered){
        this.currenttabname = 'Information';
      }

    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    })
    this.cacheService.getCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER).then((res) => {
      console.log('got is isSCBCustomer', res);

      this.isSCBCustomer = res;
      if (this.isSCBCustomer == true) {
        console.log("Loan tab called in dashboard full view ");
        if(this.loansData){
          this.currenttabname='Loan'
          this.isSinglePolicy = this.loansData.isSingle;
          if(this.isSinglePolicy){
            
            this.singlePolicyDetails = this.policyLoanService.getSelectedPolicy()
            this.callSingleLoans();
          }
          else{
            
            this.filteredData=this.policyLoanService.getFilteredData();
            this.callLoans();
          }
        }
        else{
          this.currenttabname = 'Information';
          this.policyLoanService.getAvailableLoan(this.getAvailableLoanResponse);
        }
        //this.loanpopup2Tooltip();
        this.homePdService.getallPolicies().then((res) => {
          this.policyList = res;
          if (this.policyList.policies) {
            this.policyLists = this.policyList.policies;
            console.log("response from policyList service ", this.policyList);
            // get policy by policy number
            this.homePdService.getPolicyByPolicyNumber(this.policyLists[0].policyNumberIL).then((res) => {
              this.policyDetailsFull = res;
              // this.policyDetailsFull.policyPremium= this.policyDetailsFull.policyPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
              // this.policyDetailsFull.currentCashBack.cashReturn= this.policyDetailsFull.currentCashBack.cashReturn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
              
              if (this.policyDetailsFull.policyStatus == "inactive" || this.policyDetailsFull.policyStatus == "lapsed" || this.policyDetailsFull.policyStatus == "surrender" || this.policyDetailsFull.policyStatus == "matured") {
                this.pdStatus = false;
              } else {
                this.pdStatus = true;
              }
              ;

              
              console.log(" pd status 1111====", this.pdStatus);
              console.log("response from PolicyByNumber service BANTI", this.policyDetailsFull);
              this.getspinner(false);
              this.spinnerFlag = false;

            }, (err) => {
              this.logger.log('error', err);
              this.loadingService.dismissLoading();
            });
          } else {
            console.log("No policies found:::::::::");
          }

        }, (err) => {
          this.logger.log('error', err);
          this.loadingService.dismissLoading();
        })
      }

    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isSCBCustomer = err;
    })



    // this.homePdService.getClaimsData().then((res) => {
    //   console.log('^^^got claims data', res);
    //   this.dataForClaimsHistory = res;
    // }, (err) => {
    //   console.log('^^^NO claims data', err);
    // });

  }

  /**
  * @author Banti Sutar
  * @description This method is used to call Respective Page shown on Grid(Policy Info,Support Docs,Insurrance card)
  * @param it takes page-name as parameters
  */
  navigate(page) {
    let policyDetail = this.policyDetailsFull.policyRiders;
    let length = this.policyDetailsFull.policyRiders.length;
    for (let i = 0; i < length; i++) {
      let maturityDate = policyDetail[i].riderMaturityDate;
      maturityDate = maturityDate.substring(0, 10);
      this.policyDetailsFull.policyRiders[i].riderMaturityDate = maturityDate;
    }

    console.log("New policy details objects ", this.policyDetailsFull);
    this.navCtrl.push(page, { "data": this.policyDetailsFull });

  }

  changetab(currenttab) {
    this.currenttabname = currenttab;
    console.log(currenttab);
    switch (this.currenttabname) {
      case "Loan": {
        this.currenttabname = 'Loan';
        this.tabNum = 2;
         this.loanpopup2Tooltip();
        if (this.singlePolicyDetails) {
          this.callSingleLoans();
        }
        else if (this.filteredData) {
          this.callLoans();
        }

      }
      case "Claim": {
        //this.policyClaimtooltip();
      }
    }
  }
  /**
     * @description This method is used for Loans Tab
     */
  callLoans() {
    console.log("filteredData", this.filteredData);
    if (!this.filteredData.isEmailVerify) {
      this.loansDataToModal = {
        email: this.filteredData.email
      }
      this.modalService.presentModal(EmailVerificationPopupPage, { data: this.loansDataToModal, "nav": this.navCtrl });
    }
    else
      if (this.filteredData.eligibleLoanPolicies.length == 1) {
        if (!this.filteredData.eligibleLoanPolicies[0].preferPayoutBankAccount) {
          this.navCtrl.parent.parent.push(PaymentChangeBookPage);
        }
        else {
          this.policyLoanService.setSelectedPolicy(this.filteredData.eligibleLoanPolicies[0]);
          this.singlePolicyDetails = this.policyLoanService.getSelectedPolicy()
          //this.navCtrl.push(DashboardFullViewAccidentPage, { SelectedTab: 'Loan', isSingle: true });
        }
      }
      else {
        this.filteredData.eligibleLoanPolicies.forEach((data) => {
          if (data.preferPayoutBankAccount) {
            this.withPayout = true
          }
          else {
            this.withoutPayout = true
          }
        });
        this.multipleLoansData = this.filteredData;
        console.log("multipleLoansData:", this.multipleLoansData)
      }
  }

  callSingleLoans() {
    debugger
    if (!this.singlePolicyDetails.preferPayoutBankAccount) {
      this.navCtrl.parent.parent.push(PaymentChangeBookPage);
    }
    else {
      this.policyLoanService.setSelectedPolicy(this.singlePolicyDetails);
    }
  }

  submitToSingleLoan(data: IndividualPolicyInformation) {
    console.log("Individual policy info ", data);
    this.policyLoanService.setSelectedPolicy(data);
    this.policyLoanService.setFilteredData(this.filteredData);
    this.navCtrl.push(SingleLoanPage);
  }

  submitToConfirmationPage(loanAmount: number) {
    console.log(loanAmount);
    this.singlePolicyDetails.loanAmountRequired = loanAmount;
    this.policyLoanService.setSelectedPolicy(this.singlePolicyDetails);
    console.log("Data on single loan ", this.singlePolicyDetails);
    this.navCtrl.push(PolicyLoanConfirmationPage, { data: this.thaiDateToConfirmationPage });
  }

  /**
   * @author Manish Khedekar
   * @description This method is used to get value of a key from an object
   * @param it takes object and key to be searched as parameters
   */

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


  getAvailableLoanResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("get available loan response ", data);
      let allLoansData = data.result;
      console.log("loans data", allLoansData);
      this.policyLoanService.setAllData(allLoansData);
      this.filteredData = this.policyLoanService.filterData(allLoansData);
      this.policyLoanService.setFilteredData(this.filteredData);
    },
    fail: (errorService) => {
      
      this.logger.log("In fail of get available loan ", errorService);
      this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage)
    },
    systemFailure: (errorService) => {
      this.logger.log("In systemFailure of get available loan ", errorService);
      if (errorService.httpStatus == 0) {
        this.getInternetConnectionGenericInterface(this.genericActionRetry)
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
    name: this.translate.instant('errors.errorButtons.tryAgain'),
    click: (data?) => {
      this.genericDialog = null;
      this.changetab('Loan');
    }
  }


  alert() {
    console.log();
    this.toolTipService.dissmisstoolTipModal();
  }
  policyDashToolTip() {
    this.cta = <IDialogButton<any>>{
      name: this.translate.instant('errors.errorButtons.next'),
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipData: [{ image: "./assets/imgs/pdtool.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "policyDashboadrd",
      actionCTA: this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }


  policyCashbackTooltip() {
    this.cta = <IDialogButton<any>>{
      name: this.translate.instant('errors.errorButtons.next'),
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipData: [{ image: "../assets/imgs/TT03-PD-cashback amounts.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "policyCashBack",
      actionCTA: this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }


  loanpopup2Tooltip() {
    this.cta = <IDialogButton<any>>{
      name: this.translate.instant('errors.errorButtons.next'),
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      toolTipData: [{ image: "../assets/imgs/PL_tooltips_screen_01@3x.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน ยืนยันหรือเพิ่มบัญชีในการรับเงิน" },
      { image: "../assets/imgs/PL_tooltips_screen_02@3x.png", imageDesc: "ระบุจำนวนเงินที่ต้องการกู้จากกรมธรรม์ และยืนยันการกู้" }],
      toolTipKey: "loanPopUp2",
      actionCTA: this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }

  toPolicyDetails() {
    this.navCtrl.push(PolicyInfoPage)
  }

  /**
  * @description -this method checks if policy number comes through dynamic link or push notification,in-app
  * then show that poilcy details first in the array
  */
  checkForDyLinkOBJ() {
    var dyLinkOBJ: DeepLinkObject = this.navParams.get(this.CONSTANT.DY_LINK_OBJ);
    if (dyLinkOBJ && dyLinkOBJ.policyNumber) {
      //add code
    }
  }

  nonEligiblePolicyList(){
    console.log('nonEligiblePolicyList');
    this.navCtrl.push(NonLoanablePolicyListPage,{"data":this.filteredData.nonEligibleLoanPolicies});
  }

}
