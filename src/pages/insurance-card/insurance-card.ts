import { LogServiceProvider } from '../../providers/data-service/log-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';
import { LoadingServiceProvider } from '../../providers/ion-service/loading-service';
import { BaseApp } from '../../app/base';
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";

/**
  * @author Rajul Dixit
  * @description Page for Showing policy insurance card.
  */
@IonicPage()
@Component({
  selector: 'page-insurance-card',
  templateUrl: 'insurance-card.html',
})
export class InsuranceCardPage extends BaseApp implements OnInit {
  fromAccount: boolean;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  insuranceCardData: any = [];
  singleInsurance: boolean;
  policyList: any = [];
  policyLists: any = [];
  policyDetailsFull: any = [];
  spinnerFlagDashboard: boolean;
  constructor(public homePdService: HomePdServiceProvider, public loadingService: LoadingServiceProvider,private fba: FirebaseAnalyticsService,
    public navCtrl: NavController, public logger: LogServiceProvider, public navParams: NavParams, ) {
    super();
    this.fba.setCurrentScreen(' profile_view_card');
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    if (this.navParams.get("data")) {
      this.singleInsurance = true;
      this.fromAccount = false;
      this.insuranceCardData = this.navParams.get("data");
    } else {
      this.singleInsurance = false;
      this.fromAccount = true;
      this.getspinner(true);
      this.spinnerFlagDashboard = true;
      this.homePdService.getallPolicies().then((res) => {
        this.policyList = res;
        if (this.policyList.policies) {
          this.policyLists = this.policyList.policies;
          console.log("response from policyList service ", this.policyList);
          // get policy by policy number
          for (let i = 0; i <= this.policyLists.length; i++) {
            this.getspinner(true);
            this.spinnerFlagDashboard = true;
            this.homePdService.getPolicyByPolicyNumber(this.policyLists[i].policyNumberIL).then((res) => {
              this.policyDetailsFull[i] = res;
              this.getspinner(false);
              this.spinnerFlagDashboard = false;
              console.log("response from PolicyByNumber service ", this.policyDetailsFull);
            }, (err) => {
              this.logger.log('error', err);
            });
          }

        } else {
          console.log("No policies found:::::::::");
        }

      }, (err) => {
        this.logger.log('error', err);
      })





    }

  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad InsuranceCardPage');
  }
  ngOnInit() {

  }
}
