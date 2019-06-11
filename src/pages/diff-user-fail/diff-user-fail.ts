import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 * used in forgot pin page when user tries to enter thai id that is not registered with the device
 *
 * 
 */

@IonicPage()
@Component({
  selector: 'page-diff-user-fail',
  templateUrl: 'diff-user-fail.html',
})
export class DiffUserFailPage {
  header: string;
  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalServiceProvider) {
    this.header = 'ข้อมูลไม่ถูกต้อง';
    this.message = 'กรุณาใส่หมายเลขบัตรประชาชน หรือ หมายเลขพาสปอร์ตที่เคยลงทะเบียนไว้กับเครื่องนี้';
    console.log('different user')
  }

  dismissModal() {
    this.modalCtrl.dismissModal();
  }

}
