import { CmsServiceProvider } from '../../providers/cms-service/cms-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
/**
 * @author Ayush Vyas
 * @description Privacy Policy 
 */

/**
* @author Amit Kulkarni
* @description Privacy Policy 
* date : 1/7/18
*/
@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage implements OnInit {
  headerInputs: ScbHeaderInputs = new ScbHeaderInputs();
  // String object to store the HTML string from CMS API
  privacy: string;
  constructor(public navCtrl: NavController,
    public logger: LogServiceProvider,
    private fba: FirebaseAnalyticsService,
    public cmsService: CmsServiceProvider) {
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;
  }

  ionViewDidEnter() {
    this.fba.setCurrentScreen('privacy_view');
    this.fba.logEvent('menu_privacy', 'Click to view privacy page');
  }
  // CMS service usage
  ngOnInit() {
    // call the CMS Service function for Privacy Policy data
    this.cmsService.getPrivacyPolicy().then((res: any) => {
      // The privacy has HTML Data in string format
      this.privacy = res.body;
    }, err => {
      // if incase there is an error
      this.logger.log(err);
    });
  }

}
