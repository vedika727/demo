import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { LoginPage, TabsPage, ConsentPage } from '../pages';
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { TouchID } from "@ionic-native/touch-id";
import { LoginServivceProvider } from "../../providers/login-module/login-service/login-service";
import { BaseApp } from '../../app/base';
import { TranslateServiceProvider } from '../../providers/translate-service/translate-service';

@IonicPage()
@Component({
  selector: 'page-login-popup',
  templateUrl: 'login-popup.html',
})
export class LoginPopupPage extends BaseApp{
  deviceOs: string;
  biometricType: {};
  icon: any;
  scblIcon: any;
  button: string;
  loginWithPin: string;
  fingerprintScan: string;
  header: string;
  fingerPrintPopMessage:string;
  fingerPrintPopTitleMessage:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public cacheService: CacheServiceProvider,
    public androidFingerprintAuth: AndroidFingerprintAuth,
    public touchId: TouchID,
    public platform: Platform,
    public loginService:LoginServivceProvider,
    public translateService: TranslateServiceProvider
    ) {
      super()
    this.header = this.navParams.get('header');
    this.scblIcon = this.navParams.get('icon');
    console.log("header", this.header)
    console.log("icon", this.scblIcon)
    this.fingerprintScan = this.header;
    this.icon = this.scblIcon;

    this.translateService.translateText("login.enterPin").subscribe(response=>{
      this.fingerPrintPopMessage = response;
    })
    this.translateService.translateText("login.scanFingerprint").subscribe(response=>{
      this.fingerPrintPopTitleMessage = response;
    })

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPopupPage');
  }
  ionViewDidEnter() {
    // code to check device OS and initialize fingerprint plugin accordingly
    if (this.platform.is("ios")) {
      this.deviceOs = "ios";
      this.cacheService.getCache(this.CONSTANT.KEY_IS_BIO_ENABLED).then(
        res => {
          console.log('cachce service res is',res);
          if (res == true) {
          } else {
          }
        },
        err => {
          // this.loggerService.log('not found in cache');
        }
      );
    } else if (this.platform.is("android")) {
      this.deviceOs = "android";
      // depending on fingerprint enabled or not, we will hide/show fingerprint icon on login page
      this.cacheService.getCache(this.CONSTANT.KEY_IS_BIO_ENABLED).then(
        res => {
          if (res == true) {
          } else {
          }
        },
        err => {
          // this.loggerService.log('not found in cache');
        }
      );
    } else {
      //hide fingerprint icon from login page
      // this.loggerService.log('HIDING FINGERPRINT ICON');
    }
  }
  
  LoginWithPin() {
    this.cacheService.setCache('checkedBiometric','true')
    this.cacheService.setCache('showPopUp','false')
    this.navCtrl.pop();
  }
  
    /**
   * @author - Yashodhan Apte
   * @description - This function will trigger login function with fingerprint
   */
  loginWithFingerprint() {
    console.log('login with fingerprint called')
    if (this.deviceOs == "android") {
      this.androidFingerprintAuth
        .encrypt({
          clientId: "myAppName",
          username: "myUsername",
          password: "myPassword"
        })
        .then(result => {
          if (result.withFingerprint) {
            // this.loggerService.log('Encrypted credentials: ' + result.token);
          this.loginService.isLoggedIn = true;            
            this.navCtrl.push(TabsPage);
          } else if (result.withBackup) {
            // this.loggerService.log('Successfully authenticated with backup password!');
          } else {
            // this.loggerService.log('Didn\'t authenticate!');
          }
        })
        .catch(error => {
          if (
            error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED
          ) {
            // this.loggerService.log('Fingerprint authentication cancelled');
          } else {
            // this.loggerService.error(error)
          }
        });
    }
    if (this.deviceOs == "ios") {
      this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(this.fingerPrintPopTitleMessage,// this will be shown in the native scanner popup
        this.fingerPrintPopMessage, // this will become the 'Enter password' button label
      ).then(
        res => {
          this.loginService.isLoggedIn = true;
          this.navCtrl.push(TabsPage);
          // this.loggerService.log('NAVIGATE TO HOMEPAGE');
        },
        err => {
          // this.loggerService.error('Wroong finger print', err);
        }
      );
    }
  }
  /**
   * end loginWithFingerprint()
   */
}
