import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
/**
 * Generated class for the FaceModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-face-modal',
  templateUrl: 'face-modal.html',
})
export class FaceModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalService:ModalServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaceModalPage');
  }

}
