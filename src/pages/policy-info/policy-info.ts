import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { SingleLoanPage, PaymentChangeBookPage,PolicyLoanDashboardPage, MultipleLoanPage, DashboardFullViewAccidentPage, EmailVerificationPopupPage, PolicyDashboardPage } from "../pages";
import { PolicyLoanServicesProvider } from '../../providers/policy-loan-services/policy-loan-services';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { GetAvailableLoan } from '../../common/models/get-available-loan.class';
import { FilteredLoanData } from '../../providers/policy-loan-services/services-request-data-model-class';
import { BaseApp } from '../../app/base';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
import { ThaiDateConversionProvider } from '../../providers/thai-date-conversion/thai-date-conversion';
import { TranslateService } from 'ng2-translate';

/**
 *@author Rajul Dixit
 */

@IonicPage()
@Component({
  selector: 'page-policy-info',
  templateUrl: 'policy-info.html',
})
export class PolicyInfoPage extends BaseApp{
  loansDataToModal: { email: any; };
  // allLoansData: GetAvailableLoan;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  PolicyTitle = "PolicyDetails";
  policyDetails: any;
  policyRiders: any;
  filteredData:FilteredLoanData;
  policyStatus = [
    {
      icon: "",
      header: "",
      detail: "",
      amount: "",
      borderBottomCss: ""
    }
  ];

  totalDebts : any [];
  loanInfo : any [];
  todaysDate:string = new Date().toISOString();

  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  constructor(public logger: LogServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public policyLoanService: PolicyLoanServicesProvider,
    public modalService: ModalServiceProvider,
    public toolTipService:TooltipServiceProvider,
    private thaiDateConverter:ThaiDateConversionProvider,
    private fba:FirebaseAnalyticsService,
    public translate: TranslateService,
    public injector?: Injector
    ) {
      super(injector);
      
    this.policyInfoToolTip();
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.policyDetails = this.navParams.get("data");
    this.fba.logEvent("policy_view_"+this.policyDetails.policyNumber,"Visit policy page with active policy");
    //this.policyRiders = this.policyDetails.policyRiders;
    this.logger.log("Data from nav params ", this.policyDetails);
    this.policyLoanService.getAvailableLoan(this.getAvailableLoanResponse);
  }

  ionViewDidLoad() {
    this.totalDebts = [];
    this.loanInfo = [];
    this.logger.log('ionViewDidLoad PolicyInfoPage', this.policyRiders);
    this.policyStatus = [
      {
        icon: "scbl-policy-i-have",
        header: "มูลค่าเงินสดกรมธรรม์ 2,000,000 บาท ",
        detail: "อัพเดทล่าสุด 2 มิถุนายน 61",
        amount: "20000",
        borderBottomCss: "border-bottom"
      },
      {
        icon: "scbl-policy-i-have",
        header: "จำนวนที่ท่านสามารถกู้ได้ 990,000 บาท ",
        detail: "อัพเดทล่าสุด 2 มิถุนายน 61",
        amount: "20000",
        borderBottomCss: "no-border-bottom"
      }
    ];
    
    if(this.policyDetails.loanInfo){
      let tempObj = {
          icon: "scbl-debt",
          header: "หนีสินทั้งหมด",
          amount: this.policyDetails.loanInfo.outstandingLoan.policyLoanAmount
                  +this.policyDetails.loanInfo.outstandingLoan.outstandingLoanInterest
                  +this.policyDetails.loanInfo.outstandingLoan.outStandingAPLInterest
                  +this.policyDetails.loanInfo.outstandingLoan.outstandingAPL,
          borderTopCss: "top-border"
        };
        if(tempObj.amount!=0){
          this.totalDebts.push(tempObj);
        }

    if(this.policyDetails.loanInfo.outstandingLoan.policyLoanAmount!=0){
      let tempObjRPL = {
          info: "ของฉันอัพเดทล่าสุด(RPL)",
          date: "",
          amount: this.policyDetails.loanInfo.outstandingLoan.policyLoanAmount+this.policyDetails.loanInfo.outstandingLoan.outstandingLoanInterest,
          btnText: "ชำระหนี้สินของฉัน"
        };
      this.loanInfo.push(tempObjRPL);
    } 
    if(this.policyDetails.loanInfo.outstandingLoan.outstandingAPL!=0){
      let tempObjAPL = {
          info: "ของฉันอัพเดทล่าสุด(APL)",
          date: "",
          amount: this.policyDetails.loanInfo.outstandingLoan.outstandingAPL+this.policyDetails.loanInfo.outstandingLoan.outStandingAPLInterest,
          btnText: "ชำระหนี้สินของฉัน"
        };
      this.loanInfo.push(tempObjAPL);
      
    }
  }

  
  }
  getAvailableLoanResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("get available in policy-info ", data);
      let allLoansData = data.result;
      console.log("loans data",allLoansData)
      this.policyLoanService.setAllData(allLoansData);
      this.filteredData = this.policyLoanService.filterData(allLoansData);
      this.policyLoanService.setFilteredData(this.filteredData);
    },
    fail: (errorService) => {
      this.logger.log("In fail of get available loan ", errorService);
      this.getGenericError(null, errorService.responseTitle,errorService.resonseErrorMessage);
    },
    systemFailure: (errorService) => {
      this.logger.log("In systemFailure of get available loan ", errorService);
      if (errorService.httpStatus == 0) {
        this.getInternetConnectionGenericInterface(this.genericActionRetry);
      }else{
        this.getGenericError(null, errorService.responseTitle,errorService.resonseErrorMessage, this.genericActionRetry)
      }
    },
    progress: (isProgress) => {
      this.logger.log("In progress of get available service ", isProgress);
      this.isLoading(isProgress);
    }
  }

  goToLoans() {
    if(!this.filteredData.isEmailVerify){
    this.loansDataToModal={
    email:this.filteredData.email
    }
    this.modalService.presentModal(EmailVerificationPopupPage,{data:this.loansDataToModal, "nav":this.navCtrl});
    }
    else if(this.filteredData.eligibleLoanPolicies.length==1){
    if(!this.filteredData.eligibleLoanPolicies[0].preferPayoutBankAccount){
      let navigationData = {
        pageToNavigate:PolicyDashboardPage,
        navParamsData:null
      }
    this.navCtrl.parent.parent.push(PaymentChangeBookPage,{navigationData:navigationData});
    }
    else{
       this.policyLoanService.setSelectedPolicy(this.filteredData.eligibleLoanPolicies[0]);
       this.navCtrl.push(DashboardFullViewAccidentPage, { SelectedTab: 'Loan', isSingle:true });
    }
    }
    else{
    this.navCtrl.push(DashboardFullViewAccidentPage,{SelectedTab: 'Loan'});
    }     
  }
  genericActionRetry = <IDialogButton<any>>{
    name: this.translate.instant("errors.errorButtons.tryAgain"),
    click: (data?) => {
      this.genericDialog = null;
      this.goToLoans();
    }
  }
  alert(){
    console.log('alert called');
    this.toolTipService.dissmisstoolTipModal();

  }
  policyInfoToolTip() {
    this.cta = <IDialogButton<any>>{
      name: this.translate.instant("errors.errorButtons.next"),
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      //toolTipData: [{ image: "../assets/imgs/TT04-PolicyInfo.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" },
       //{ image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipData: [{ image: "../assets/imgs/TT04-PolicyInfo.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "policyInfo",
      actionCTA:this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }

  goToPolicyLoanDashboard(loan:any){
    this.fba.logEvent("policy_payment_click","Click on button '่ายเบี้ยออนไลน์' in policy detail");
    this.navCtrl.push(PolicyLoanDashboardPage,{data:loan});
  }

  convertToamount(amount){
    console.log(" NEW AMOUNT FROM US",new Intl.NumberFormat('THB', { maximumFractionDigits: 2 }).format(amount));
    return amount = new Intl.NumberFormat('THB', { maximumFractionDigits: 2 }).format(amount);


  }
}
