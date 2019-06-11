import { Component } from '@angular/core';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { PolicyLoanServicesProvider } from "../../providers/policy-loan-services/policy-loan-services";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ConfirmLoanPostData, FilteredLoanData, SubmitLoanPostdata, LoanDetails, ConfirmPolicyInfo, IndividualPolicyInformation } from '../../providers/policy-loan-services/services-request-data-model-class';
import { LoanSubmissionPage } from '../../pages/pages';
import { EnterOtpPage, VerifyPhonePage, LoanTermsConditionsPage } from '../pages';
import { SharedataProvider } from '../../providers/sharedata/sharedata';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
@IonicPage()
@Component({
  selector: 'page-policy-loan-confirmation',
  templateUrl: 'policy-loan-confirmation.html',
})
export class PolicyLoanConfirmationPage {
  filteredData: FilteredLoanData;
  isSingleLoan: boolean;
  data: any;
  loan: any = {};
  loanData: any;
  validateCheckbox: FormGroup;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  selectedPolicy: IndividualPolicyInformation;
  confirmLoanPostData:ConfirmLoanPostData;
  submitLoanPostdata: SubmitLoanPostdata;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public policyLoanService: PolicyLoanServicesProvider,
    public fb: FormBuilder,
    public shareDataService: SharedataProvider,
    public modalService: ModalServiceProvider,
    private loginService:LoginServivceProvider
  ) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.loan.LoanDetails = []
    this.data = this.navParams.get('data');
    // this.isSingleLoan = this.data.isSingleLoan;
    this.filteredData = this.policyLoanService.getFilteredData();
    this.selectedPolicy = this.policyLoanService.getSelectedPolicy();
    this.validateCheckbox = this.fb.group({
      acceptTerms: [false, [Validators.required, Validators.requiredTrue]]
    }); 
    
     this.confirmLoanPostData = new ConfirmLoanPostData();
            this.confirmLoanPostData.loanPolicies = new Array<ConfirmPolicyInfo>();
            this.confirmLoanPostData.loanPayoutAccount=this.selectedPolicy.preferPayoutBankAccount;
            let policyInfo = new ConfirmPolicyInfo();
            policyInfo.policyNumber = this.selectedPolicy.policyNumber;
            policyInfo.loanInterestRate = this.selectedPolicy.loanInterestRate;
            policyInfo.maxPolicyLoanAmount = this.selectedPolicy.loanAmount;
            policyInfo.loanAmountRequired = this.selectedPolicy.loanAmountRequired;
            this.confirmLoanPostData.loanPolicies.push(policyInfo);
      console.log("new confirm data:",this.confirmLoanPostData);
      this.policyLoanService.confirmLoan(this.confirmLoanResponse,this.confirmLoanPostData);      
    }

    confirmLoanResponse = <IServiceResponse<any>>{
      success:(data:any)=>{
        this.modalService.dismissModal();
        console.log("Confirm loan response ", data);
        // let res = data.result;
        this.loanData = data.result;
      },
      fail:(errorService)=>{
        this.modalService.dismissModal();
        console.log("In fail of confirm loan ",errorService);
      },
      systemFailure:(errorService)=>{
        console.log("In systemFailure of confirm loan ",errorService);
      },
      progress:(isProgress)=>{
        console.log("In progress of confirm loan service ",isProgress);
      }
    }


  ionViewDidLoad() {

  }
  confirmLoan() {

    this.filteredData.stampDuty = this.loanData.stampDuty;
    this.filteredData.totalAvailedLoanAmount = this.loanData.totalAvailedLoanAmount;
    this.filteredData.totalAvailedLoanAmountWithStampDuty = this.loanData.totalAvailedLoanAmountWithStampDuty;
    this.policyLoanService.setFilteredData(this.filteredData);
    console.log("Filtered data on policy confirmation page ",this.filteredData);
    this.setSubmitLoanData();
    this.getPhoneAndOtp();
    // this.navCtrl.push(LoanSubmissionPage,{"data":this.data});
  }
  getPhoneAndOtp(){
    console.log("Get otp in policy loan confirmation",this.loginService.customerInfo);
   if(this.loginService.customerInfo.customerContacts.length>1){
     let data = {};
     data["phoneNumbers"] = [];
     debugger;
    this.loginService.customerInfo.customerContacts.forEach((ph)=>{
      data["phoneNumbers"].push({phoneNumber:ph.phone});
    })
     data["type"] = "policyLoanConfirmation";
     data["isSingleLoan"] = this.isSingleLoan;
     data["isSCBCustomer"] = true;
     console.log("Object created at policy loan confirmation multiple",data);
    this.navCtrl.parent.parent.push(VerifyPhonePage,{data:data});
   }else{
    let data = {};
    data["type"] = "policyLoanConfirmation";
    data["phoneNumbers"] = this.loginService.customerInfo.customerContacts[0].phone;
    data["isSCBCustomer"] = true;
    console.log("Object created at policy loan confirmation single",data);
    this.navCtrl.parent.parent.push(EnterOtpPage,{data:data}); 
   }
  }
  setSubmitLoanData(){
    this.submitLoanPostdata = new SubmitLoanPostdata();
      let obj = new LoanDetails();
      obj.policyNumber = this.selectedPolicy.policyNumber;
      // obj.requestDate = "";
      // obj.requestType = "";
      // obj.requestChannel = "";
      // obj.deliveryMode = "";
      // obj.branchCodeSCBLife = "";
      // obj.branchCodeSCB = "";
      // obj.receivedDateBranch = "";
      // obj.receivedDateHO = "";
      // obj.remarkLine1 = "";
      // obj.remarkLine2 = "";
      // obj.remarkLine3 = "";
      // obj.remarkLine4 = "";
      obj.loanAmountRequired = this.selectedPolicy.loanAmountRequired;
      // obj.mobileNumber = "";
      // obj.otpReference = "";
      // obj.otpCode = "";
      // obj.otpDateTime = "";
      obj.maxPolicyLoanAmount = this.selectedPolicy.loanAmount;
      obj.loanInterestRate = this.selectedPolicy.loanInterestRate;
      obj.preferPayoutMethod = this.selectedPolicy.preferPayoutMethod;
      obj.preferPayoutBank = this.selectedPolicy.preferPayoutBank;
      obj.loanPayoutAccount = this.selectedPolicy.preferPayoutBankAccount;
      this.submitLoanPostdata.loanDetails.push(obj);
  
    this.submitLoanPostdata.stampDuty = this.filteredData.stampDuty;
    this.submitLoanPostdata.totalAvailedLoanAmount = this.filteredData.totalAvailedLoanAmount;
    this.submitLoanPostdata.totalAvailedLoanAmountWithStampDuty = this.filteredData.totalAvailedLoanAmountWithStampDuty;
    console.log("New Object ", this.submitLoanPostdata);
    this.policyLoanService.setSubmissionData(this.submitLoanPostdata);
  }

  goToLoanTermsAndConditions(){
    this.navCtrl.push(LoanTermsConditionsPage);
  }
}
