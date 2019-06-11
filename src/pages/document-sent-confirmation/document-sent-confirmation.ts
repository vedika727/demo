import { SupportDocumentsPage } from './../support-documents/support-documents';
import { LoginServivceProvider } from './../../providers/login-module/login-service/login-service';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { TabsPage, PolicyDashboardPage} from './../pages';


/**
 * @author Rajul Dixit
 */

@IonicPage()
@Component({
  selector: 'page-document-sent-confirmation',
  templateUrl: 'document-sent-confirmation.html',
})
export class DocumentSentConfirmationPage {

  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  constructor(public loginService: LoginServivceProvider,public navCtrl: NavController, public navParams: NavParams, public logger : LogServiceProvider) {
    this.headerInput.isBackButton = false;
    this.headerInput.nav = navCtrl;
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad DocumentSentConfirmationPage');
  }

  confirm(){
    this.navCtrl.pop();
  }
}
