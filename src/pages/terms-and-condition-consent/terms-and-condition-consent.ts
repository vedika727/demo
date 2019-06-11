import { MyAccountServiceProvider } from './../../providers/my-account-service/my-account-service';
import { LoadingServiceProvider } from './../../providers/ion-service/loading-service';
import { CmsServiceProvider } from "./../../providers/cms-service/cms-service";
import { FirebaseAnalyticsService } from "./../../providers/firebase-service/firebase-analytics-service";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { IServiceResponse } from './../../common/service-models/iServiceResponse';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';

/**
 * Generated class for the TermsAndConditionConsentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms-and-condition-consent',
  templateUrl: 'terms-and-condition-consent.html',
})
export class TermsAndConditionConsentPage {
  headerInputs: ScbHeaderInputs = new ScbHeaderInputs();
  // String object to store the HTML string from CMS API
  terms: string;
  
  constructor(
  public logger:LogServiceProvider,
    public navCtrl: NavController,
    private firebaseAnalyticsService: FirebaseAnalyticsService,
    public cmsService: CmsServiceProvider,
    private loadingService: LoadingServiceProvider,
    public myAccountService : MyAccountServiceProvider,
  ) {
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;
  }
  eLetterTandCResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
      console.log("eLetterTandCResponse Response obj. : ", data);

      this.terms = data[0].body;
      console.log(this.terms,"terms for consent")
    },
    fail: (errorService) => {
      console.log("eLetterTandCResponse Error - ", errorService)

    },
    systemFailure: (errorService) => {

      console.log("eLetterTandCResponse Error system ", errorService)
    },

    progress: (isProgress) => {
      this.loadingService.isLoading(isProgress);
    }
  }
  // ionViewDidEnter() {
  //   // initialize the firebase analytics service
  //   this.firebaseAnalyticsService.setCurrentScreen("home_term_landing");
  // }
  // CMS usage
  ngOnInit() {
    // call the CMS Service function for terms and conditions data
    this.myAccountService.eLetterTandC(this.eLetterTandCResponse)
  }
}
