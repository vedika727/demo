export class GetPolicyInformation{
    policy: {
        policyNumber: string,
        policyNumberIL: string,
        policyNextDueDate: string,
        policyPremium: number,
        policyPaymentDuration: number,
        policyLastPaymentTermDate: string,
        policyMaturityDuration: number,
        policyMaturityDate: string,
        policyLastPaidAmount: number,
        policyLastPaidDate: string,
        policyType: string,
        policyIssueDate: string,
        policyEffectiveDate: string,
        policyStatus: string,
        policyName: string,
        planCode: string,
        policySumInsured: number,
        policyLastUpdated: string,
        assured: {
            assuredFirstName: string,
            assuredLastName: string
        },
        payer: {
            payerFirstName: string,
            payerLastName: string
        },
        policyAddress: {
            policyAddress: string,
            address1: string,
            address2: string,
            address3: string,
            address4: string
        },
        policyRiders: Array<
            {
                riderProductName: string,
                riderPlanCode: string,
                riderSumInsured: number,
                riderPremium: number,
                riderIssueDate: string,
                riderMaturityDuration: number,
                riderMaturityDate: string,
                riderPaymentDuration: number,
                riderPaymentTermDate: string,
                riderLastPaidDate: string,
                riderCategoryName: string,
                riderGroupName: string
            }>,
        currentCashBack: {
            cashReturn:number,
            cashNetReturnPrevious: number,
            cashNetReturnNext: number,
            cashBackDueDate: string,
            cashDateReturnPrevious: string,
            cashDateReturnNext: string,
            cashBackMethod: string,
            lastCashBackMethod: string,
            nextCashBackMethod: string
        },
        cashBacks: Array<any>;
}
}