import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../pages";
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { BaseApp } from '../../app/base';
/**
 * Generated class for the SetNewpinSuccessfulLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-newpin-successful-login',
  templateUrl: 'set-newpin-successful-login.html',
})
export class SetNewpinSuccessfulLoginPage extends BaseApp {
  loginSuccessFlag: boolean;
  dataForProcessActionComponent: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseAnalytics: FirebaseAnalyticsService,
    private cacheService: CacheServiceProvider
  ) {
    // Call Super of BaseApp
    super();
    this.headerInput.isBackButton = false;
    this.headerInput.nav = this.navCtrl;
    this.loginSuccessFlag = true
    this.dataForProcessActionComponent = {
      iconName: 'scbl-success',
      title: 'login.successful',
      message: 'login.weSentYouEmailConfirmingYourPasswordChange',
      buttonText: 'login.signInWithNewPin',
      headMessage: 'login.setPinHeadMsz'
    };
    // set as registration completes.
    this.cacheService.setCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED, true);
    // reseting flag which was set during login 3 attempt block need to remove so hense set up as false
    this.cacheService.setCache(this.CONSTANT.KEY_LOGIN_IS_USER_LOCKED, false);
  }

  ionViewDidEnter() {
    this.firebaseAnalytics.logEvent('login_complete_reset', 'Reset pin');
  }
  action() {
    this.navCtrl.setRoot(LoginPage)
  }

}
