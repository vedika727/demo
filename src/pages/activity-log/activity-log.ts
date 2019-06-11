import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { Component, Injector } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { IServiceResponse } from "../../common/service-models/iServiceResponse";
import { ActivityLogServicesProvider } from "../../providers/activity-log/activity-log-service";
import { BaseApp } from '../../app/base';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { FirebaseAnalyticsService } from './../../providers/firebase-service/firebase-analytics-service';
import { ThaiDateConversionProvider } from '../../providers/thai-date-conversion/thai-date-conversion';
import { DeepLinkObject } from "../../common/models/deep-Link.class";
import { dyLinkOBJConst } from "../../common/constants/cta-const";
import { FitsenseServiceProvider } from "../../providers/homepage-module/fitsense-service/fitsense-service";
import { LoginServivceProvider } from "../../providers/login-module/login-service/login-service";
import { TranslateService } from "ng2-translate";
/**
 * @author Rajul Dixit
 */

@IonicPage()
@Component({
  selector: "page-activity-log",
  templateUrl: "activity-log.html"
})
export class ActivityLogPage extends BaseApp {
  tryAgainMessage: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  activityLog: any=[];
  historyLog = [{ title: "", time: "", details: "" }];
  updateAct: any = {};
  deepLinkObject = new DeepLinkObject();
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private activityLogService: ActivityLogServicesProvider,
    private thaiDateConversion:ThaiDateConversionProvider,
    private fba: FirebaseAnalyticsService,
    private fitsenseService: FitsenseServiceProvider,
    private loginService: LoginServivceProvider,
    public translate: TranslateService,
    private injector?: Injector
    ) {
    super(injector);
    this.fba.setCurrentScreen('activity_view');
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.tryAgainMessage = this.translate.instant("errors.errorButtons.tryAgain");
  }

  getActivityLogResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      this.activityLog = data.result.activityList;
      console.log('activity list - ', this.activityLog);
    },
    fail: (errorService) => {
      this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage)
    },
    systemFailure: (errorService) => {
      if (errorService.httpStatus == 0) {
        this.getInternetConnectionGenericInterface(this.genericActionRetry)
      } else {
        this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage, this.genericActionRetry)
      }
    },
    progress: (isProgress) => {
      this.isLoading(isProgress);
    }
  }

  updateActivityLogResponse = <IServiceResponse<any>>{
    success: (data: any) => {

    },
    fail: (errorService) => {
      this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage)
    },
    systemFailure: (errorService) => {
      if (errorService.httpStatus == 0) {
        this.getInternetConnectionGenericInterface(this.genericActionRetry)
      } else {
        this.getGenericError(null, errorService.responseTitle, errorService.resonseErrorMessage, this.genericActionRetry)
      }
    },
    progress: (isProgress) => {
      this.isLoading(isProgress);
    }
  }

  genericActionRetry = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      this.genericDialog = null;
      this.getActivityDetails();
    }
  }

  ionViewDidEnter() {
    // this.historyLog = [
    //   {
    //     title: "ส่งค่าร้องขอเงินกู้",
    //     time: "2 วันที่เเล้ว2561",
    //     details: "ส่งค่าร้องขอเงินกู้ 1,000,000 บาท เพื่อนำเข้าบัญชี SCB XXX-X-XX123-4"
    //   }
    // ]
    console.log("ionViewDidLoad ActivityLogPage");
    this.getActivityDetails();
  }
  /**
   * @param 101 code is for activity history.
   */
  private getActivityDetails() {
    // below method should give activityTypeCode, customerId params appending to url
    this.activityLogService.activityLog(this.getActivityLogResponse, "101");
  }

  getDateFromDate(date){
    return this.thaiDateConversion.convertIsoToDate(date,true,2)
  }

  updateActivityLog() {
    this.activityLogService.updateActivityLog(this.updateActivityLogResponse, this.updateAct);
  }

  callPage(activity: any) {
    this.updateAct['activityId'] = activity.activityId;
    this.updateAct['customerId'] = activity.customerId;
    this.updateAct['isRead'] = true;

    this.updateActivityLog();

    this.deepLinkObject = activity;
    var pageToOpen = this.deepLinkObject.call2action;
    if (pageToOpen && dyLinkOBJConst.cta.hasOwnProperty(pageToOpen)) {
      if (dyLinkOBJConst.cta[pageToOpen] === this.CONSTANT.FITSENSE) {
        //what if path is empty by mistake
        this.fitsenseService.startFitsenseScreen(this.deepLinkObject.fitsenseScreenPath, this.loginService.tabBarHeight);
      } else {
        this.navCtrl.push(dyLinkOBJConst.cta[pageToOpen], { [this.CONSTANT.DY_LINK_OBJ]: activity });
      }
    }
  }
  getTime(date) {
    return this.thaiDateConversion.convertIsDateToTime(date);
  }
}