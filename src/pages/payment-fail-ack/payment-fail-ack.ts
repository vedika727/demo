import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';

/**
 *@author Rajul Dixit
 */

@IonicPage()
@Component({
  selector: 'page-payment-fail-ack',
  templateUrl: 'payment-fail-ack.html',
})
export class PaymentFailAckPage {
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  constructor(public logger : LogServiceProvider,public navCtrl: NavController, public navParams: NavParams, public modalCTRL : ModalServiceProvider) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad PaymentFailAckPage');
  }
 
}
