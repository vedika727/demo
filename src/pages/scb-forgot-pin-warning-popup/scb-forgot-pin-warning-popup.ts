import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';

/**
 * Generated class for the ScbForgotPinWarningPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scb-forgot-pin-warning-popup',
  templateUrl: 'scb-forgot-pin-warning-popup.html',
})
export class ScbForgotPinWarningPopupPage {

  constructor(public navCtrl: NavController,
    public platform: Platform) {
      this.platform = platform;   
  }
  /**
   * @description This will close the app
   */
  exitApp(){
    this.platform.exitApp();
  }
  /**
   * end  exitApp()
   */
  
  /**
   * @description This will close the prompt
   */
  dismissModal(){
    // this.navCtrl.setRoot(LoginPage);
  }
}
