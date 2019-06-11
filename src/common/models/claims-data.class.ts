export class ClaimResponse {
    claimList: Array<{ClaimList}>
}
export class ClaimList {
    ProductName: string;
    PolicyNumber: string;
    ClaimItems: Array<any>;
    ClaimHistories: Array<{
        PlanCode: null,
        ClaimNo: string,
        ClaimType: string,
        IssueDate: string,
        AccidentDate: Date,
        HbDate: Date,
        Status: string,
        ApprovalAmount: number,
        PaymentChannel: string,
        ApprovalDate: Date,
        Stage: number,
    }>
}
