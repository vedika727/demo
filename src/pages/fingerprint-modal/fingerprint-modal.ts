import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
/**
 * Generated class for the FingerprintModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fingerprint-modal',
  templateUrl: 'fingerprint-modal.html',
})
export class FingerprintModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalService:ModalServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FingerprintModalPage');
  }

}
