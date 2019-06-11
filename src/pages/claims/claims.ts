import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";

@IonicPage()
@Component({
  selector: 'page-claims',
  templateUrl: 'claims.html',
})
export class ClaimsPage {
  headerInputs = new ScbHeaderInputs();
  dataForClaimsHistory: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataForClaimsHistory = {
        a:'',
        b:'',
        c:'',
        d:''
    }
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClaimsPage');
  }

}
