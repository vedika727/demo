import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { LogServiceProvider } from '../../providers/data-service/log-service';

/**
 * @author Rajul Dixit
 */

@IonicPage()
@Component({
  selector: 'page-support-document-creditlife',
  templateUrl: 'support-document-creditlife.html',
})
export class SupportDocumentCreditlifePage {

  public policyNumber : any;
  public documentName = new Array<{'name':any}>();
  constructor(public logger : LogServiceProvider,public navCtrl: NavController) {
    this.policyNumber = "ABC123456789WE";
    this.documentName = [
          {'name' : 'หนังสือรับรองการชำระเบี้ย'}
    ]
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad SupportDocumentCreditlifePage');
  }

  /**
   * This method is used to open the respective document
   * @param evt 
   */
  OpenDocument(evt){
    this.logger.log("Document to be open :", evt);
  }
}
