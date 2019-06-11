import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header"
/**
 * Generated class for the NonLoanablePolicyListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-non-loanable-policy-list',
  templateUrl: 'non-loanable-policy-list.html',
})
export class NonLoanablePolicyListPage {
  nonEligiblePolicyData: any;
  headerInputs: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;
    this.headerInputs.daynightFlag = 'showNonEligibleLoans';
    this.nonEligiblePolicyData=this.navParams.get('data')
    console.log("nonEligiblePolicyData:",this.nonEligiblePolicyData)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NonLoanablePolicyListPage');
  }

}
