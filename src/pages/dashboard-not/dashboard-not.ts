import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { PolicyTabsFlags } from '../../components/pd-header-tabs/pd-header-tabs';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { BaseApp } from '../../app/base';

/**
 * Generated class for the DashboardNotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard-not',
  templateUrl: 'dashboard-not.html',
})
export class DashboardNotPage extends BaseApp implements OnInit {
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();
  PolicyTabsFlagsinputs: PolicyTabsFlags = new PolicyTabsFlags();
  isHalf:any = true;
  dashboardheader = {
    "title": 'PolicyDashboard',
    "icon": 'scbl-policy-dashboard'
  }
  policytabs: any = ['Information', 'Claim', 'Loan'];
  isRegistered:any;
  isSCBCustomer:any;
  piechartAPIData: any = [];
  currenttabname:any;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private cacheService: CacheServiceProvider) {
      super();
    this.headerInput.nav = navCtrl;
    this.headerInput.isProfile = true;
    this.headerInput.isNotification = true; 
    this.PolicyTabsFlagsinputs.iconhideflag = true;
    this.currenttabname = "Information";
  
  }
  ngOnInit() {
    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got is Registered', res);
      console.log('Type of reg Flag', typeof (res));

      this.isRegistered = res;
    }, (err) => {
       ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isRegistered = err;
    })


    this.cacheService.getCache(this.CONSTANT.KEY_IS_SCB_CUSTOMER).then((res) => {
      console.log('got is isSCBCustomer', res);
    
      this.isSCBCustomer = res;
    
    }, (err) => {
       ;
      console.log('DIDNT GET isregesiterd', err);
      // this.isSCBCustomer = err;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardNotPage');
  }

  changetab(evt) {
    this.currenttabname = evt;
  }


  ionViewDidEnter(){
    this.currenttabname = "Information";
  }

}
