import { CmsServiceProvider } from "../../providers/cms-service/cms-service";
import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
/**
 * @author Ayush Vyas
 * @description Dummy data is been called through service
 */
/**
 * @author Amit Kulkarni
 * @description documentation added
 * date: 1/7/18
 */
@IonicPage()
@Component({
  selector: "page-security-tips",
  templateUrl: "security-tips.html"
})
export class SecurityTipsPage implements OnInit {
  // Object to store the JSON data from CMS API
  securityTips: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(
    public navCtrl: NavController,
    public cmsService: CmsServiceProvider,
    public logger: LogServiceProvider,
    private fba: FirebaseAnalyticsService
  ) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
  }
  //  This method is used to toggle the button/ impliments the accordion functionality
  toggleSection(i) {
    this.fba.logEvent('security_detail_protection', 'Click to expand "ระบบป้องกัน"');
    this.securityTips[i].open = !this.securityTips[i].open;
  }

  ionViewDidEnter() {
    this.fba.setCurrentScreen('security_view');
    this.fba.logEvent('menu_security', 'Click security tip button');
  }
  // CMS usage
  ngOnInit() {
    // call the CMS Service function for Security tips data
    this.cmsService.getSecuritytips().then((res: any) => {
      // securityTips has JSON data of list of security tips
      this.securityTips = res;
    }, err => {
      // if incase there is an error
      this.logger.log(err);
    });
  }
}
