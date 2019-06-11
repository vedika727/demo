import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { PayslipPage } from '../pages';

import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
/**
  * @author Ankit Tiwary.
  * @description Page for showing payment succesfull message to user.
  */

@IonicPage()
@Component({
  selector: 'page-payment-sucessful-royalty',
  templateUrl: 'payment-sucessful-royalty.html',
})
export class PaymentSucessfulRoyaltyPage {
  posts = [];
  paymentDetails: any;
  acknowledgeRef:any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(
    public navCtrl: NavController, 
    private fba:FirebaseAnalyticsService,
    public navParams: NavParams,
    public modalService: ModalServiceProvider) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    let data = this.navParams.get('data');
    this.paymentDetails = data.paymentDetails;
    this.acknowledgeRef = data.acknowledgerefId;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSucessfulRoyaltyPage');
  }

  /**
    * @author Manish Khedekar.
    * @description Function to dissmiss modal.
    */
  dismissModal() {
    this.modalService.dismissModal();

  }

  goToPaySlip() {

    this.fba.logEvent("payment_complete_payslip","View pay slip ");  
    this.navCtrl.push(PayslipPage);
  }
}
