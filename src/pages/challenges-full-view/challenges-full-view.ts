import { LogServiceProvider } from '../../providers/data-service/log-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { FitsenseServiceProvider } from '../../providers/homepage-module/fitsense-service/fitsense-service';
import { RegistrationProcessProvider } from '../../providers/registration-process-service/registration-process';
import { BaseApp } from '../../app/base';
import { RegisterUserPage } from '../pages';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { FirebaseAnalyticsService } from '../../providers/firebase-service/firebase-analytics-service';

/**
  * @author Rajul Dixit.
  * @description  Challenge full view page.
  */
@IonicPage()
@Component({
  selector: 'page-challenges-full-view',
  templateUrl: 'challenges-full-view.html',
})
export class ChallengesFullViewPage extends BaseApp {
  challengesHeader = {
    "title": 'challenges',
    "icon": 'scbl-challenge'
  }

  challenges = [
    {
      img: '',
      topLabel: '',
      bottomLabel: '',
      buttonText: ''
    }
  ];
  policytabs: any = ['Challenges'];
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  challegegsCompleted: any;
  challengesAvailable: any;
  isRegistered: any;
  constructor(
    public fitsenseService: FitsenseServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public logger: LogServiceProvider,
    public registrationProvider: RegistrationProcessProvider,
    public cacheService: CacheServiceProvider,
    public loginService: LoginServivceProvider,
    private fba: FirebaseAnalyticsService) {
    // Call initiate baseApp
    super();
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    this.challegegsCompleted = this.fitsenseService.fitsense.challegesCompleted;
    this.challengesAvailable = this.fitsenseService.fitsense.numberOfChallenges;
    this.isRegistered = false;
    this.challenges = [
      {
        img: 'assets/imgs/Assets-Image-Homepage-HP12-1.jpg',
        topLabel: 'อันดับของคุณ 45/125',
        bottomLabel: 'คุณได้ทำกิจกรรมไปแล้ว x กิจกรรม',
        buttonText: 'เริ่มกิจกรรม'
      },
      {
        img: 'assets/imgs/Assets-Image-Homepage-HP12-2.jpg',
        topLabel: 'เร่งคะแนนเพื่อแลกรางวัลเร็วขึ้น ด้วยการร่วมกิจกรรมท้าแกร่ง',
        bottomLabel: '',
        buttonText: 'ดูเพิ่มเติม'
      },
      {
        img: 'assets/imgs/Assets-Image-Homepage-HP12-3.jpg',
        topLabel: 'ดูกิจกรรมท้าทายสำหรับคาร์ดิโอ',
        bottomLabel: 'คุณจะได้รับเพิ่ม x คะแนน',
        buttonText: 'ดูเพิ่มเติม'
      }
    ]

    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got isregesiterd', this.isRegistered);
      this.isRegistered = res;
    }, (err) => {
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    })
  }

  ionViewDidEnter() {
    this.fba.setCurrentScreen('challenge_detail');

  }
  /**
    * @author Rajul Dixit.
    * @description  This method is used to call Fitsense. 
    */


  openFitsenseScreen(screenID) {
    var height = this.loginService.tabBarHeight;
    this.fitsenseService.startFitsenseScreen(screenID, height);
  }


  gotoRegister() {

    this.navCtrl.parent.parent.setRoot(RegisterUserPage)

  }
}
