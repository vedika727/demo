import { Component,OnInit,Input } from '@angular/core';
import { ThaiDateConversionProvider } from "../../providers/thai-date-conversion/thai-date-conversion";
import { PaymentMethodPage,AddChangeCreditCardPage } from '../../pages/pages';
import { NavController } from 'ionic-angular';
import { PaymentDetails } from '../../common/models/payment-details.class';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';

/**
 * Generated class for the PolicyPaymentDueComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'policy-payment-due',
  templateUrl: 'policy-payment-due.html'
})
export class PolicyPaymentDueComponent implements OnInit {
  @Input("in") policyDues: any;
  totalAmount:number=0;
  single:boolean;
  autopay:boolean;
  autopayFailure:boolean;
  multiple:boolean;
  ngOnInit(){
    console.log('policies due',this.policyDues);
    
    this.policyDues.payments.forEach(element => {
      element.checked = false;
      this.totalAmount+=element.paymentAmount;
    });
    if(this.policyDues.payments.length===1)
    {
      if(this.policyDues.paymentDetails)
      {
        this.single = false;
        this.autopay = false;
        this.autopayFailure = true;
        this.multiple = false;
      }
      else{
        this.single = true;
        this.autopay = false;
        this.autopayFailure = false;
        this.multiple = false;
      }
    }
    else{
        this.single = false;
        this.autopay = false;
        this.autopayFailure = false;
        this.multiple = true;
    }
  }
  
  changeCreditCard(){
    this.navCtrl.push(AddChangeCreditCardPage);
  }

  constructor(
    public dateConverter:ThaiDateConversionProvider,
    private fba:FirebaseAnalyticsService,
    public  navCtrl:NavController) {

  }

  addTotalAmount(){
    
  }

  disabledField(index:number){
    if(index>0){
      return this.policyDues.payments[index-1].checked ? '':'mr-blur';
    }
    else return '';
  }

  clickSelectBox(j:number){
    if(!this.policyDues.payments[j].checked)
    {
      console.log(j);
      for(let i=1;i<this.policyDues.payments.length;i++)
        this.policyDues.payments[i].checked = false;
    }
  }

  paynow(){
    this.fba.logEvent("payment_click","Click 'ชำระเงิน' to made payment");    
    this.navCtrl.push(PaymentMethodPage,{'data':this.policyDues});
  }

}
