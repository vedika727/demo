import { LoadingServiceProvider } from './../../providers/ion-service/loading-service';
import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { ClaimList } from './../../common/models/claims-data.class';
import { Component, OnInit, Input } from '@angular/core';
import { ClaimResponse } from '../../common/models/claims-data.class';
import { HomePdServiceProvider } from '../../providers/homepage-module/home-pd-service/home-pd-service';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { IDialogButton } from '../generic-view/iDialog-action';
import { ITooltipView } from '../tooltip-overlay/ITooltip-view';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { ThaiDateConversionProvider } from '../../providers/thai-date-conversion/thai-date-conversion';
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { TranslateService } from "ng2-translate";

@Component({
  selector: 'claim-history',
  templateUrl: 'claim-history.html'
})
export class ClaimHistoryComponent implements OnInit {
  // @Input("in") inputFromPage: any;
  // isApiResponseReady:boolean = false;
  claimdata: ClaimList[] = new Array();
  text: string;
  claimDataObject: any;
  // claimDataObject: ClaimResponse = new ClaimResponse();
  claimHistoriesData: any;
  claimItemsData: any;
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  constructor(
    private homePdService: HomePdServiceProvider,
    public toastService: ToastServiceProvider,
    public loadingService: LoadingServiceProvider,
    public toolTipService: TooltipServiceProvider,
    public thaiDateConverter: ThaiDateConversionProvider,
    private fba: FirebaseAnalyticsService,
    public translate: TranslateService
  ) {
    this.fba.setCurrentScreen('claim_enquiry_info');
    //this.fba.logEvent("", ""); 
    console.log('Hello ClaimHistoryComponent Component');
  }

  claimResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      console.log("claimResponse objcet : ", data.result);
      let res = data.result;
      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");

    },
    fail: (errorService) => {
      console.log("claimResponse Error - ", errorService)
      // this.toastService.presentToast("device registered successfully");
      this.toastService.presentToast(errorService.resonseErrorMessage);

    },
    systemFailure: (errorService) => {
      console.log("claimResponse Error system ", errorService)
      if (errorService.httpStatus == 0) {
        this.toastService.presentToast('No internet connection available');
      }
      this.toastService.presentToast(errorService.errorMessage);
    },

    progress: (isProgress) => {
      this.loadingService.isLoading(isProgress);
    }
  }

  ngOnInit(): void {

    this.policyClaimtooltip();
    this.homePdService.getClaimsData().then((res) => {
      console.log('^^^got claims data', res);
      this.claimDataObject = res;
      this.claimdata = this.claimDataObject.claimList;
      console.log('this.claimdata has', this.claimdata);
      if (this.claimdata) {
        this.claimItemsData = this.claimdata[0].ClaimItems;
        this.claimHistoriesData = this.claimdata[0].ClaimHistories;

        //analytics function is called depending on status received for claimsHistories
        for(var x in this.claimHistoriesData){
          if(this.claimHistoriesData[x].Status == 'อนุมัติเรียบร้อยแล้ว'){
            this.fba.logEvent('claim_completed','View claim information - visit with complete status');
          }
          else if(this.claimHistoriesData[x].Status == 'ได้รับเอกสารและอยู่ระหว่างการพิจารณา'){
            this.fba.logEvent('claim_require_document','View claim information - visit with document required');
          }
          else {
            this.fba.logEvent('claim_rejected','View claim information - visit with reject status');
          }
        }

        //analytics function is called depending on status received for claimsItems
        for(let x in this.claimItemsData){
          if(this.claimItemsData[x].Status == 'อนุมัติเรียบร้อยแล้ว'){
            this.fba.logEvent('claim_completed','View claim information - visit with complete status');
          }
          else if(this.claimItemsData[x].Status == 'ได้รับเอกสารและอยู่ระหว่างการพิจารณา'){
            this.fba.logEvent('claim_require_document','View claim information - visit with document required');
          }
          else {
            this.fba.logEvent('claim_rejected','View claim information - visit with reject status');
          }
        }


        console.log('this.claimItemsData has', this.claimItemsData);
        console.log('this.claimHistoriesData has', this.claimHistoriesData);
      }
      // console.log('claimdata ^^$$^^', this.claimdata);
    }, (err) => {
      console.log('^^^NO claims data', err);

    });
  }
  toolTipalert() {
    console.log();
    this.toolTipService.dissmisstoolTipModal();
  }

  policyClaimtooltip() {
    console.log("in tooltip modal claim");
    this.cta = <IDialogButton<any>>{
      name: this.translate.instant('errors.errorButtons.next'),
      click: (data?) => {
        this.toolTipalert();
      }
    }
    this.toolData = <ITooltipView<any>>{
      //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipData: [{ image: "../assets/imgs/TT11-Cu1.0.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
      toolTipKey: "claim",
      actionCTA: this.cta
    };
    this.toolTipService.activateToolTip(this.toolData);
  }
}
