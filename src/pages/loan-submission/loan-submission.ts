import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PolicyLoanServicesProvider } from "../../providers/policy-loan-services/policy-loan-services";
import { SubmitLoanPostdata, FilteredLoanData } from "../../providers/policy-loan-services/services-request-data-model-class";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { IServiceResponse } from "../../common/service-models/iServiceResponse";
import { SubmitLoanResponse } from "common/models/submit-loan.class";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { ToastController } from 'ionic-angular';
/**
 * @author Ayush Vyas
 * @description Single Loan Submission 
 */
@IonicPage()
@Component({
  selector: "page-loan-submission",
  templateUrl: "loan-submission.html"
})
export class LoanSubmissionPage {
  loanList:SubmitLoanResponse;
  isSingleLoan: any;
  data: any;
  public otpCallData:any;
  public length:any;
  multiple:any;
  submissionData:SubmitLoanPostdata;
  filteredData:FilteredLoanData;
  constructor(
    public navCtrl: NavController,
    public navParams:NavParams,
    private policyLoanService:PolicyLoanServicesProvider,
    private sharedData:SharedataProvider,
    public modalService: ModalServiceProvider,
    private toastCtrl: ToastController
  ) {
    this.multiple = true;
    // this.data = this.navParams.get('data');
    // this.isSingleLoan = this.data.isSingleLoan;
   
    this.submissionData = this.policyLoanService.getSubmissionData();
    console.log("Get submission data ",this.submissionData);
     this.sharedData.policyLoanConfirmation.subscribe((data)=>{
      let d = new Date()
      this.otpCallData = data;
      this.otpCallData.otpDateTime = d.toISOString();
      console.log("Otp date time ",this.otpCallData);
      for(let i=0;i<this.submissionData.loanDetails.length;i++){
        this.submissionData.loanDetails[i].otpCode = this.otpCallData.otpCode;
       this.submissionData.loanDetails[i].mobileNumber = this.otpCallData.mobileNumber;
       this.submissionData.loanDetails[i].otpReference = this.otpCallData.otpReference;
       this.submissionData.loanDetails[i].otpDateTime  = this.otpCallData.otpDateTime;
       }
     })
    //  this.policyLoanService.setSubmissionData(this.submissionData);
     console.log("Submission page data ",this.submissionData);
     this.policyLoanService.submitLoan(this.submitLoanResponse,this.submissionData);
    } 
  submitLoanResponse = <IServiceResponse<any>>{
    success:(data:any)=>{
      this.modalService.dismissModal();
      console.log("Data in submission page ",data);
      this.loanList = data.result;
    },
    fail:(error)=>{
      this.modalService.dismissModal();
      console.log("Error in submission page ",error);
      this.presentToast(error);
    },
    systemFailure:(error)=>{
      this.modalService.dismissModal();
      console.log("System failure in submission page ",error);
    },
    progress:(data)=>{
      this.modalService.dismissModal();
      console.log("Data in progress of submission page ",data);
    }
  } 
  presentToast(error) {
    let toast = this.toastCtrl.create({
      message: error.resonseErrorMessage,
      duration: 7000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }    
}