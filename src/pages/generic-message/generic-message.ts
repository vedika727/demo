import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersModule } from '../../providers/providers.module';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { LoginPage } from '../pages';
import { Platform } from 'ionic-angular';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 * @author - Yashodhan Apte
 * @description - this is a page passed in modalService to show as a popup on any page if internet connectivity is lost.
 */
@IonicPage()
@Component({
  selector: 'page-generic-message',
  templateUrl: 'generic-message.html',
})
export class GenericMessagePage {

  inputData:any; 
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.inputData = this.navParams.get("data");
    console.log("Data received is ",this.inputData.title);
  }
 
}
