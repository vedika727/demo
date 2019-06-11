import { Injectable } from "@angular/core";
import { ModalController, Modal } from "ionic-angular";

/*
  Generated class for the ModalServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

/**
 * @author Abhishek Raina
 * @description All the modals will be created and dismissed from here
 */
@Injectable()
export class ModalServiceProvider {
  modal: Modal;
  count: number;

  

  constructor(public modalCtrl: ModalController) {
    this.count = 0;
  }

  /**
   * @param pagename {Name of the modal created},data to be passed optional
   * @description this will dismiss the Alert
   */
  presentModal(pageName, data?: any) {
    console.log("presentModal called - ModalServiceProvider");
    if (this.count == 0) {
      this.modal = this.modalCtrl.create(pageName, data, {
        cssClass: "modalstyle"
      });
      this.modal.present();
    }
    this.count = 1;
  }

  /**
   * @description this will dismiss the Modal
   */
  dismissModal() {
    console.log("dismissModal called - ModalServiceProvider");
    if (this.modal) {
      this.modal.dismiss();
      this.count = 0;
    }
  }
}
