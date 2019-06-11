import { DashboardFullViewAccidentPage } from '../pages';
import { LogServiceProvider } from '../../providers/data-service/log-service';
import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScbHeaderInputs } from '../../components/scb-header/scb-header';
import { PolicyDashboardServiceProvider } from '../../providers/policy-dashboard-service/policy-dashboard-service';

/**
 *@author Rajul Dixit
 */

@IonicPage()
@Component({
  selector: 'page-policy-list',
  templateUrl: 'policy-list.html',
})
export class PolicyListPage {

  data: { "policyNumberIL": any; "index": any; }[];
  callback: any;
  listOfPolicies : any[];
  policyLists:any = [];
  policyList:any;
  policyDetailsFull:any;
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  constructor(     private pdService:PolicyDashboardServiceProvider,
public logger : LogServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.headerInput.isBackButton = true;
    this.callback = this.navParams.get('callback');
    this.data = this.navParams.get('data') || [];
        this.headerInput.nav = navCtrl;
 
    this.listOfPolicies=this.navParams.get('data');
    console.log(" data from tab",this.navParams.get('data'));
  }

  ionViewDidLoad() {
    this.logger.log('ionViewDidLoad PolicyListPage');
  }

  /**
   * This method is used to retrieve policy by policy number
   */

   
  retrievePolicy(policy){
    /**
     * get call to retrieve policy by policy number
     */
    this.navCtrl.push(DashboardFullViewAccidentPage, {policy : policy});
  }

  ngOnInit(){
    this.data = this.navParams.get('data') || [];
this.policyLists = this.data;

    // this.pdService.getPolicies('1250100098947').then((res)=>{

      
    //   this.policyList=res;
    //   this.policyLists =  this.policyList.policies;
    //   console.log( "response from policyList service ", this.policyList );

      
   

    
    //   // this.pdService.getPolicyByPolicyNumber('40000408').then((res)=>{
    //   //   this.policyDetailsFull=res;
        
    //   //   console.log( "response from PolicyByNumber service ",  this.policyDetailsFull );
       
    //   // });
    // });
  }


  // got back to detail page

  getbackdetail(policyNumberIL,index){
    this.data = [
      {
        "policyNumberIL":policyNumberIL,
        "index" : index
      }
    ]
    this.callback(this.data).then( () => { this.navCtrl.pop() });
  }
}
