export class PaymentDetails{
    policyPaymentDetails:PolicyDetails[] = new Array(0);
    paymentMethod:string;
    amount:any;
}


export class PolicyDetails{
    policyNumber:string;
    dueDate:string;
    amountDue:number;     
}