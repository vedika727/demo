import { LogServiceProvider } from "./../../data-service/log-service";
import {
  mocksendOtp,
  mockchangeEmail,
  mockcustomerInfo
} from "./../../../common/constants/http-routes/mock-routes.const";
import { HttpServiceProvider } from "./../../data-service/http-service";
import { Injectable } from "@angular/core";
import { CustomHttpResponse } from "../../../common/models/response.class";

@Injectable()
export class TestServiceProvider {
  subUrl: string;

  constructor(
    private httpService: HttpServiceProvider,
    private logger: LogServiceProvider
  ) {}

  login() {
    this.subUrl = "/login";
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(this.subUrl).then(
        (res: any) => {
          if (res.status == 200) {
            // success response from backend
            resolve(res.body);
          } else {
            //   error from backend usernot found, invalid user
            reject(res.message);
          }
        },
        err => {
          // error from http service e.g. timeout, connection err
          reject(err.message);
        }
      );
    });
  }

  getOtp(mobile) {
    this.subUrl = mocksendOtp.url + mobile;
    console.log(this.subUrl);
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(this.subUrl).then(
        (res: any) => {
          console.log("service - otp", res);
          if (this.httpService.validateResponse(res)) {
            resolve(res.result);
          } else {
            reject(res.status.message);
          }
        },
        err => {
          console.log("service - otp err", err);
          reject(err);
        }
      );
    });
  }
  // post call
  changeEmail(mail) {
    let body = {
      email: mail,
      _xyz: 1111111111111
    };

    let header = {};

    this.subUrl = mockchangeEmail.url;
    return new Promise((resolve, reject) => {
      this.httpService.httpPost(this.subUrl, body, header).then(
        (res: CustomHttpResponse) => {
          if (this.httpService.validateResponse(res)) {
            resolve(res);
          } else {
            reject(res.status.message);
          }
        },
        err => {
          reject(err.message);
        }
      );
    });
  }

  // get call
  getCustomerData() {
    this.subUrl = mockcustomerInfo.url+'/'+1111111111111;
    let header = {};
    return new Promise((resolve, reject) => {
      this.httpService
        .httpGet(this.subUrl, header)
        .then((res: CustomHttpResponse) => {
          if (this.httpService.validateResponse(res)) {
            this.logger.log(res);
            resolve(res.result);
          } else {
            this.logger.log(res.status.message);
            reject(res.status.message);
          }
        });
    });
  }
}
