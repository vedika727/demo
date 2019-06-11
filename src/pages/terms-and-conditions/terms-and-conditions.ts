import { CmsServiceProvider } from "./../../providers/cms-service/cms-service";
import { FirebaseAnalyticsService } from "./../../providers/firebase-service/firebase-analytics-service";
import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
/**
 * @author Ayush Vyas
 * @description Terms And Conditions 
 */
/**
 * @author Amit Kulkarni
 * date : 1/7/18
 * @description Added docuentation to the code
 */
@IonicPage()
@Component({
  selector: "page-terms-and-conditions",
  templateUrl: "terms-and-conditions.html"
})
export class TermsAndConditionsPage implements OnInit {
  headerInputs: ScbHeaderInputs = new ScbHeaderInputs();
  // String object to store the HTML string from CMS API
  terms: any;

  constructor(
    public logger: LogServiceProvider,
    public navCtrl: NavController,
    private firebaseAnalyticsService: FirebaseAnalyticsService,
    public cmsService: CmsServiceProvider
  ) {
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;

  }
  ionViewDidEnter() {
    // initialize the firebase analytics service
    this.firebaseAnalyticsService.logEvent('menu_term', 'Click to view term and condition');
    this.firebaseAnalyticsService.setCurrentScreen('term_view');

  }
  // CMS usage
  ngOnInit() {
    // call the CMS Service function for terms and conditions data
    this.cmsService.getTermsAndConditions().then(
      (res: any) => {
        // The terms has HTML Data in string format
        console.log(`terms and conditions response $$$$`);
        this.terms = res.body;
      },
      err => {
        // if incase there is an error
        this.logger.log(err);
        console.log(`terms and conditions error $$$$`);
      }
    );
  }
}
