import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**
 * @author - Sandesh Uttarwar
 * @description - This Provider contains all the methods related to ALERT Controller 
 */
@Injectable()
export class AlertServiceProvider {

  alert: any;
  constructor(private alertCtrl: AlertController) {

  }

  /**
   * 
   * @param title {string}
   * @param msg {string}
   * @param subTitle {string} optional
   * @description this will prompt a basic Alert
   */
  presentSimpleAlert(title: string, msg: string, subTitle?: string) {
    console.log('presentAlert called - AlertServiceProvider');
    if (!subTitle) {
      subTitle = '';
    }

    this.alert = this.alertCtrl.create({
      title: title,
      message: msg,
      subTitle: subTitle,
      buttons: ['Ok']
    });

    this.alert.present();
  }

  /**
   * @description this will dismiss the Alert
   */
  dismissAlert() {
    console.log('dismissAlert called - AlertServiceProvider');
    this.alert.dismiss();
  }


  /**
   * 
   * @param title {string}
   * @param msg {string}
   * @param button it should be array or a single button of type Alertbutton
   * @param subTitle {string}
   * @description It is used to show dynamic alert more than one button with functionality
   */
  presentDynamicAlert(title: string, msg: string, button?:any[],subTitle?: string){
    console.log('presentDynamicAlert called - AlertServiceProvider');

    if (!subTitle) {
      subTitle = '';
    }

    if(!button){
      button=['OK'];
    }

    this.alert = this.alertCtrl.create({
      title: title,
      message: msg,
      subTitle: subTitle,
      buttons: button
    });

    this.alert.present();

  }


}
