/**
* @author Ayush Vyas
* @description About us 
*/
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";

import { LogServiceProvider } from '../../providers/data-service/log-service';
import { CmsServiceProvider } from '../../providers/cms-service/cms-service';
import { elementEnd } from '@angular/core/src/render3/instructions';
@IonicPage()
@Component({
  selector: "page-about-us",
  templateUrl: "about-us.html"
})
export class AboutUsPage implements OnInit {
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  aboutus: any;
  topicList: any = [];
  addressList: any = [];
  constructor(
    public navCtrl: NavController,
    private firebaseAnalyticsService: FirebaseAnalyticsService,
    private cmsService: CmsServiceProvider,
    public logger: LogServiceProvider) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;



  }

  ionViewDidEnter() {
    this.firebaseAnalyticsService.setCurrentScreen('about_view');
    this.firebaseAnalyticsService.logEvent('menu_about', 'Click about button');
  }

  // CMS service usage
  ngOnInit() {
    // call the CMS Service function for Privacy Policy data
    this.cmsService.getAboutus().then((res: any) => {
      // The privacy has HTML Data in string format
      this.aboutus = res;
      console.log(this.aboutus);

      this.topicList = this.aboutus.filter((res) => res.field_tags == 'aboutus');
      this.addressList = this.aboutus.filter((res) => res.field_tags != 'aboutus');
    }, err => {
      // if incase there is an error
      this.logger.log(err);
    });


  }

}
