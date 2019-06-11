import { ToastServiceProvider } from "./../../providers/ion-service/toast-service";
import { DeviceInfoServiceProvider } from "./../../providers/deviceInfo-service/deviceInfo-service";
import { Component, TRANSLATIONS } from "@angular/core";
import { IonicPage, NavController, App, Platform, Events } from 'ionic-angular';
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { FeedbackPage, LoginPage } from "../pages";
import { LoginServivceProvider } from "../../providers/login-module/login-service/login-service";
import { LoginServivceAuthProvider } from "../../providers/login-module/login-service.auth/login-service-auth";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";

/**
 * @author Abhishek Raina
 * @description This page opens feedback page and logouts the user
 */

@IonicPage()
@Component({
  selector: "page-logout-prompt",
  templateUrl: "logout-prompt.html"
})
export class LogoutPromptPage {
  constructor(
    public navCtrl: NavController,
    private modalService: ModalServiceProvider,
    private loginService: LoginServivceProvider,
    public loginAuthService: LoginServivceAuthProvider,
    public deviceInfoService: DeviceInfoServiceProvider,
    public toastService: ToastServiceProvider,
    public app: App,
    public platform: Platform,
    public events: Events,
    private fba: FirebaseAnalyticsService
  ) {
    //   this.platform.registerBackButtonAction(() => {
    //     // Catches the active view
    //     let nav = this.app.getActiveNavs()[0];
    //     let activeView = nav.getActive();                
    //     // Checks if can go back before show up the alert
    //     if(activeView.name === 'LogoutPromptPage') {
    //         if (nav.canGoBack()){
    //             nav.pop();
    //         }
    //     }
    // });

    platform.registerBackButtonAction(() => {

      let nav = this.app.getActiveNav();
      let view = nav.getActive().instance.pageName;


      if (view == "LogoutPromptPage") {
        //You are in modal
        nav.pop();
      } else {
        //You are not in modal
      }
    });

  }

  ionViewDidEnter() {
    this.fba.logEvent('logout_popup', 'View logout popup');

  }

  /**
   * @description This method will open the feedback modal
   */
  logout() {
    console.log("logout prompt");
    this.fba.logEvent('menu_logout', 'Click logout button');
    this.fba.logEvent('logout_confirm', 'Confirm to logout with "ตกลง" button');
    this.loginService.logout().then(() => {
      this.dismissLogoutModal();
    }, err => {
      this.toastService.presentToast("logout service error");
      this.dismissLogoutModal();
    });
  }

  /**
   * @description This method will call the ModalService to close the modal
   */
  dismissLogoutModal() {
    this.loginService.isLoggedIn = false;
    let token = this.deviceInfoService.getBearer();
    this.deviceInfoService.bearerToken = "";
    this.modalService.dismissModal();
     // TODO - Removed after Release 1 complete
     this.app.getRootNav().setRoot(LoginPage);
    // TODO - Removed from Release 
    // this.modalService.presentModal(FeedbackPage, { 'data': token });
  }
  dismissLogoutModalOverlay(){
    this.modalService.dismissModal();
  }

  cancel() {
    this.modalService.dismissModal();
  }

  ionViewDidLeave() {

    //this.dismissLogoutModal();
  }
}
