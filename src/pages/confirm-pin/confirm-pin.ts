/**
 * @author Vedika Bangre
 * @description Confirm Pin Page
 */

import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { SharedataProvider } from "../../providers/sharedata/sharedata";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { Platform } from "ionic-angular";
import { TouchID } from "@ionic-native/touch-id";
import { RegistrationServivceProvider } from '../../providers/registration-service/registration-service';
import { BaseApp } from '../../app/base';

@IonicPage()
@Component({
  selector: "page-confirm-pin",
  templateUrl: "confirm-pin.html"
})
export class ConfirmPinPage extends BaseApp{
  confirmPin: string;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  count: number;
  setEmptyArray: boolean;
  sendObject: any[];
  pinNotMatchedFlag: boolean;
  errorMsg: boolean;
  label1: string;
  header: string;
  checkPin: any;
  pin: string;
  arrayOfNumbers: any;
  page: string;
  whichPageToNavigate: string;
  biometricType:string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sharedataservice: SharedataProvider,
    private androidFingerprintAuth: AndroidFingerprintAuth,
    private cacheService: CacheServiceProvider,
    private platform: Platform,
    private touchId:TouchID,
    private registerService:RegistrationServivceProvider
  ) {
    super();
    this.checkPin = navParams.get("pin");
    this.header = "login.confirm";
    this.label1 = "login.confirmThe6DigitPinNumber";
    this.arrayOfNumbers = [];
    this.pin = "";
    this.page = "";
    this.pinNotMatchedFlag = false;
    this.setEmptyArray = false;
    this.count = 3;
    this.headerInput.isBackButton = true;
    this.headerInput.nav = this.navCtrl;
  }

  ionViewDidLoad() {
    this.page = this.navParams.get("flow");
    if (this.page == "Login") {
      this.whichPageToNavigate = "SetNewpinSuccessfulLoginPage";
    } else {
      this.androidFingerprintAuth.isAvailable().then(
        result => {
          console.log("the result is", result);
          if (result.isHardwareDetected) {
            this.whichPageToNavigate = "SetFingerprintPage";
          } else {
            this.whichPageToNavigate = "RegistrationSuccessfulPage";
            this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED,false);
          }
        },
        err => {
          this.whichPageToNavigate = "RegistrationSuccessfulPage";
          this.cacheService.setCache(this.CONSTANT.KEY_IS_BIO_ENABLED,false);
        }
      );
      if (this.platform.is("ios")) {
        this.whichPageToNavigate = "SetFingerprintPage";
        this.touchId.isAvailable().then((res)=>{
          this.biometricType = res;
          console.log(this.biometricType);
        },(err)=>{
          console.log(err);
        })
      }
    }
  }

  /**
   * @description This will push and pop the number on button click
   * @param number
   */
  keypadButtonPress(number) {
    if (number != -1) {
      this.arrayOfNumbers.push(number);
      if (this.arrayOfNumbers.length == 6) {
        for (let i = 0; i < 6; i++) {
          this.pin = this.pin + this.arrayOfNumbers[i];
        }
        this.confirmPin = this.pin;
        if (this.confirmPin == this.checkPin) {
          // Registration process complete.
          // this.registerService.registerProcessCompleted(this.confirmPin).then((data:any)=>{
            if(this.whichPageToNavigate == "SetNewpinSuccessfulLoginPage"){
              this.navCtrl.setRoot(this.whichPageToNavigate,{'data':this.biometricType});
            }
            else{
              this.navCtrl.push(this.whichPageToNavigate,{'data':this.biometricType});
            }
          // },(error:any)=>{

          // })

        } else {
          this.pinNotMatchedFlag = true;
          this.arrayOfNumbers = [];
          this.pin = "";
          this.setEmptyArray = true;
          this.sendObject = [this.setEmptyArray, this.count];
          this.sharedataservice.changeMessage(this.sendObject);
        }
      }
    } else {
      this.arrayOfNumbers.pop();
    }
  }
  /**
   * end keypadButtonPress()
   */
}
