import { SharedataProvider } from './../../providers/sharedata/sharedata';
import { LoginServivceProvider } from './../../providers/login-module/login-service/login-service';
import { MyAccountServiceProvider } from './../../providers/my-account-service/my-account-service';
import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { LoadingServiceProvider } from './../../providers/ion-service/loading-service';
import { IServiceResponse } from './../../common/service-models/iServiceResponse';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';

/**
 * @author Sumit Lokhande
 * @description This file contains functions related to consent page
 */

@IonicPage()
@Component({
  selector: 'page-consent',
  templateUrl: 'consent.html',
})
export class ConsentPage {
  data: string='';
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  tAndC:boolean=true;
  constructor( private loginService: LoginServivceProvider,public navCtrl: NavController, public navParams: NavParams, public toastService: ToastServiceProvider,
    private loadingService: LoadingServiceProvider,public sharedataservice: SharedataProvider,
    public myAccountService : MyAccountServiceProvider,) {
      // this.data['type']=this.navParams.get("data")
  }
  eLetterConsentResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
      console.log("eLetterConsent Response obj. : ", data);
      this.toastService.presentToast("e Letter Consent Response Saved");
    },
    fail: (errorService) => {
      console.log("eLetterConsent Error - ", errorService)

    },
    systemFailure: (errorService) => {

      console.log("eLetterConsent Error system ", errorService)
    },

    progress: (isProgress) => {
      this.loadingService.isLoading(isProgress);
    }
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsentPage');
  }

  // TODO - Removed from Release 1
  // navigateToThankYouPage() {

  //   const data = {
  //     consentAnswer: this.tAndC ? "Y" : "N",
  //     answerDate: new Date(),
  //     email: this.loginService.customerInfo.email
  //   }
  //   this.myAccountService.eLetterConsent(this.eLetterConsentResponse,data)
  //     this.navCtrl.setRoot(ThankYouPage);
  // }
  backToRootPage() {

    // Removing only last index from stack - needed in case that you go to OTP screen from modal
    this.navCtrl.remove(this.navCtrl.getPrevious().index);
    this.navCtrl.pop();
    this.sharedataservice.setUserConsent(this.loginService.customerInfo.isEmailVerify);
    console.log( this.loginService.customerInfo.isEmailVerify," this.loginService.customerInfo in consent page");
  }
  // TODO - Removed from Release 1
  // toConsentTAndC(){
  //   this.navCtrl.push(TermsAndConditionConsentPage);
  // }
  customLabelFunc(e){
    e.preventDefault();
  }

}
