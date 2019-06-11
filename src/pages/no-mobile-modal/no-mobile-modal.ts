import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 * Generated class for the NoMobileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-no-mobile-modal',
  templateUrl: 'no-mobile-modal.html',
})
export class NoMobileModalPage {

  message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalServiceProvider) {

    this.message = ' ไม่พบหมายเลขโทรศัพท์มือถือของคุณในระบบ กรุณาติดต่อศูนย์บริการลูกค้า SCBLIFE โทร. 1315';
    console.log('mobile not available');
  }

  dismissModal() {
    this.modalCtrl.dismissModal();
  }

}
