import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnterOtpPage, VerifyPhonePage } from '../pages';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';

/**
 * @author Rajul Dixit
 *
 */

@IonicPage()
@Component({
  selector: 'page-add-change-credit-card',
  templateUrl: 'add-change-credit-card.html',
})
export class AddChangeCreditCardPage {
  
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  
  ChangeCreditCard = "ChangeCreditCard";

  tAndC:boolean=false;

  currentYear:number= new Date().getFullYear();
  maximumCurrentYear:number= new Date().getFullYear() + 20;

  cardDetails : any = 
  {
    cardType:'',
    cardNumber:'',
    cardHolderName:'',
    expiryDate:''
  };
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService:LoginServivceProvider) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
  }
  addChangeCreditCard(){
    this.postCCData();
    this.getPhoneAndOtp();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddChangeCreditCardPage');
  }
  postCCData(){
  }

  isCCValid(){
    if(this.cardDetails.cardNumber!='' && this.cardDetails.expiryDate != ''){
      if(this.tAndC)
      {
        return false;
      }
      else return true;
    }
    else{
      return true;
    }
  }

  lengthValidation(event: any) {
    // let newValue = event.target.value;
    // let regExp = new RegExp('^[0-9]+$');
    // if (! regExp.test(newValue)) {
    //   event.target.value = newValue.slice(0, -1);
    // }

    var code = (event.which) ? event.which : event.keyCode;
    if ((code < 48 || code > 57) && (code > 31)) {
        return false;
    }

    this.cardDetails.cardNumber = this.numberFormatter(this.cardDetails.cardNumber.replace(/ /g,''));

    return true;
  }

  numberFormatter(value:string){
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []

    for (let i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }

    if (parts.length) {
        return parts.join(' ')
    } else {
        return value
    }
  }

  getPhoneAndOtp(){
    console.log("Get otp ",this.loginService.customerInfo);
   if(this.loginService.customerInfo.customerContacts.length>1){
     let data = {};
     data["type"] = "addCreditCard";
     data["phoneNumbers"] = [];
     data["cardDetails"] = this.cardDetails;
     this.loginService.customerInfo.customerContacts.forEach((ph)=>{
     data["phoneNumbers"].push({phoneNumber:ph.phone});
     });
     
    this.navCtrl.push(VerifyPhonePage,{data:data});
   }else{
    let data = {};
    data["type"] = "addCreditCard";
    data["cardDetails"] = this.cardDetails;
    data["phoneNumbers"] = this.loginService.customerInfo.customerContacts[0];
    this.navCtrl.push(EnterOtpPage,{data:data}); 
   }
  }

}
