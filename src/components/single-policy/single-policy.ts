import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

/**
 * Generated class for the SinglePolicyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'single-policy',
  templateUrl: 'single-policy.html'
})
export class SinglePolicyComponent implements OnInit {
  totalLoanAmount: any;
  totalLoanAmountWithoutDecimals: any;
  totalLoanAmountArray: any;
  loanAmountRequired: number;

  loanEligibilityAmount: string;
  singleLoan: FormGroup;
  text: string;
  @Input('PolicyLoanDetails') PolicyLoanDetails:any
  @Input('ThaiDate') ThaiDate:any
  @Output() submitPage = new EventEmitter();
  @Output() toPolicyDetails = new EventEmitter();
  constructor(public fb: FormBuilder,) {
    this.loanEligibilityAmount = '1,000 - '
    
  }
  ngOnInit(): void {
    console.log("PolicyLoanDetails",this.PolicyLoanDetails)
    this.singleLoan = this.fb.group({
      loanAmount: [
        "",
        [
          Validators.required,
          Validators.max(this.PolicyLoanDetails.loanAmount)
        ]
      ],
    });
    debugger;
    this.totalLoanAmountArray= this.PolicyLoanDetails.loanAmount.toString();
    this.totalLoanAmount=this.totalLoanAmountArray.replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    // this.totalLoanAmount=this.totalLoanAmountWithoutDecimals + this.totalLoanAmountArray[1];
  }

  submissionPage(){
    console.log(this.singleLoan.controls.loanAmount.value)
    let loanAmount=this.singleLoan.controls.loanAmount.value
    this.loanAmountRequired=Number(loanAmount)
    this.submitPage.emit(this.loanAmountRequired);
  }

  policyDetails(){
    this.toPolicyDetails.emit();
  }

}
