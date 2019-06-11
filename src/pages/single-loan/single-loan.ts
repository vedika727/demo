import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ScbHeaderInputs } from './../../components/scb-header/scb-header';
import { PolicyLoanConfirmationPage } from "../pages";
import { PolicyTabsFlags } from "../../components/pd-header-tabs/pd-header-tabs";
import { PolicyLoanServicesProvider } from "../../providers/policy-loan-services/policy-loan-services";
// import { FilteredLoanData,ConfirmLoanPostData } from '../../providers/policy-loan-services/services-request-data-model-class';
import { ThaiDateConversionProvider } from "../../providers/thai-date-conversion/thai-date-conversion";
import { FilteredLoanData, ConfirmLoanPostData, ConfirmPolicyInfo, IndividualPolicyInformation } from '../../providers/policy-loan-services/services-request-data-model-class';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { TranslateService } from 'ng2-translate';

/**
 * Generated class for the SingleLoanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-single-loan',
  templateUrl: 'single-loan.html',
})
export class SingleLoanPage {
  thaiDate: string;
  date: string;
  loanInfo: IndividualPolicyInformation;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  confirmData:ConfirmLoanPostData;
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private policyLoanService: PolicyLoanServicesProvider,
    private thaiDateConversion:ThaiDateConversionProvider,
    public toolTipService:TooltipServiceProvider,
    public translate: TranslateService) {
      this.singlePolicyToolTip();
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.date=new Date().toISOString();
    this.thaiDate=this.thaiDateConversion.convertIsoToDate(this.date,true,2);
      this.loanInfo=this.policyLoanService.getSelectedPolicy();
      debugger
      console.log("Get single loan data on single loan page ",this.loanInfo);

    
  }

  ionViewDidLoad() {
  }

  submissionPage(loanAmount: any) {
    console.log(loanAmount);
    this.loanInfo.loanAmountRequired = loanAmount;
    this.policyLoanService.setSelectedPolicy(this.loanInfo);
    console.log("Data on single loan ",this.loanInfo);
    this.navCtrl.push(PolicyLoanConfirmationPage,{data:this.thaiDate});
  }

  alert(){
    console.log();
    this.toolTipService.dissmisstoolTipModal();
  }
  singlePolicyToolTip() {
    this.cta = <IDialogButton<any>>{
      name: this.translate.instant("errors.errorButtons.next"),
      click: (data?) => {
        this.alert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      toolTipData: [{ image: "../assets/imgs/PL_tooltips_screen_01@3x.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" },
       { image: "../assets/imgs/PL_tooltips_screen_02@3x.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
     // toolTipData: [{ image: "https://s3.amazonaws.com/media.nngroup.com/media/editor/2014/02/06/Ness-actualUI.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "loanPopUp1",
      actionCTA:this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }
}



