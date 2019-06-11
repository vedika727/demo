import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { TabsPage} from './../pages';


/**
 * @author Sumit Lokhande
 * @description This file contains functions related to thank-you page
 */


@IonicPage()
@Component({
  selector: 'page-thank-you',
  templateUrl: 'thank-you.html',
})
export class ThankYouPage {
  data: any;
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.data=this.navParams.get("data")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankYouPage');
  }
  toHomePage(){
    this.navCtrl.setRoot(TabsPage);
  }

}
