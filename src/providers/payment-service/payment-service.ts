import { Injectable } from '@angular/core';
import { routes } from "./../../common/constants/http-routes/routes.const";
import { HttpServiceProvider } from "../data-service/http-service";
import { AppErrorHandler } from "../../common/errors/errorHandler";
import { LogServiceProvider } from '../data-service/log-service';
import { IServiceResponse } from '../../common/service-models/iServiceResponse';
import { ModalServiceProvider } from '../modal-service/modal-service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../base-api-integration/http-error-handler.service';
import { ToastServiceProvider } from '../ion-service/toast-service';
import { LoadingServiceProvider } from '../ion-service/loading-service';
import { BaseApiService } from '../base-api-integration/baseapi.service';
import { NoInternetPage } from '../../pages/pages';
import { IDialogButton } from 'components/generic-view/iDialog-action';
import { DeviceInfoServiceProvider } from '../deviceInfo-service/deviceInfo-service';
import { TranslateService } from 'ng2-translate';


/*
  Generated class for the PaymentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentServiceProvider extends BaseApiService {
  public stateConfig: any = {};
  constructor(
    private httpService: HttpServiceProvider,
    private errorHandler: AppErrorHandler,
    private logger: LogServiceProvider,
    public http: HttpClient,
    public httpErrorHandler: HttpErrorHandler,
    private modalService: ModalServiceProvider,
    private toastService: ToastServiceProvider,
    public loadingService: LoadingServiceProvider,
    private deviceInfoService: DeviceInfoServiceProvider,
    public translate: TranslateService
  ) {
    super(http, httpErrorHandler);
  }


  private iServiceResp = <IServiceResponse<any>>{
    success: (data: any) => {
      this.modalService.dismissModal();
      let res = data.result
      console.log("payment success : ", res);
      this.stateConfig[0] && this.stateConfig[0](res);
    },
    fail: (errorService) => {
       ;
      this.modalService.dismissModal();
      console.log("payment Response Error - ", errorService);
      this.errorHandler.handleError(errorService);
      this.stateConfig[1] && this.stateConfig[1](errorService);
      this.toastService.presentToast(errorService.resonseErrorMessage);
    },
    systemFailure: (errorService) => {
      this.modalService.dismissModal();
      console.log("payment Error system ", errorService);
      if (errorService.httpStatus == 0) {
        this.modalService.presentModal(NoInternetPage, { 'data': this.genericActionRetry });
      }
    },
    progress: (isProgress) => {
      this.modalService.dismissModal();
      console.log("payment Progress:", isProgress);
      this.loadingService.isLoading(isProgress);
    }
  }

  genericActionRetry = <IDialogButton<any>>{
    name: this.translate.instant("errors.errorButtons.tryAgain"),
    click: (data?) => {
      this.logger.debug("callback from retry");
      this.showGenericView = true;
      this.stateConfig.retryAction && this.stateConfig.retryAction.getPhonesRetry && this.stateConfig.retryAction.getPhonesRetry()
    }
  }

  getPaymentDue(policyNumber: string, successErrorHandler: any) {
    this.setNetworkOperation(this.iServiceResp, "GET_PAYMENT_DUE");
    this.stateConfig = successErrorHandler;
    this.get(routes.getPaymentDues.url + policyNumber, this.iServiceResp);
  }

  updateCreditCard(data: any) {
    var promise;
    try {
      promise = new Promise((resolve, reject) => {
        this.httpService
          .httpGet(
            routes.updateCreditCard.url + data
          )
          .then((data: any) => {
            resolve(data);
          },
            error => {
              reject(error);
              throw new Error(error);
            });
      });
    } catch (error) {
    } finally {
      return promise;
    }
  }

  acknowledgementRefId(data: any, successErrorHandler?: any) {
    this.setNetworkOperation(this.iServiceResp, "acknowledgementRefId");
    this.stateConfig = successErrorHandler;
    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.post(routes.acknowledgementRefId.url, this.iServiceResp, data, headers);
  }

  creditCardInfo(data: any, successErrorHandler?: any) {
    this.setNetworkOperation(this.iServiceResp, "GET_CREDIT_CARD_INFO");
    this.stateConfig = successErrorHandler;
    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();

    // headers["Authorization"] = "AAIgYzliMDQ3MDI3YjZlMjE5OTllMzNkMWIxZDgwODFkYzXeKMYsHi1s2ZxBaE9Vm9uxfyiq8bpV0I8xD4VmxVuZxvcr30LyiHdR_Cd2ggC_xRD367QPBD-lt6yUPLJXCcsD";
    this.post(routes.creditCardInfo.url, this.iServiceResp, data, headers);
  }

  
  getPaymentDuesByPolicyNumber(serviceResponse: IServiceResponse<any>) {
    this.setNetworkOperation(serviceResponse, "GET_POLICY_DUE_BY_NUMBER");
    // routes.getPaymentDues.header['Authorization'] =  this.deviceInfoService.getBearer();
    let headers ={};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.get(routes.getMultiplePoliciesPaymetDues.url, serviceResponse, headers);
  }

  getOutstandingLoan(serviceResponse: IServiceResponse<any>){
    this.setNetworkOperation(serviceResponse, "GET_OUTSTANDING_LOAN");
    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.get(routes.outstandingLoan.url, serviceResponse, headers);
  }

  payWithQrCode(serviceResponse: IServiceResponse<any>, data: any) {

    this.setNetworkOperation(serviceResponse, "PAY_QR_CODE");
    // routes.getPaymentDues.header['Authorization'] =  this.deviceInfoService.getBearer();
    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.post(routes.qrcode.url,serviceResponse, data, headers);
  }

  payWithCC(serviceResponse: IServiceResponse<any>, data: any) {

    this.setNetworkOperation(serviceResponse, "PAY_CC");
    // routes.getPaymentDues.header['Authorization'] =  this.deviceInfoService.getBearer();
    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.post(routes.creditCardInfo.url,serviceResponse, data, headers);

  }

  loanRepayment(serviceResponse: IServiceResponse<any>, data: any) {

    this.setNetworkOperation(serviceResponse, "LOAN_REPAYMENT");
    // routes.getPaymentDues.header['Authorization'] =  this.deviceInfoService.getBearer();
    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.post(routes.loanRepayment.url,serviceResponse, data, headers);

  }

  payWithSCBNet(serviceResponse: IServiceResponse<any>, data: any) {

    this.setNetworkOperation(serviceResponse, "PAY_SCB_NET");
    // routes.getPaymentDues.header['Authorization'] =  this.deviceInfoService.getBearer();
    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.post(routes.paymentEasy.url,serviceResponse, data, headers);

  }

  getPaymentDueByPolicyNum(serviceResponse: IServiceResponse<any>, policyNumber: any) {
    this.setNetworkOperation(this.iServiceResp, "GET_PAYMENT_DUE");

    let headers = {};
    headers["Authorization"] = this.deviceInfoService.getBearer();
    this.get(routes.getPaymentDues.url + policyNumber, serviceResponse, headers);
  }


}


