import { MyAccountServiceProvider } from './../../providers/my-account-service/my-account-service';
import { CacheServiceProvider } from './../../providers/ion-service/cache-service';
import { LoadingServiceProvider } from './../../providers/ion-service/loading-service';
import { ToastServiceProvider } from './../../providers/ion-service/toast-service';
import { IServiceResponse } from './../../common/service-models/iServiceResponse';
import { FirebaseAnalyticsService } from "./../../providers/firebase-service/firebase-analytics-service";
import { Component } from "@angular/core";
import { IonicPage, NavParams, App, Platform, NavController } from "ionic-angular";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { LoginServivceProvider } from "../../providers/login-module/login-service/login-service";
import { LoginPage } from "../pages";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { BaseApp } from "./../../app/base";

/**
 * @author Abhishek Raina
 * @description This page sends the feedback and sets app to login page if opened form logout page
 */
@IonicPage()
@Component({
  selector: "page-feedback",
  templateUrl: "feedback.html"
})
export class FeedbackPage extends BaseApp {
  setFeedback = false;
  token: string;
  // object to store rating and feedback
  public feedback = {
    rating: null,
    comment: ""
  };
  urm: {};
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalService: ModalServiceProvider,
    private firebaseAnalyticsService: FirebaseAnalyticsService,
    private loginService: LoginServivceProvider,
    public logger: LogServiceProvider,
    private app: App,
    private platform: Platform,
    public toastService: ToastServiceProvider,
    private loadingService: LoadingServiceProvider,
    private cacheService: CacheServiceProvider,
    public myAccountService: MyAccountServiceProvider,
  ) {
    // this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res) => {
    //   this.urm = res;
    // }) ) {
    super();
    this.token = this.navParams.get("data");
    console.log("token is -", this.token)
    // this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res) => {
    //   this.urm = res;
    //   console.log(res,"this.urm");
    // })

  }

  ngOnInit() {
    this.cacheService.getCache(this.CONSTANT.KEY_URM_ID).then((res) => {
      this.urm = res;
      console.log("this.urm In feedback -", this.urm);
    })
  }

  postFeedback = <IServiceResponse<any>>{
    success: (data: any) => {
      // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
      console.log("postFeedback Response : ", data);
    },
    fail: (errorService) => {
      console.log("postFeedback Error - ", errorService)
      // this.toastService.presentToast("device registered successfully");
      this.toastService.presentToast(errorService.resonseErrorMessage);

    },
    systemFailure: (errorService) => {
      console.log("postFeedback Error system ", errorService)
      if (errorService.httpStatus == 0) {
        this.toastService.presentToast('No internet connection available');
      }
      this.toastService.presentToast(errorService.errorMessage);
    },

    progress: (isProgress) => {
      this.loadingService.isLoading(isProgress);
    }
  }

  ionViewDidEnter() {
    this.firebaseAnalyticsService.logEvent(
      "feedback_popup_getpoint",
      "Feedback given point"
    );
    this.firebaseAnalyticsService.setCurrentScreen('rating_popup');
    this.firebaseAnalyticsService.logEvent('menu_feedback', 'Click feedback button');
  }

  /**
   * @description This method will post the feedback to Backend using HttpService and push to loginpage if opened
   *              from logout page
   */
  sendFeedback() {
    this.firebaseAnalyticsService.logEvent('rating_complete','Give rating (User property rating)');
    const data: {} = {
      numberOfStars: this.feedback.rating,
      feedbackMessage: this.feedback.comment,
      customerId: this.urm
    }
    console.log('feedback given is -', data);
    this.myAccountService.sendFeedback(this.postFeedback, data, this.token);
    console.log("feedback", this.loginService.isLoggedIn);
    this.dismissFeedbackModal();

  }

  /**
   * @description This method will call the ModalService to close the modal
   */

  dismissFeedbackModal() {
    if (!this.loginService.isLoggedIn) {
      this.navCtrl.setRoot(LoginPage);
    }
    this.modalService.dismissModal();
  }
}
