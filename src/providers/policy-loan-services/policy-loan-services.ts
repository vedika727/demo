import { Injectable } from "@angular/core";
import { HttpServiceProvider } from "../data-service/http-service";
import { routes } from "../../common/constants/http-routes/routes.const";
import { FilteredLoanData, IndividualPolicyInformation, ConfirmLoanPostData, SubmitLoanPostdata } from "./services-request-data-model-class";
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { BaseApiService } from "../base-api-integration/baseapi.service";
import { HttpClient } from "@angular/common/http";
import { HttpErrorHandler } from "../base-api-integration/http-error-handler.service";
import { DeviceInfoServiceProvider } from "../deviceInfo-service/deviceInfo-service";
import { GetAvailableLoan } from "../../common/models/get-available-loan.class";

@Injectable()
export class PolicyLoanServicesProvider extends BaseApiService {
    selectedPolicy: IndividualPolicyInformation;
    singlePolicyData: any;

    loanSubmissionData: SubmitLoanPostdata;
    filteredData: FilteredLoanData;
    confirmData: ConfirmLoanPostData;
    loan: any;
    getAvailableLoanData: any;
    confirmLoanData: any;
    submitLoanData: any;
    filteredLoanData: FilteredLoanData;
    policyInfo: IndividualPolicyInformation;
    allData: any;
    constructor(private httpService: HttpServiceProvider,
        http: HttpClient,
        httpErrorHandler: HttpErrorHandler,
        private deviceInfoService: DeviceInfoServiceProvider) {
        super(http, httpErrorHandler);
    }


    // Http GET method
    getAvailableLoan(serviceResponse: IServiceResponse<any>) {

        // if(serviceResponse){  
        let headers = {};
        headers["Authorization"] = this.deviceInfoService.getBearer();
        this.setNetworkOperation(serviceResponse, "GET_AVAILABLE_LOAN");
        this.get(routes.getAvailableLoan.url, serviceResponse, headers);
        // }
        //if directly navigating into single/multiple loan page
        // else{
        //      serviceResponse.success(this.filteredData);
        // } 

    }
    // Http POST method   
    confirmLoan(serviceResponse: IServiceResponse<any>, confirmLoanData: ConfirmLoanPostData) {
        let headers = {};
        headers["Authorization"] = this.deviceInfoService.getBearer();
        this.setNetworkOperation(serviceResponse, "CONFIRM_LOAN");
        this.post(routes.confirmLoan.url, serviceResponse, confirmLoanData, headers);
        // serviceResponse.success(this.confirmLoanData);
    }
    // Http post method
    submitLoan(serviceResponse: IServiceResponse<any>, submitLoanData: SubmitLoanPostdata) {
        let headers = {};
        headers["Authorization"] = this.deviceInfoService.getBearer();
        this.setNetworkOperation(serviceResponse, "SUBMIT_LOAN");
        this.post(routes.submitLoan.url, serviceResponse, submitLoanData, headers);
        // serviceResponse.success(this.submitLoanData);
    }

    filterData(loansDummyObj: GetAvailableLoan) {
        debugger
        console.log("loansDummyObj", loansDummyObj)
        let loanData = new FilteredLoanData();
        loanData.eligibleLoanPolicies = new Array<IndividualPolicyInformation>();
        loanData.isEmailVerify = loansDummyObj.isEmailVerify;
        loanData.email = loansDummyObj.email;
        loanData.totalLoanAmount = loansDummyObj.totalLoanAmount;
        loansDummyObj.eligibleLoanDetails.forEach((policyInfo) => {
            let obj = new IndividualPolicyInformation();
            obj = <IndividualPolicyInformation>policyInfo;
            loanData.eligibleLoanPolicies.push(obj);
        });
        if (loansDummyObj.nonEligibleLoanDetails) {
            loanData.nonEligibleLoanPolicies = new Array<IndividualPolicyInformation>();
            loansDummyObj.nonEligibleLoanDetails.forEach((policyInfo) => {
                loanData.nonEligibleLoanPolicies.push(policyInfo);
            });
        }



        return loanData;
    }
    getSelectedPolicy() {
        return this.selectedPolicy;
    }
    setSelectedPolicy(policy: IndividualPolicyInformation) {
        console.log("Policy in service ", policy);
        this.selectedPolicy = policy;
    }
    setFilteredData(data: any) {
        this.filteredData = data;
    }

    getFilteredData() {
        return this.filteredData;
    }


    setSubmissionData(data: SubmitLoanPostdata) {
        this.loanSubmissionData = data;
    }

    getSubmissionData() {
        return this.loanSubmissionData;
    }

    getAllData() {
        return this.allData;
    }
    setAllData(data) {
        this.allData = data;
    }

    // This function is used to set the single policy flag for dashboard full view
    setPolicyData(obj: any) {
        this.singlePolicyData=obj;
    }
    getPolicyData() {
        return this.singlePolicyData;
    }
}


