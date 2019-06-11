import { IndividualPolicyInformation } from "../../providers/policy-loan-services/services-request-data-model-class";

export class GetAvailableLoan {
    email: string;
    isEmailVerify: boolean;
    totalLoanAmount: number;
    eligibleLoanDetails:Array<IndividualPolicyInformation>;
    nonEligibleLoanDetails:Array<IndividualPolicyInformation>;
}

