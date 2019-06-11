import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
import { Component } from "@angular/core";
import { IonicPage, NavController, AlertButton, AlertController } from "ionic-angular";
import { CallMeBackPage } from "../pages";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { CallNumber } from "@ionic-native/call-number";
import { LogServiceProvider } from "../../providers/data-service/log-service";

/**
 * @author Ayush Vyas
 * @description Function used on Contact Us page are declared here
 */
@IonicPage()
@Component({
  selector: "page-contact-us",
  templateUrl: "contact-us.html"
})
export class ContactUsPage {
  //Declarations

  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(
    public logger: LogServiceProvider,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private callNumber: CallNumber,
    private firebaseAnalyticsService: FirebaseAnalyticsService
  ) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
  }
  ionViewDidEnter() {
    this.firebaseAnalyticsService.setCurrentScreen('contact_us_landing');
    this.firebaseAnalyticsService.logEvent('menu_contact', 'Click contact');
  }
  //CallMe() is called to request a callback and this will navigate user to CallMeBackPage
  CallMe() {
    this.firebaseAnalyticsService.logEvent('contact_schedule', 'Visit call me back page');
    this.navCtrl.push(CallMeBackPage);
  }

  callSCB() {
    this.firebaseAnalyticsService.logEvent('contact_call', 'Call center button click');
    let alert = this.alertCtrl.create({
      title: 'ยืนยัน',
      message: '1315',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'โทร',
          handler: () => {
            this.callNumber.callNumber("1315", false)
              .then(res => this.logger.log('Launched dialer!', res))
              .catch(err => this.logger.log('Error launching dialer', err));
          }
        }
      ]
    });
    alert.present();
  }

}
