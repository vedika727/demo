import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { ModalServiceProvider } from '../../providers/modal-service/modal-service';
import { Screenshot } from '@ionic-native/screenshot';
/**
 * Generated class for the PayslipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payslip',
  templateUrl: 'payslip.html',
})
export class PayslipPage {

  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  screen: any;
  state: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams , public modalCtrl:ModalServiceProvider,private screenshot: Screenshot) {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
   
  }
  reset() {
    var self = this;
    setTimeout(function(){ 
      self.state = false;
    }, 1000);
  }
  screenShot() {
    this.screenshot.save('jpg', 80, 'myscreenshot.jpg').then(res => {
      this.screen = res.filePath;
      this.state = true;
      this.reset();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayslipPage');
  }

  paymentRoyalty(){
    this.navCtrl.push('PaymentSucessfulRoyaltyPage')
  }

}
