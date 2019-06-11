import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ModalServiceProvider } from '../modal-service/modal-service';
import { ToolTipPage } from '../../pages/pages';
import { CacheServiceProvider } from '../ion-service/cache-service';
import { BaseApp } from '../../app/base';

/*
  Generated class for the TooltipServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TooltipServiceProvider extends BaseApp{

  toolTipVerify:any= {
    claim:false,
    homePagePolicy:false,
    homePageFitsense:false,
    loanPopUp1:false,
    loanPopUp2:false,
    paymentPopUp1:false,
    paymentPopUp2:false,
    changePayment:false,
    policyCashBack:false,
    policyDashboadrd:false,
    policyInfo:false,
    findLoaction:false
  }
  
  
  constructor(public http: HttpClient,public modalService:ModalServiceProvider,
    public cacheService:CacheServiceProvider,
    public injector?: Injector  ) {
    super(injector);
    console.log('Hello TooltipServiceProvider Provider');
  }

  activateToolTip(toolTipData){
    this.cacheService.getCache(this.CONSTANT.TOOL_TIPS_STATUS).then(res=>{
      this.toolTipVerify = res;
      if (!this.toolTipVerify[toolTipData.toolTipKey]) {
               this.toolTipVerify[toolTipData.toolTipKey]=true;
               console.log('toolTip updated data', this.toolTipVerify);
               this.cacheService.setCache(this.CONSTANT.TOOL_TIPS_STATUS, this.toolTipVerify);
               this.modalService.presentModal(ToolTipPage, { "data": toolTipData });
           }
    },err=>{
      this.cacheService.setCache(this.CONSTANT.TOOL_TIPS_STATUS, this.toolTipVerify);
    })
  
  }
  dissmisstoolTipModal(){
    this.modalService.dismissModal();
  }

}
