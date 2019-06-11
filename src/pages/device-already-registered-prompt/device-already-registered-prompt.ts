import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterUserPage } from '../pages';
// import { RegisterUserPage } from 'pages/pages';

/**
 * Generated class for the DeviceAlreadyRegisteredPromptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-already-registered-prompt',
  templateUrl: 'device-already-registered-prompt.html',
})
export class DeviceAlreadyRegisteredPromptPage {
  isScbLifeCustomer: any;

  constructor(private modalService: ModalServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.isScbLifeCustomer = this.navParams.get("isScbLifeCustomer");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceAlreadyRegisteredPromptPage');
  }
  
  goToRegister() {
    this.navCtrl.setRoot(RegisterUserPage);
    this.modalService.dismissModal();
  }

}
