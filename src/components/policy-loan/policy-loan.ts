import { Component, Input, OnInit } from '@angular/core';
import { FilteredLoanData } from '../../providers/policy-loan-services/services-request-data-model-class';

/**
 * Generated class for the PolicyLoanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'policy-loan',
  templateUrl: 'policy-loan.html'
})
export class PolicyLoanComponent implements OnInit{

  loanPayoutAccount: any;
  loanObject: any = {}
  singleLoan: boolean=true;
  @Input('loanDetails') loanDetails: FilteredLoanData;
  @Input('loanRequestDate') loanRequestDate:string;
  
  constructor() {
    this.loanRequestDate="2 มิถุนายน 61"
  }
  ngOnInit(): void {
    console.log("loan details in component ",this.loanDetails);
    this.loanDetails = this.loanDetails
  }
  ionViewDidLoad(){
    // this.loanPayoutAccount = this.loanDetails.payoutAccounts.values().next().value;

  }

}
