import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ForgotPinPage, EnterOtpPage } from "../pages";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { BaseApp } from '../../app/base';
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
/**
 * Generated class for the WrongPinPopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wrong-pin-popup',
  templateUrl: 'wrong-pin-popup.html',
})
export class WrongPinPopupPage extends BaseApp implements OnInit{
  
  @Output() forgotPinFunction = new EventEmitter();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private cacheService: CacheServiceProvider,
    public modalCTRL : ModalServiceProvider,) {
      //calling super
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WrongPinPopupPage');
  }

  ngOnInit() {

  }

  dismissModal(){
    this.navCtrl.pop();
    // this.modalCTRL.dismissModal();
  }
  setPin(){
    let data = {
      type: "forgotPin",
    }

    this.cacheService.getCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER).then(
      res => {
        //response will come as true or false
        console.log('res for isscbcustomer flag is:', res);
        if (res == true) {
          data['isSCBCustomer'] = true
          this.navCtrl.push(ForgotPinPage, { "data": data });
        }
        else {
          data['isSCBCustomer'] = false
          this.navCtrl.push(EnterOtpPage, { "data": data });
        }
      },
      err => {
        console.log("Error: cache not set")
        data['isSCBCustomer'] = true
          this.navCtrl.push(ForgotPinPage, { "data": data });
      }
    )
  }
}
