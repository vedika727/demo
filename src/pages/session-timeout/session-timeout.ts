import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 * Generated class for the SessionTimeoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-session-timeout',
  templateUrl: 'session-timeout.html',
})
export class SessionTimeoutPage {
  header: string;
  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalServiceProvider) {
    this.header = 'ขออภัยในความไม่สะดวก';
    this.message = 'คุณไม่ได้ทำรายการในเวลาที่กำหนด กรุณาเข้าสู่ระบบใหม่อีกครั้ง';
    console.log('session timeout ')
  }

  dismissModal() {
    this.modalCtrl.dismissModal();
  }

}
