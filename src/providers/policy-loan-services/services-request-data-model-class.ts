export class ConfirmLoanPostData{
    loanPolicies:Array<ConfirmPolicyInfo>;
    loanPayoutAccount:any;
}
export class LoanDetails{
    policyNumber:any;
    requestDate:any;
    requestType:any;
    requestChannel:any;
    deliveryMode:any;
    branchCodeSCBLife:any;
    branchCodeSCB:any;
    receivedDateBranch:any;
    receivedDateHO:any;
    remarkLine1:any = 'Loan Request via Mobile Channel';
    remarkLine2:any;
    remarkLine3:any;
    remarkLine4:any;
    loanAmountRequired:any;
    mobileNumber:any;
    otpReference:any;
    otpCode:any;
    otpDateTime:any;
    loanInterestRate:any;
    maxPolicyLoanAmount:any;
    preferPayoutMethod:any;
    preferPayoutBank:any;
    loanPayoutAccount:any;
}
export class SubmitLoanPostdata{
    loanDetails:Array<LoanDetails> = [];
    totalAvailedLoanAmount:any;
    totalAvailedLoanAmountWithStampDuty:any;
    stampDuty:any;
}
export class IndividualPolicyInformation{
    policyNumber:any;
    loanInterestRate:any;
    loanAmountRequired:any;
    loanAmount:any;
    preferPayoutMethod:any;
    preferPayoutBank:any;
    policyNumberIL:any;
    cashValue: any;
    preferPayoutBankAccount:any;
    preferPayoutDefaultPayee:any;
    indicatorMIB:any;
    premiumStatusAllowed:any;
    outstandingLoan:{
    policyLoanAmount: any,
    outstandingLoanInterest: any,
    outstandingAPL: any,
    outStandingAPLInterest: any,
    loanInterestRate: any;
    reason:any;
    }
}
export class FilteredLoanData{
    eligibleLoanPolicies:Array<IndividualPolicyInformation>;
    nonEligibleLoanPolicies:Array<IndividualPolicyInformation>;
    isEmailVerify:boolean;
    totalLoanAmount:any;
    email:any;
    loanPayoutAccount:any;
    totalAvailedLoanAmountWithStampDuty: any;
    totalAvailedLoanAmount: any;
    stampDuty: any;
}
export class ConfirmPolicyInfo{
    policyNumber:any;
    loanInterestRate:any;
    maxPolicyLoanAmount:any;
    loanAmountRequired:any;
}