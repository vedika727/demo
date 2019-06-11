
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
import { PolicyTabsFlags } from '../../components/pd-header-tabs/pd-header-tabs';
import { TranslateService } from 'ng2-translate';
import { PolicyLoanServicesProvider } from '../../providers/policy-loan-services/policy-loan-services';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { PolicyLoanConfirmationPage } from "../pages";
import { FilteredLoanData, ConfirmLoanPostData, ConfirmPolicyInfo } from '../../providers/policy-loan-services/services-request-data-model-class';
import { ThaiDateConversionProvider } from "../../providers/thai-date-conversion/thai-date-conversion";



/**
 * @author Keyur Joshi
 * @description ""
 */

@IonicPage()
@Component({
    selector: 'page-multiple-loan',
    templateUrl: 'multiple-loan.html',
})
export class MultipleLoanPage {
    loanData: any;
    constructor(public navCtrl: NavController,
        private translateService: TranslateService,
        private policyLoanService: PolicyLoanServicesProvider,
        private thaiDateConversion:ThaiDateConversionProvider) {
        
            this.loanData={
                "totalLoanAmount": "1,000,000",
                "LoanDetails": [
                    {
                        "policyNumber": "ABC12345123",
                        "policyNumberIL": "40196693",
                        "loanInterestRate": 8,
                        "cashValue": 2475,
                        "maxPolicyLoanAmount": 1000000,
                        "loanAmount": 1000000,
                        "preferPayoutMethod": "4",
                        "preferPayoutBank": "0140649",
                        "preferPayoutBankAccount": "SCB XXX-X-XX123-4",
                        "preferPayoutDefaultPayee": "00343029",
                        "indicatorMIB": "N",
                        "premiumStatusAllowed": "Y",
                        "outstandingLoan":
                        {
                            "policyLoanAmount": 2025,
                            "outstandingLoanInterest": 0.14,
                            "outstandingAPL": 33.38,
                            "outStandingAPLInterest": 0.04,
                            "loanInterestRate": 6
                        }
                    },
                    {
                        "policyNumber": "ABC12345456",
                        "policyNumberIL": "40196693",
                        "loanInterestRate": 7,
                        "cashValue": 2475,
                        "maxPolicyLoanAmount": 1000000,
                        "loanAmount": 1000000,
                        "preferPayoutMethod": "4",
                        "preferPayoutBank": "0140649",
                        "preferPayoutBankAccount": "SCB XXX-X-XX123-5",
                        "preferPayoutDefaultPayee": "00343029",
                        "indicatorMIB": "N",
                        "premiumStatusAllowed": "Y",
                        "outstandingLoan":
                        {
                            "policyLoanAmount": 2025,
                            "outstandingLoanInterest": 0.14,
                            "outstandingAPL": 33.38,
                            "outStandingAPLInterest": 0.04,
                            "loanInterestRate": 6
                        }
                    },
                    {
                        "policyNumber": "ABC12345789",
                        "policyNumberIL": "40196693",
                        "loanInterestRate": 6,
                        "cashValue": 2475,
                        "maxPolicyLoanAmount": 1000000,
                        "loanAmount": 1000000,
                        "preferPayoutMethod": "4",
                        "preferPayoutBank": "0140649",
                        "preferPayoutBankAccount": "SCB XXX-X-XX123-4",
                        "preferPayoutDefaultPayee": "00343029",
                        "indicatorMIB": "N",
                        "premiumStatusAllowed": "Y",
                        "outstandingLoan":
                        {
                            "policyLoanAmount": 2025,
                            "outstandingLoanInterest": 0.14,
                            "outstandingAPL": 33.38,
                            "outStandingAPLInterest": 0.04,
                            "loanInterestRate": 6
                        }
                    }
                ]
            }
    }
    
}