export class PaymentDueDetails{
   
    totalPaymentDue: number;
    paymentDueList: PaymentDue[];
}

export class PaymentDue{

    policyNumber: string;
    payments: {
        paymentAmount: number,
        dueDate: string,
        paymentType: string,
        paymentMode: string,
        paymentOverDue:boolean
    };
    paymentDetails:{
        cardNumber: string
    };

}