/**
 * @author Vedika Bangre
 * @description Call Support Prompt
 */
import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { LoginPage } from '../pages';
import { RegistrationServivceProvider } from '../../providers/registration-service/registration-service';

/**
 * Generated class for the CallSupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-call-support',
  templateUrl: 'call-support.html',
})
export class CallSupportPage {

  number: string;
  callMethod: string;
  contactCustomerServiceCenter: string;
  incorrectPin3Times: string;
  incorrectPin: any;
  modalConfig: any = { btnOkDismiss: false };

  constructor(
    public modalCTRL: ModalServiceProvider,
    public navCtrl: NavController,
    public platform: Platform,
    public registerService: RegistrationServivceProvider) {
    debugger;
    this.platform = platform;
    this.modalConfig.btnOkDismiss = this.registerService.buttonDismissModal;
  }

  // ngOnInit(){
  //   debugger;
  //   this.closeModal = this.navParam.get('callBack');
  // }
  // ionViewDidLoad(){
  //   debugger;
  //   this.closeModal = this.navParam.get('callBack');
  // }
  /**
   * @description This will close the app
   */
  closeModal() {
    debugger;
    if (this.modalConfig.btnOkDismiss) {
      this.modalCTRL.dismissModal();
      this.registerService.buttonDismissModal = false;
    } else {
      this.modalCTRL.dismissModal();
      // this.platform.exitApp();
    }
  }
  /**
   * end  exitApp()
   */

  /**
   * @description This will close the prompt
   */
  dismissModal() {
    this.navCtrl.setRoot(LoginPage);
    this.modalCTRL.dismissModal();
  }
  /**
   * end dismissModal()
   */
}
