import { Component,OnInit,Input } from '@angular/core';
import { ThaiDateConversionProvider } from "../../providers/thai-date-conversion/thai-date-conversion";
import { PaymentMethodPage } from '../../pages/pages';
import { NavController } from 'ionic-angular';
import { PaymentDetails } from '../../common/models/payment-details.class';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
/**
 * Generated class for the PolicyLoanPaymentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'policy-loan-payment',
  templateUrl: 'policy-loan-payment.html'
})
export class PolicyLoanPaymentComponent implements OnInit {
  @Input("in") policyLoan: any;
  totalAmount:number=0;
  loanAmount:number;
  loanPayment:PaymentDetails = new PaymentDetails();
  apl:boolean;
  rpl:boolean;
  ngOnInit(){
    console.log(this.policyLoan);
    if(this.policyLoan.policyLoanType==="APL")
    {
      this.apl = true;
    }
    else{
      this.rpl = true;
    }

    this.addTotalAmount();
  }

  constructor(
    public dateConverter:ThaiDateConversionProvider,
    private fba:FirebaseAnalyticsService,
    public  navCtrl:NavController) {
    
  }

  addTotalAmount(){
    this.totalAmount = this.policyLoan.loanAmount+this.policyLoan.loanInterest;
  }

  policyLoanPayment(){
    let obj = {
      "policyNumber":this.policyLoan.policyNumber,
      "dueDate":null,
      "amountDue":this.loanAmount   
      };
    this.loanPayment.policyPaymentDetails.push(obj);
    this.loanPayment.amount=this.loanAmount;
    }

  paynow(){
    this.fba.logEvent("payment_click","Click 'ชำระเงิน' to made payment"); 
    this.policyLoanPayment(); 
    this.navCtrl.push(PaymentMethodPage,{'policyLoan':this.loanPayment});
  }

}
