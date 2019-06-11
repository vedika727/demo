import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnterOtpPage } from "../pages";
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';

/**
 * Generated class for the EmailVerificationPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-verification-popup',
  templateUrl: 'email-verification-popup.html',
})
export class EmailVerificationPopupPage {
  data: any;
  email: any;
  navObject :any;
  flow:string;
  constructor(public navCtrl: NavController, 
    public modalCTRL : ModalServiceProvider,
    public navParams: NavParams) {
    // this.email="wittaya@gmail.com"
    this.data = this.navParams.get("data");
    this.navObject= this.navParams.get("nav");
    this.email=this.data.email;
    this.flow = 'loan';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailVerificationPopupPage');
  }
  verifyEmail(){
    this.data['type']="emailVerification";
    //this.dismissModal();
    this.navObject.parent.parent.push(EnterOtpPage, {"data":this.data,"flow":this.flow});
  }

  dismissModal(){
    this.modalCTRL.dismissModal();
    console.log("close button")
  }
}
