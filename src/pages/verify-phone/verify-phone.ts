import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EnterOtpPage } from "../../pages/pages";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

/**
 * Generated class for the VerifyPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/**
 * @author - Keyur Joshi
 * @description - This Page selects one of user's phone numbers to send otp. 
 */
@IonicPage()
@Component({
  selector: "page-verify-phone",
  templateUrl: "verify-phone.html"
})
export class VerifyPhonePage {
  maskedArr: any = [];
  phoneNumbersArr: any = [];
  otp: any;
  phone: any;
  userData: any;
  flow: any;
  headerInputs = new ScbHeaderInputs();
  verifyPhone: FormGroup;
  phoneNumbers: any;
  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private FirebaseAnalyticsService: FirebaseAnalyticsService,
    public fb: FormBuilder
  ) {
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;
    this.FirebaseAnalyticsService.setCurrentScreen("VerifyPhonePage");
    this.userData = this.navParams.get("data");
    this.phoneNumbers = this.userData.phoneNumbers;
    this.extractPhoneNumbers();
    this.verifyPhone = this.fb.group({
      phoneNum: [
        "",
        [
          Validators.required
        ]
      ]
    });
  }

  extractPhoneNumbers() {
    for (let i = 0; i < this.phoneNumbers.length; i++) {
      debugger
      let len = this.phoneNumbers[i].phoneNumber.length
      let phoneNumber = {}
      this.phoneNumbersArr.push(this.phoneNumbers[i].phoneNumber)
      let lastdigits = this.phoneNumbersArr[i].substring(len-4, len)
      let maskedNumber = "XXX-XXX-" + lastdigits
      phoneNumber['phoneNumber'] = maskedNumber
      this.maskedArr.push(phoneNumber)
    }
  }

  backBtn() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {

  }

  sendOtp() {
    debugger
    let phoneIndex = this.verifyPhone.controls['phoneNum'].value;
    this.phone = this.phoneNumbersArr[phoneIndex];
    this.userData['phoneNumbers'] = this.phone;
    this.navCtrl.push(EnterOtpPage, { "data": this.userData });
  }
  noMobile() {

  }
}
