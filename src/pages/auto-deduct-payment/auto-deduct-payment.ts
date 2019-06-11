import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";

/**
 * Generated class for the AutoDeductPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auto-deduct-payment',
  templateUrl: 'auto-deduct-payment.html',
})
export class AutoDeductPaymentPage {
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AutoDeductPaymentPage');
  }

  paymentChangeBook(){
    console.log("paymenty");
  }

}
