export class SubmitLoanResponse {
    loanDetails: Array<IndividualPolicyInfo>;
    loanPayoutAccount: any;
    totalAvailedLoanAmount: any;
    totalAvailedLoanAmountWithStampDuty:any;
    stampDuty: any;
}
export class IndividualPolicyInfo{
    transactionNumber:any;
    policyNumber: any;
    loanInterestRate:any;
    maxPolicyLoanAmount:any;
    loanAmountRequired:any;
}