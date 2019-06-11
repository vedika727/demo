import { LogServiceProvider } from '../../providers/data-service/log-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 *@author Rajul Dixit
 */

@IonicPage()
@Component({
  selector: 'page-confirm-delete-ack',
  templateUrl: 'confirm-delete-ack.html',
})
export class ConfirmDeleteAckPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCTRL : ModalServiceProvider,
    public logger : LogServiceProvider) {
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad ConfirmDeleteAckPage');
  }

  dismissModal(){
    this.modalCTRL.dismissModal();
  }
  terminateDeleteAction(){
    this.modalCTRL.dismissModal();
  }
  deletePolicySuccessfully(){
    this.logger.log("Policy Deleted successfully");
  }

}
