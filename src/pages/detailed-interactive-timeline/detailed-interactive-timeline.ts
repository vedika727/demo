import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { ITooltipView } from '../../components/tooltip-overlay/ITooltip-view';
import { TooltipServiceProvider } from '../../providers/tooltip-service/tooltip-service';

 /**
   * @author Manish Khedekar
   * @description  Policy Interactive timeline page.
   */
@IonicPage()
@Component({
  selector: 'page-detailed-interactive-timeline',
  templateUrl: 'detailed-interactive-timeline.html',
})
export class DetailedInteractiveTimelinePage {

  policyData:any;
  policyCashbacks:any;
  cta: IDialogButton<any>;
  toolData: ITooltipView<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCTRL : ModalServiceProvider,
    public toolTipService:TooltipServiceProvider) {
    //this.policyCashbackTooltip();
    this.policyData=this.navParams.get('policyData');

    console.log(this.policyData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailedInteractiveTimelinePage');
  }
/**
   * @author Manish Khedekar
   * @description his method is used to dismiss the  modal
   */

  dismissModal(){
   this.modalCTRL.dismissModal();
  }
/**
   * @author Manish Khedekar
   * @description This method is used to dismiss the  modal
   */
  backToPage(){
    this.modalCTRL.dismissModal();
  }
  alert(){
    console.log("cashback tooltip called:::::::");
    this.toolTipService.dissmisstoolTipModal();
  }
  // policyCashbackTooltip() {
  //   console.log("cashback tooltip called:::::::22222");
  //   this.cta = <IDialogButton<any>>{
  //     name: "ถัดไป",
  //     click: (data?) => {
  //       this.alert();
  //     }
  //   }
  //   this.toolData = <ITooltipView<any>>{
  //     //toolTipData: [{ image: "https://pbs.twimg.com/media/DSkz7UWVMAAivei.png", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }, { image: "https://i.stack.imgur.com/rJeXI.png", imageDesc: "สามารถกู้เงินได้ง ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
  //     toolTipData: [{ image: "../assets/imgs/TT03-PD-cashback amounts.jpg", imageDesc: "สามารถกู้เงินได้งาย ๆ เพียง 2 ขั้นตอน <ืนยันหรือเพิ่มบัญชีในการรับเงิน" }],
  //     toolTipKey: "policyCashBack",
  //     actionCTA: this.cta
  //   };
  //   this.toolTipService.activateToolTip(this.toolData);
  // }


}
