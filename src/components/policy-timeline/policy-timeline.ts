import { HttpServiceProvider } from '../../providers/data-service/http-service';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { Component, OnInit, Input , } from "@angular/core";
// import { PolicyTimelineInput } from "./policy-timeline-input";
import {  NavController } from 'ionic-angular';
import { PaymentDashboardPage } from '../../pages/pages';
import { DetailedInteractiveTimelinePage } from '../../pages/pages';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';
import { ThaiDateConversionProvider } from '../../providers/thai-date-conversion/thai-date-conversion';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { BaseApp } from '../../app/base';
import { TranslateService } from "ng2-translate";


 /**
   * @author Banti Sutar
   * @description component for policy timeline.
   */
@Component({
  selector: "policy-timeline",
  templateUrl: "policy-timeline.html"
})
export class PolicyTimelineComponent extends BaseApp implements OnInit {
  //getting data from page
  @Input("in") data: any;
  one: any;
  @Input("policyType") policyType;
  @Input("timeStatus") isIndented;
  two: any = true;
  three: any;
  four: any;
  five:any;
  payBtn:boolean = true;
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  // isIndented:boolean= true;
  timelinedata:any ;
  toolTipVerify: any;
  cashbackTooltipflag:boolean;
constructor(public modalCTRL : ModalServiceProvider,
   public httpService : HttpServiceProvider,
   public navCtrl:NavController,
   private fba:FirebaseAnalyticsService,
   public toolTipService:TooltipServiceProvider,
   public cacheService:CacheServiceProvider,
   public thaiDateConverter:ThaiDateConversionProvider,
   public translate: TranslateService
   ) {
     super();
    this.cacheService.getCache(this.CONSTANT.TOOL_TIPS_STATUS).then(res=>{
      this.toolTipVerify = res;
      this.cashbackTooltipflag = this.toolTipVerify.policyCashBack;
      // if (!this.toolTipVerify[toolTipData.toolTipKey]) {
      //          this.toolTipVerify[toolTipData.toolTipKey]=true;
      //          console.log('toolTip updated data', this.toolTipVerify);
      //          this.cacheService.setCache(this.CONSTANT.TOOL_TIPS_STATUS, this.toolTipVerify);
      //          this.modalService.presentModal(ToolTipPage, { "data": toolTipData });
      //      }
    },err=>{
      this.cacheService.setCache(this.CONSTANT.TOOL_TIPS_STATUS, this.toolTipVerify);
    })
  }

  ngOnInit() {
    
    console.log(" timeline input ",this.data);
    if(this.data.policyStatus=='Premium Due'){
      this.payBtn = true;

    }else{
      this.payBtn= false;
    }

    console.log(" pay button status ", this.payBtn);
  }
  /**
   * This method is used to open the DetailedInteractiveTimeline Modal
   * @param policyNumber 
   */

  OpenTimeline(){
    this.modalCTRL.presentModal(DetailedInteractiveTimelinePage,{policyData:this.data});
    console.log("cashback tooltip called in alert:::::::1111");

  }
  viewDetailedTimeline(policyNumber){
   
if(this.cashbackTooltipflag == false)
{
  console.log("cashback tooltip called:::::::22222");
  this.cta = <IDialogButton<any>>{
    name: this.translate.instant('errors.errorButtons.next'),
    click: (data?) => {
      this.OpenTimeline();
    }
  }
  this.toolData = <ITooltipView<any>>{
    //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
    toolTipData: [{ image: "../assets/imgs/TT03-PD-cashback amounts.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
    toolTipKey: "policyCashBack",
    actionCTA: this.cta
  };
  this.toolTipService.activateToolTip(this.toolData);
}else{
  this.modalCTRL.presentModal(DetailedInteractiveTimelinePage,{policyData:this.data});

}

     

  }

  paymentNow(){
    this.fba.logEvent("policy_info_payment","View payment due via policy info tabs 'ูข้อมูลเพิ่มเติม'");
    this.navCtrl.push(PaymentDashboardPage,{'policyData':this.data});
  }

}
