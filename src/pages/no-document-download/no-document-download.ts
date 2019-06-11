import { ModalServiceProvider } from './../../providers/modal-service/modal-service';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'no-document-download-modal',
  templateUrl: 'no-document-download.html',
})
export class NoDocumentDownloadPage {

  constructor(private modalService: ModalServiceProvider) {
  }

  dismissEmailVerifyModal() {
    this.modalService.dismissModal();
  }
}
