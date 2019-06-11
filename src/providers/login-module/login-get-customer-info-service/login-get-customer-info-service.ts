import { LoginServivceAuthProvider } from './../login-service.auth/login-service-auth';
import { Injectable } from "@angular/core";
import { HttpServiceProvider } from "../../../providers/data-service/http-service";
import { routes } from "../../../common/constants/http-routes/routes.const";
import { LogServiceProvider } from "../../../providers/data-service/log-service";
import { HttpClient } from '@angular/common/http';
import { HttpErrorHandler } from '../../base-api-integration/http-error-handler.service';
import { BaseApiService } from '../../base-api-integration/baseapi.service';
import { IServiceResponse } from '../../../common/service-models/iServiceResponse';
import { DeviceInfoServiceProvider } from '../../deviceInfo-service/deviceInfo-service';
import { LoginServivceProvider } from '../login-service/login-service';
import { CacheServiceProvider } from '../../ion-service/cache-service';
/**
 * @author - Kundan Patil
 * @description - to get User info which us used the auth token to validate.
 */
@Injectable()
export class LoginGetCustomerInfoProvider extends BaseApiService {
  loggedInUserDetails: any = {};
  constructor(
    private httpService: HttpServiceProvider,
    private logger: LogServiceProvider,
    public http: HttpClient,
    public httpErrorHandler: HttpErrorHandler,
    public deviceInfoServ: DeviceInfoServiceProvider,
    // private getCutomerInfo: LoginGetCustomerInfoProvider,
    public loginService: LoginServivceProvider,
    public cacheService: CacheServiceProvider
  ) {
    super(http, httpErrorHandler);
  }

  /**
   * @description - This methods get logged in user data which was generated during login process.
   * @param bearerToken is the generated key from login  authentication.
   */
  getLoggedInUserInfo(bearerToken) {
    return new Promise((resolve, reject) => {
      this.httpService.httpGet(routes.getLoggedUserInfo.url).then((data: any) => {
        this.logger.log("data from restration Final Step:::::::::", data);
        resolve(data.result);
      }, error => {
        this.logger.log("error got in get customer info..", error);
        reject(error);
      });
    });
  }

  public getCustomerInfoWithAccessToken(IServiceRequest?: IServiceResponse<any>) {
    let header = { "Authorization": this.deviceInfoServ.getBearer() };
    this.get(routes.getLoggedUserInfo.url, IServiceRequest, header);
  }
}
