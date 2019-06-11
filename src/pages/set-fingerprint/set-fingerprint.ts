import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { RegistrationSuccessfulPage } from "../pages";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { TouchID } from "@ionic-native/touch-id";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { RegistrationServivceProvider } from '../../providers/registration-service/registration-service';
import { BaseApp } from '../../app/base';
import { TranslateServiceProvider } from '../../providers/translate-service/translate-service';
/**
 * Generated class for the SetFingerprintPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**
 * @author - Keyur Joshi and Yashodhan Apte
 * @description - This Page takes user details for registration 
 */
@IonicPage()
@Component({
  selector: "page-set-fingerprint",
  templateUrl: "set-fingerprint.html"
})
export class SetFingerprintPage extends BaseApp {
  a: boolean;
  pageFlow: string;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  os: string;
  biometricType: string;
  userData: any;
  authenticationType: string;
  fingerPrintPopMessage:string;
  fingerPrintPopTitleMessage:string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private androidFingerprintAuth: AndroidFingerprintAuth,
    public platform: Platform,
    private logger: LogServiceProvider,
    private touchId: TouchID,
    private cacheService: CacheServiceProvider,
    private openNativeSettings: OpenNativeSettings,
    private registerService: RegistrationServivceProvider,
    public translateService: TranslateServiceProvider
  ) {
    super();
    this.headerInput.isBackButton = false;
    this.headerInput.nav = this.navCtrl;
    // get userDetails from nav params
    this.userData = this.navParams.get('userDetails');

    this.translateService.translateText("login.enterPin").subscribe(response=>{
      this.fingerPrintPopMessage = response;
    })
    this.translateService.translateText("login.scanFingerprint").subscribe(response=>{
      this.fingerPrintPopTitleMessage = response;
    })

  }

  ionViewDidEnter()
  {
    console.log("Set Finger Print ionViewDidEnter");
  }

  ionViewWillEnter()
  {
    console.log("Set Finger Print ionViewDidEnter");
  }


  ionViewDidLoad() {
    if (this.platform.is("ios")) {
      this.os = "ios";
      this.biometricType = this.navParams.get('data');
      this.authenticationType = this.biometricType;
      
      this.cacheService.setCache(this.CONSTANT.KEY_BIOMETRIC_TYPE, this.biometricType);
    } else if (this.platform.is("android")) {
      this.os = "android";
      this.cacheService.setCache(this.CONSTANT.KEY_BIOMETRIC_TYPE, 'fingerprint');
    }
  }

  biometricRegister() {
    // check platform
    if (this.os == "android") {
      this.fingerPrintAuthAndroid();
    } else if (this.os == "ios") {
      this.biometricAuthIos();
    }
  }

  fingerPrintAuthAndroid() {
    this.androidFingerprintAuth
      .isAvailable()
      .then(result => {
        if (result.isAvailable) {
          // it is available
          this.androidFingerprintAuth
            .encrypt({
              clientId: "myAppName",
              username: "myUsername",
              password: "myPassword"
            })
            .then(result => {
              if (result.withFingerprint) {
                this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, true);
                this.registrationSuccessful();
              }
            })
            .catch(error => {
              if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, false);
              }
            });
        } else {
          // fingerprint auth isn't available redirect to settings page to set new fingerprint
          this.logger.log("Hardware available but fingerprint isnt registered");
          this.openNativeSettings.open('settings').then((res) => {
            this.logger.log('setttings settings opened (android sathi)', res);
          }, (err) => {
            this.logger.log('cant open settings');
          })
        }
      })
      .catch(error => this.logger.error(error));
  }
  biometricAuthIos() {
    console.log ("this.biometricType in biometricAuthIos" , this.biometricType);
    if (this.biometricType == undefined) {
      //send user to phone settings to set new face/fingerprint
      this.openNativeSettings.open('touch').then((res) => {
        this.logger.log('setttings settings opened', res);
      }, (err) => {
        this.logger.log('cant open settings');
      })
      this.logger.log('send user to settings page to set new face/fingerprint');
    }
    else if (this.biometricType == 'face') {
      this.cacheService.setCache(this.CONSTANT.KEY_BIOMETRIC_TYPE, 'face');
      
      this.touchId
                .verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(this.fingerPrintPopTitleMessage,// this will be shown in the native scanner popup
                this.fingerPrintPopMessage, // this will become the 'Enter password' button label
                ).then(
        res => {
          this.logger.log("Ok this is my response for ios", res);
          this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, true);
          this.registrationSuccessful();
        },
        err => {
          this.logger.error("Wroong finger print", err);
          this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, false);

          this.openNativeSettings.open('touch').then((res) => {
            this.logger.log('setttings settings opened', res);
          }, (err) => {
            this.logger.log('cant open settings');
          })
        }
      );
    }
    else if (this.biometricType == 'touch') {
      this.cacheService.setCache(this.CONSTANT.KEY_BIOMETRIC_TYPE, 'fingerprint');
      this.touchId
                .verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(this.fingerPrintPopTitleMessage,// this will be shown in the native scanner popup
                this.fingerPrintPopMessage, // this will become the 'Enter password' button label
                ).then(
        res => {
          this.logger.log("Ok this is my response for ios", res);
          this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, true);
          this.registrationSuccessful();
        },
        err => {
          this.logger.error("Wroong finger print", err);
          this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, false);

          this.openNativeSettings.open('touch').then((res) => {
            this.logger.log('setttings settings opened', res);
          }, (err) => {
            this.logger.log('cant open settings');
          })
          
        }
      );
    }
    else if (this.biometricType == undefined) {
      this.openNativeSettings.open('touch').then((res) => {
        this.logger.log('setttings settings opened', res);
      }, (err) => {
        this.logger.log('cant open settings');
      })
    }
    else {
      this.logger.log('something went wrong');
    }
  }

  registrationSuccessful() {
    this.userData['acceptFingerPrint'] = "BIO";
    this.registerService.registerProcessCompleted(this.userData).then(data => {
       
      if (data) {
        this.navCtrl.setRoot(RegistrationSuccessfulPage);
      }
    }, error => {

    });
  }
  registrationSuccessWithoutFingerprint() {
    this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED, false);
    this.navCtrl.setRoot(RegistrationSuccessfulPage);
  }
}
