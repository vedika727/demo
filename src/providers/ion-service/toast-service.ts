import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/**
 * @author Sandesh Uttarwar
 * @description All methods related to Toast will be added here.
 */
@Injectable()
export class ToastServiceProvider {

  toast: any;
  constructor(private toastCtrl: ToastController) {

  }

  /**
   * 
   * @param msg {string}
   * @param position {string}
   * @param duration {number}
   * @description It will show the simple toast with the position and time
   */
  presentToast(msg: string, position?: string, duration?: number,cssClass?:string) {


    this.toast = this.toastCtrl.create({
      message: msg,
      duration: duration ? duration : 3000,
      position: position ? position : 'top',
      cssClass: cssClass ? cssClass : ''
    });
    this.toast.present();
  }

  /**
   * @description It will dismiss the toast 
   */
  dismissToast() {
    this.toast.dismiss();
  }
}