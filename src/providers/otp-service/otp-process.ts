import { BaseApp } from './../../app/base';
import { LogServiceProvider } from '../data-service/log-service';
import { routes } from "./../../common/constants/http-routes/routes.const";
import { Injectable } from "@angular/core";
import { HttpServiceProvider } from "../data-service/http-service";
import { AppErrorHandler } from "../../common/errors/errorHandler";

/**
 * @author Kundan Patil
 * @description Use for requset OTP and validate Process .
 */
@Injectable()
export class OtpServicesProvider extends BaseApp {
  subUrl: any;
  public otpResponse: any = {};
  verifyEmail: string;

  constructor(
    private xhr: HttpServiceProvider,
    private errorHandler: AppErrorHandler,
    private logger: LogServiceProvider
  ) {
    super();
    this.verifyEmail = "verifyEmail";
  }

  sendOTP(mobilenumber: string) {
    return this.generateOTP({ const: "sendOtp", urlData: mobilenumber, requestfor: "mobileno" })
  }

  sendEmailOTP(email: string) {
    return this.generateOTP({ const: "mailOtp", urlData: email, requestfor: "email" })
  }
  /**
   * 
   * @param otpRequestId this service is for request otp wheater is mobile number or email
   * @description requesting OTP from server
   */
  private generateOTP(otpConfig: any) {
    var promise;
    try {
      promise = new Promise((resolve, reject) => {
        var httpConfig = routes[otpConfig["const"]];
        this.xhr
          .httpGet(httpConfig.url + otpConfig.urlData, httpConfig.header)
          .then((data: any) => {
            if (!this.otpResponse.hasOwnProperty("recipient")) {
              this.otpResponse = data.result;
            }
            otpConfig.requestfor === "email" ? this.otpResponse["email"] = otpConfig.urlData : "";
            this.otpResponse["otpCode"] = data.result["otpCode"];
            this.otpResponse["refCode"] = data.result["refCode"];
            this.otpResponse["recipient"] = otpConfig.urlData;
            resolve(this.otpResponse);
          }, error => {
            reject(error);
            throw new Error(error);
          });
      });
    } catch (error) {
      this.errorLog(error);
    } finally {
      return promise;
    }
  }

  /**
   * 
   * @param otpCode otp code to validate
   * @param callFrom  call from is for whenever call from my account need to send extra parameter 
   *  to generate fitsense related stuff
   */
  validateOTP(otpCode, callFrom?: any) {
    var bodydata = {
      otpCode: otpCode
    };
    // by mail their will be no recipient
    if (this.otpResponse) {
      if (!this.otpResponse.hasOwnProperty("recipient")) {
        this.otpResponse.recipient = this.otpResponse["email"];
      }
      bodydata["recipient"] = this.otpResponse.recipient;
      bodydata["refCode"] = this.otpResponse.refCode;
    }
    if (callFrom) {
      if (callFrom.hasOwnProperty("type")) {
        if (callFrom.type == "myAccount" || callFrom.type == "emailVerification") {
          console.log(callFrom.type, "callFrom.type")
          bodydata["type"] = this.verifyEmail;
        }
      }
    }

    return new Promise((resolve, reject) => {
      this.xhr.httpPost(routes.verifyOtp.url, bodydata).then((res: any) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }

  setOptions(setRegisterationOTPconfig) {
    this.otpResponse = setRegisterationOTPconfig;
  }

  resendOTP() {
    if (this.otpResponse.hasOwnProperty("mobileno")) {
      return this.sendOTP(this.otpResponse.mobileno);
    } else if (this.otpResponse.hasOwnProperty("email")) {
      return this.sendEmailOTP(this.otpResponse.email);
    }
  }
  errorLog(error?) {
    this.errorHandler.handleError(error);
  }
}
