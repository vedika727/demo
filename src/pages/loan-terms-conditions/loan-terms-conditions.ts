import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { IServiceResponse } from "../../common/service-models/iServiceResponse";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { IDialogButton } from "../../components/generic-view/iDialog-action";
import { CmsServiceProvider } from "../../providers/cms-service/cms-service";
import { ToastServiceProvider } from "../../providers/ion-service/toast-service";

/**
 * Generated class for the LoanTermsConditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loan-terms-conditions',
  templateUrl: 'loan-terms-conditions.html',
})
export class LoanTermsConditionsPage {
  data: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cmsService: CmsServiceProvider,
    public toastService: ToastServiceProvider,
    private logger: LogServiceProvider) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.cmsService.getLoansTermsAndConditions().then((res: any) => {
      console.log('response ', res);
      this.data=res;
      console.log("data:",this.data);
    }, err => {
      console.log(err)
      this.toastService.presentToast('error in cms loans');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoanTermsConditionsPage');
  }

  confirmationPage(){
    
  }
}
