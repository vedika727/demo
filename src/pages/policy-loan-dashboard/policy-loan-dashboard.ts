import { Component, OnInit, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { BaseApp } from '../../app/base';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { PaymentMethodPage } from '../pages';
import { PaymentServiceProvider } from '../../providers/payment-service/payment-service';
import { DeepLinkObject } from 'common/models/deep-Link.class';
import { dyLinkOBJConst } from "../../common/constants/cta-const"
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
/**
 * Generated class for the PaymentDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-policy-loan-dashboard',
  templateUrl: 'policy-loan-dashboard.html',
})

export class PolicyLoanDashboardPage extends BaseApp implements OnInit {
  ngOnInit() {

    //this if condtition is added to check if page is called from push notification, in app or dynamic link
    if (this.navParams.get(this.CONSTANT.DY_LINK_OBJ)) {

      var dyLinkOBJ: DeepLinkObject = this.navParams.get(this.CONSTANT.DY_LINK_OBJ);
      if (dyLinkOBJ && dyLinkOBJ.messageGroupId) {
        switch (dyLinkOBJ.messageGroupId) {
          case dyLinkOBJConst.messageGroupId.policy_loan_payment.id1:
            this.loanType = 'APL';
            break;
          case dyLinkOBJConst.messageGroupId.policy_loan_payment.id2:
            this.loanType = 'RPL';
            break;
        }
      }
    }else {
      this.loanData = this.navParams.get('data');
      if (this.loanData.info.includes('RPL')) {
        this.loanType = 'RPL';
      }
      else {
        this.loanType = 'APL';
      }
    }
    this.getOutstandingLoan();
  }
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  //@ViewChild(Content) Content: Content;

  totalAmount: number;
  loanData: any;
  loanType: string;
  policyLoanArray: any[];
  dummyArray: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public paymentService: PaymentServiceProvider,
    private fba:FirebaseAnalyticsService,
    public injector?: Injector,
  ) {
    super(injector);
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.fba.logEvent("policy_view_payment","Visit dashboard with payment due");

    //this.policyData = this.navParams.get('policyData');
    // console.log("This data from dashboard page :", this.policyData.policyNumber);
    // this.paymentService.getPaymentDue(this.policyData.policyNumber);
  }

  outstandingLoanResponse = <IServiceResponse<any>>{
    success: (data) => {
      console.log('This is data from Outstading Loan-', data.result);
      this.genrerateOutstandingLoanArray(data.result);
    },
    fail: (err) => {
      console.log('qr code res -', err);
    },
    systemFailure: (sysfail) => {
      console.log('system fail', sysfail)
    },
    progress: (isprogress) => {
      this.isLoading(isprogress);
    }
  }

  getOutstandingLoan() {
    this.paymentService.getOutstandingLoan(this.outstandingLoanResponse);
  }

  genrerateOutstandingLoanArray(policyLoanData:any[]) {
    this.policyLoanArray = [];
    if(this.loanType==='APL'){
      policyLoanData = policyLoanData.filter(element => element.outstandingAPL != 0);
      policyLoanData.forEach((element)=>{
        let obj = {
          policyNumber :element.policyNumber,
          loanAmount : element.outstandingAPL,
          loanInterest :element.outStandingAPLInterest,
          policyLoanType : "APL"
        };
        this.policyLoanArray.push(obj);
      });
    }else if(this.loanType==='RPL'){
      policyLoanData = policyLoanData.filter(element => element.policyLoanAmount != 0);
      policyLoanData.forEach((element)=>{
        let obj = {
          policyNumber :element.policyNumber,
          loanAmount : element.policyLoanAmount,
          loanInterest :element.outstandingLoanInterest,
          policyLoanType : "RPL"
        };
        this.policyLoanArray.push(obj);
      });
    }
    this.checkForDyLinkOBJ();
  }

  /**
     * @description -this method checks if policy number comes through dynamic link or push notification,in-app
      * ,then show that poilcy details first in the array 
      */
  checkForDyLinkOBJ() {
    var dyLinkOBJ: DeepLinkObject = this.navParams.get(this.CONSTANT.DY_LINK_OBJ);
    if (dyLinkOBJ && dyLinkOBJ.policyNumber) {
      // need to add the code for showing this policy number details at top
    }
  }

  payLoan(){
    this.navCtrl.push(PaymentMethodPage, { "policyLoan": "Here will be loan payment data" });
  }
}
