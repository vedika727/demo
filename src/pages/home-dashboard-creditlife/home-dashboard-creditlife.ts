import { SupportDocumentCreditlifePage } from '../pages';
import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";

/**
   * @author Rajul Dixit
   * @description Page for policy dashboard with credit life Page.
   */

@IonicPage()
@Component({
  selector: 'page-home-dashboard-creditlife',
  templateUrl: 'home-dashboard-creditlife.html',
})
export class HomeDashboardCreditlifePage {
  public  policyData: any = [];
  
  headerInputs = new ScbHeaderInputs();

  dashboardheader = {
    "title": 'PolicyDashboard',
    "icon": 'scbl-policy-dashboard'
  };
 
  policytabs: any = ['Information', 'Claim', 'Loan'];
  boolval : boolean;
  policySegment : boolean;
  creditLife  : boolean;
  constructor(public navCtrl: NavController) {
    this.headerInputs.isBackButton = true;
    this.headerInputs.nav = navCtrl;
    this.boolval = true;
    this.policySegment = true; 
    }
  /**
   * @author Rajul Dixit
   * @description This method is used to call SupportDocumentCreditlifePage
   */
   openSupportDocumentPage(){
    this.navCtrl.push(SupportDocumentCreditlifePage);
  }

  // togglePopUp(param) {
  //   this.payBtn = false;
  //   this.one = false;
  //   this.two = false;
  //   this.three = false;
  //   this.four = false;
  //   this.five = false;
  //   if (param == "one") {
  //     console.log(param);
  //     this.one = true;
  //   } else if (param == "two") {
  //     this.two = true;
  //     this.payBtn = true;
  //   } else if (param == "three") {
  //     this.three = true;
  //   } else if (param == "four") {
  //     this.four = true;
  //   }
  //   else if (param == "five") {
  //     this.five = true;
  //   }
  // }
  
  ionViewDidLoad() {
    
    this.policyData = [
      {
        id: 1223344,
        type:"credit",
        policyName: "Tresure plus 25/15",
        status: true,
        policyID: "1234",
        payoutDate: "12/12/12",
        payoutType: "Cheque",
        accountDetails: {
        cashcouponDate: "12/12/12",
        amount: "40000THB"
        },
        policyDetails: {
          policynumber: "ABCD12345678",
          status: false,
          startDate: "8 มิถุนายน 12",
          endDate: "8 มิถุนายน 20",
          cashbackDate: "12 มิถุนายน 17",
          nextPremiumDueDate: "12 มิถุนายน 18",
          annualPremium: 30000,
          cashback:3000
        }
      }
    ]
    this.creditLife = true;
    console.log('ionViewDidLoad HomeDashboardCreditlifePage');
  }

}
