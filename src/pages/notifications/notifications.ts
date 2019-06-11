import { Component, Injector } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { BaseApp } from '../../app/base';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { IDialogButton } from '../../components/generic-view/iDialog-action';
import { ActivityLogServicesProvider } from '../../providers/activity-log/activity-log-service';
import { ThaiDateConversionProvider } from '../../providers/thai-date-conversion/thai-date-conversion';
import { DeepLinkObject } from '../../common/models/deep-Link.class';
import { dyLinkOBJConst } from "../../common/constants/cta-const";
import { FitsenseServiceProvider } from '../../providers/homepage-module/fitsense-service/fitsense-service';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service'
import { TranslateService } from "ng2-translate";
var json = require('./inapp.json');
/**
 * @author Rajul Dixit
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage extends BaseApp {
  tryAgainMessage: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  activityLog = [];
  historyLog = []
  deepLinkObject = new DeepLinkObject();
  updateAct: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private activityLogService: ActivityLogServicesProvider,
    private thaiDateConversion: ThaiDateConversionProvider,
    private fitsenseService: FitsenseServiceProvider,
    private loginService: LoginServivceProvider,
    private injector: Injector,
    private modalServcie: ModalServiceProvider,
    private translateService: TranslateService) {
    super(injector);
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.tryAgainMessage = this.translate.instant('errors.errorButtons.tryAgain');

    // this.activityLog = [
    //   {
    //     "activityId": 282,
    //     "customerId": "Y3H39V0H",
    //     "messageTitle": "RETESTON 3224 test on push notification",
    //     "messageBody": "Amount in your account credit",
    //     "messageGroupId": "policy_apl_payment_due",
    //     "expirationDate": "2018-11-23T00:00:00.000+0000",
    //     "messageType": 7,
    //     "callToAction": "policy_payment_apl",
    //     "policyNumber": "0945",
    //     "premiumDueDate": "2018-09-05T00:00:00.000+0000",
    //     "paymentDate": "2018-11-12T00:00:00.000+0000",
    //     "claimId": null,
    //     "status": null,
    //     "statusDate": null,
    //     "topic": null,
    //     "fitsenseScreenPath": {
    //       "ScreenIDLevel1": "PointsRewards",
    //       "ScreenIDLevel2": "Rewards",
    //       "ScreenIDLevel3": "All",
    //       "ScreenIDLevel4": "Details",
    //       "RewardID": "tesco_lotus_0640"
    //     },
    //     "createdDate": "2018-11-05T07:47:42.000+0000",
    //     "isRead": false
    //   },
    //   {
    //     "activityId": 284,
    //     "customerId": "Y3H39V0H",
    //     "messageTitle": "RETESTON 3224 test on push notification",
    //     "messageBody": "Amount in your account credit",
    //     "messageGroupId": "policy_apl_payment_due",
    //     "expirationDate": "2018-11-23T00:00:00.000+0000",
    //     "messageType": 7,
    //     "callToAction": "policy_payment_apl",
    //     "policyNumber": "0945",
    //     "premiumDueDate": "2018-09-05T00:00:00.000+0000",
    //     "paymentDate": "2018-11-12T00:00:00.000+0000",
    //     "claimId": null,
    //     "status": null,
    //     "statusDate": null,
    //     "topic": null,
    //     "fitsenseScreenPath": {
    //       "ScreenIDLevel1": "PointsRewards",
    //       "ScreenIDLevel2": "Rewards",
    //       "ScreenIDLevel3": "All",
    //       "ScreenIDLevel4": "Details",
    //       "RewardID": "tesco_lotus_0640"
    //     },
    //     "createdDate": "2018-11-05T07:47:42.000+0000",
    //     "isRead": false
    //   },
    //   {
    //     "activityId": 280,
    //     "customerId": "Y3H39V0H",
    //     "messageTitle": "RETESTON 3224 test on push notification",
    //     "messageBody": "Amount in your account credit",
    //     "messageGroupId": "policy_apl_payment_due",
    //     "expirationDate": "2018-11-23T00:00:00.000+0000",
    //     "messageType": 7,
    //     "callToAction": "policy_payment_apl",
    //     "policyNumber": "0945",
    //     "premiumDueDate": "2018-09-05T00:00:00.000+0000",
    //     "paymentDate": "2018-11-12T00:00:00.000+0000",
    //     "claimId": null,
    //     "status": null,
    //     "statusDate": null,
    //     "topic": null,
    //     "fitsenseScreenPath": {
    //       "ScreenIDLevel1": "PointsRewards",
    //       "ScreenIDLevel2": "Rewards",
    //       "ScreenIDLevel3": "All",
    //       "ScreenIDLevel4": "Details",
    //       "RewardID": "tesco_lotus_0640"
    //     },
    //     "createdDate": "2018-11-05T07:45:28.000+0000",
    //     "isRead": false
    //   },
    //   {
    //     "activityId": 278,
    //     "customerId": "Y3H39V0H",
    //     "messageTitle": "RETESTON 3224 test on push notification",
    //     "messageBody": "Amount in your account credit",
    //     "messageGroupId": "policy_apl_payment_due",
    //     "expirationDate": "2018-11-23T00:00:00.000+0000",
    //     "messageType": 7,
    //     "callToAction": "policy_payment_apl",
    //     "policyNumber": "0945",
    //     "premiumDueDate": "2018-09-05T00:00:00.000+0000",
    //     "paymentDate": "2018-11-12T00:00:00.000+0000",
    //     "claimId": null,
    //     "status": null,
    //     "statusDate": null,
    //     "topic": null,
    //     "fitsenseScreenPath": {
    //       "ScreenIDLevel1": "PointsRewards",
    //       "ScreenIDLevel2": "Rewards",
    //       "ScreenIDLevel3": "All",
    //       "ScreenIDLevel4": "Details",
    //       "RewardID": "tesco_lotus_0640"
    //     },
    //     "createdDate": "2018-11-05T07:45:27.000+0000",
    //     "isRead": false
    //   }
    // ]
  }

  ionViewDidEnter() {
    console.log("ionViewDidLoad ActivityLogPage", json);
    this.getActivityDetails();
  }

  getActivityLogResponse = <IServiceResponse<any>>{
    success: (data: any) => {
      this.sortDataForHistory(data.result.activityList);
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

  genericUpateActivityActionRetry = <IDialogButton<any>>{
    name: this.tryAgainMessage,
    click: (data?) => {
      this.genericDialog = null;
      this.updateActivityLog();
    }
  }
  /**
   * @param 103 code is for activity In App notification.
   */
  private getActivityDetails() {
    // below method should give activityTypeCode, customerId params appending to url
    this.activityLogService.activityLog(this.getActivityLogResponse, "103");
    //this.activityLog = json;
  }

  updateActivityLog() {
    this.activityLogService.updateActivityLog(this.updateActivityLogResponse, this.updateAct);
  }
  getDate(date) {
    if (date == undefined) {
      return "";
    }
    return this.thaiDateConversion.convertIsoToDate(date, true, 2)
  }
  getTime(date) {
    return this.thaiDateConversion.convertIsDateToTime(date);
  }
  sortDataForHistory(data: any) {
    let sortData = this.activityLogService.sortData(data);
    this.activityLog = sortData.todaysActivity;
    this.historyLog = sortData.historyActivity;
    // this.activityLog = [
    //   {
    //     "activityId": 282,
    //     "customerId": "Y3H39V0H",
    //     "messageTitle": "RETESTON 3224 test on push notification",
    //     "messageBody": "Amount in your account credit",
    //     "messageGroupId": "policy_apl_payment_due",
    //     "expirationDate": "2018-11-23T00:00:00.000+0000",
    //     "messageType": 7,
    //     "callToAction": "policy_payment_apl",
    //     "policyNumber": "0945",
    //     "premiumDueDate": "2018-09-05T00:00:00.000+0000",
    //     "paymentDate": "2018-11-12T00:00:00.000+0000",
    //     "claimId": null,
    //     "status": null,
    //     "statusDate": null,
    //     "topic": null,
    //     "fitsenseScreenPath": {
    //       "ScreenIDLevel1": "PointsRewards",
    //       "ScreenIDLevel2": "Rewards",
    //       "ScreenIDLevel3": "All",
    //       "ScreenIDLevel4": "Details",
    //       "RewardID": "tesco_lotus_0640"
    //     },
    //     "createdDate": "2018-11-05T07:47:42.000+0000",
    //     "isRead": false
    //   },
    //   {
    //     "activityId": 284,
    //     "customerId": "Y3H39V0H",
    //     "messageTitle": "RETESTON 3224 test on push notification",
    //     "messageBody": "Amount in your account credit",
    //     "messageGroupId": "policy_apl_payment_due",
    //     "expirationDate": "2018-11-23T00:00:00.000+0000",
    //     "messageType": 7,
    //     "callToAction": "policy_payment_apl",
    //     "policyNumber": "0945",
    //     "premiumDueDate": "2018-09-05T00:00:00.000+0000",
    //     "paymentDate": "2018-11-12T00:00:00.000+0000",
    //     "claimId": null,
    //     "status": null,
    //     "statusDate": null,
    //     "topic": null,
    //     "fitsenseScreenPath": {
    //       "ScreenIDLevel1": "PointsRewards",
    //       "ScreenIDLevel2": "Rewards",
    //       "ScreenIDLevel3": "All",
    //       "ScreenIDLevel4": "Details",
    //       "RewardID": "tesco_lotus_0640"
    //     },
    //     "createdDate": "2018-11-05T07:47:42.000+0000",
    //     "isRead": false
    //   },
    //   {
    //     "activityId": 280,
    //     "customerId": "Y3H39V0H",
    //     "messageTitle": "RETESTON 3224 test on push notification",
    //     "messageBody": "Amount in your account credit",
    //     "messageGroupId": "policy_apl_payment_due",
    //     "expirationDate": "2018-11-23T00:00:00.000+0000",
    //     "messageType": 7,
    //     "callToAction": "policy_payment_apl",
    //     "policyNumber": "0945",
    //     "premiumDueDate": "2018-09-05T00:00:00.000+0000",
    //     "paymentDate": "2018-11-12T00:00:00.000+0000",
    //     "claimId": null,
    //     "status": null,
    //     "statusDate": null,
    //     "topic": null,
    //     "fitsenseScreenPath": {
    //       "ScreenIDLevel1": "PointsRewards",
    //       "ScreenIDLevel2": "Rewards",
    //       "ScreenIDLevel3": "All",
    //       "ScreenIDLevel4": "Details",
    //       "RewardID": "tesco_lotus_0640"
    //     },
    //     "createdDate": "2018-11-05T07:45:28.000+0000",
    //     "isRead": false
    //   },
    //   {
    //     "activityId": 278,
    //     "customerId": "Y3H39V0H",
    //     "messageTitle": "RETESTON 3224 test on push notification",
    //     "messageBody": "Amount in your account credit",
    //     "messageGroupId": "policy_apl_payment_due",
    //     "expirationDate": "2018-11-23T00:00:00.000+0000",
    //     "messageType": 7,
    //     "callToAction": "policy_payment_apl",
    //     "policyNumber": "0945",
    //     "premiumDueDate": "2018-09-05T00:00:00.000+0000",
    //     "paymentDate": "2018-11-12T00:00:00.000+0000",
    //     "claimId": null,
    //     "status": null,
    //     "statusDate": null,
    //     "topic": null,
    //     "fitsenseScreenPath": {
    //       "ScreenIDLevel1": "PointsRewards",
    //       "ScreenIDLevel2": "Rewards",
    //       "ScreenIDLevel3": "All",
    //       "ScreenIDLevel4": "Details",
    //       "RewardID": "tesco_lotus_0640"
    //     },
    //     "createdDate": "2018-11-05T07:45:27.000+0000",
    //     "isRead": false
    //   }
    // ]
  }

  /**
   * @description -- this method open the requried page based on list selection
   * @param activity - this object holds which to be open and what data to be send
   */
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
      } else if (dyLinkOBJConst.cta[pageToOpen] === this.CONSTANT.FEEDBACK) {
        this.modalServcie.presentModal(dyLinkOBJConst.cta[pageToOpen]);
      } else if (dyLinkOBJConst.cta[pageToOpen] === this.CONSTANT.POLICY_DASHBOARD_FULL_VIEW) {
        this.navCtrl.parent.select(1); //for showing policy_dashboard_full_view
      } else {
        this.navCtrl.push(dyLinkOBJConst.cta[pageToOpen], { [this.CONSTANT.DY_LINK_OBJ]: activity });
      }
    }
  }
}