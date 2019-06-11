import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-email-verification-confirmation',
  templateUrl: 'email-verification-confirmation.html',
})
export class EmailVerificationConfirmationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailVerificationConfirmationPage');
  }

}
