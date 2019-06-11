import { EnterOtpPage } from './../pages';
import { LoginServivceProvider } from './../../providers/login-module/login-service/login-service';
import { ModalServiceProvider } from './../../providers/modal-service/modal-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * @author Sumit Lokhande
 * @description This page opens verify Email prompt page
 */

@IonicPage()
@Component({
  selector: 'page-email-verify-prompt',
  templateUrl: 'email-verify-prompt.html',
})
export class EmailVerifyPromptPage {

  constructor(public loginService: LoginServivceProvider,private modalService: ModalServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailVerifyPromptPage');
  }

  dismissEmailVerifyModal() {
    this.modalService.dismissModal();
  }
  verifyEmail(){
    const userData = {
      isSCBCustomer: true,
      type: "myAccount",
      email: this.loginService.email
    }
    this.dismissEmailVerifyModal();
    // this.navCtrl.parent.parent.push(EnterOtpPage,{data:data}); 
    this.navCtrl.push(EnterOtpPage, { 'data': userData });
  }
  
}
