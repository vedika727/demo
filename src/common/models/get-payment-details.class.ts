export class GetPaymentDetails{
    paymentDueList: {
        policyNumber: string,
        totalPaymentDue: number,
        payments: {
            paymentAmount: number,
            dueDate: string,
            lastPaidAmount:number,
            paymentType: string,
            paymentMode: string,
            autoRecurring: boolean
        },
        paymentDetails: {
            paymentDetailsId: number,
            cardNumber: string,
            accountNumber: any,
            expirationDate: any,
            bankName: any,
            accountHolderName: any,
            cardHolderName: any,
            paymentType: any,
            bookletCopy: any,
            replaceCurrentCard: boolean
        }
    };
}