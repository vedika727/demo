import { ScbLaterProcessPage } from './../pages';
import { LoginServivceProvider } from "../../providers/login-module/login-service/login-service";
import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams, App } from "ionic-angular";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { AppVersion } from "@ionic-native/app-version";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { BaseApp } from '../../app/base';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';

/**
 * @author Sandesh Uttarwar
 * @description This file contains functions related to my-account page
 */

@IonicPage()
@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage extends BaseApp {
  /** Page Variables Declaration */
  placeholder = "assets/scbl-icons/default-profile-picture.svg";
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  userInfo : any;
  isScblifeCustomer: any;
  constructor(
    public navCtrl: NavController,
    public navApp: App,
    private modalService: ModalServiceProvider,
    public loginService: LoginServivceProvider,
    private appVersion: AppVersion,
    public cacheService: CacheServiceProvider,
    private fba: FirebaseAnalyticsService
  ) {
    super();
    this.headerInput.nav = navCtrl;
    this.headerInput.isProfile = true;
    this.headerInput.isNotification = true;
    
    this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then(
      (res: any) => {
        // this.isScblifeCustomer = res.isScblifeCustomer;
        console.log(res, 'QQQ111');
      },
      err => {
        console.log(err, "loggedInUserDetails error")
      }
    );

    this.cacheService.getCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER).then((res) => {
      console.log('menu.ts > response of isScblifeCustomer>>', res);
      this.isScblifeCustomer = res;
    }, (err) => {
      this.isScblifeCustomer = false;
      console.log(this.isScblifeCustomer, "didnt get scblife customer in cache");
    });


  }

  ionViewDidEnter() {
    this.userInfo = Object.assign({}, this.loginService.customerInfo);
    console.log(this.userInfo," this.userInfo");
    
    this.fba.logEvent('menu_open', 'Click to open menu');
    console.log('logged in flag', this.loginService.isLoggedIn);
    this.appVersion.getVersionNumber().then(res => {
      console.log('App version - ', res);
    });
    this.appVersion.getVersionCode().then(res => {
      console.log('App code - ', res);
    });
    this.appVersion.getAppName().then(res => {
      console.log('App name - ', res);
    });

  }
  openPage(page: string) {
    // Reset the content nav to have just this page

    // we wouldn't want the back button to show in this scenario

    if (page.indexOf('Modal') > 0) {
      this.openModal(page);
    } else {
      if (page == "RegisterUserPage" || page == "ScbLaterProcessPage") {
        this.navCtrl.parent.parent.setRoot(page, { "data": { isBack: true } });
      } else {
        this.navCtrl.push(page);
      }
    }

  }

  openPageRoot(page) {
    this.navApp.getRootNav().push(page);
  }

  // gotoScbLater(){
  //   this.navCtrl.parent.parent.push(ScbLaterProcessPage);
  // }

  openModal(page) {
    this.modalService.presentModal(page);
  }

  ionViewDidLeave() {
    this.fba.logEvent('menu_close', 'Click to close menu');
  }
  
}
