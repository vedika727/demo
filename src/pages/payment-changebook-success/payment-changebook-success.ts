import { LogServiceProvider } from '../../providers/data-service/log-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
 /**
   * @author Rajul Dixit
   * @description Page For showing change book success.
   */
@IonicPage()
@Component({
  selector: 'page-payment-changebook-success',
  templateUrl: 'payment-changebook-success.html',
})
export class PaymentChangebookSuccessPage {
  navigationData: any;
  data: any;
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  constructor(public navCtrl: NavController, public navParams: NavParams, public logger : LogServiceProvider) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad PaymentChangebookSuccessPage');
    this.navigationData = this.navParams.get("navigationData");
  }
  navigateToPage(){
    this.navCtrl.setRoot(this.navigationData.pageToNavigate,{data:this.navigationData.navParamsData});
  }

}
