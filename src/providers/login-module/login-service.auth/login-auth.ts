import { DeviceInfoServiceProvider } from './../../deviceInfo-service/deviceInfo-service';
import { Injectable } from "@angular/core";
import { routes } from "../../../common/constants/http-routes/routes.const";
import { ISprintService } from '../../isprint-service/isprint';
import { encrytionType, loginModuleType } from '../../../common/constants/config';
import { CacheServiceProvider } from "../../ion-service/cache-service";
import { LogServiceProvider } from "../../../providers/data-service/log-service";
import { ENV } from '../../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { HttpErrorHandler } from "../../../providers/base-api-integration/http-error-handler.service";
import { BaseApiService } from "../../../providers/base-api-integration/baseapi.service";
import { IServiceResponse } from "../../../common/service-models/iServiceResponse";
import { LoadingServiceProvider } from "../../../providers/ion-service/loading-service";

@Injectable()
export class LoginAuthProvider extends BaseApiService {
    authType: any;
    pinCode: any;
    preauthResponse: {};
    isSCBcustomer: any;

    constructor(
        private iSprint: ISprintService,
        private cacheService: CacheServiceProvider,
        private logger: LogServiceProvider,
        private deviceInfoService: DeviceInfoServiceProvider,
        public http: HttpClient,
        public httpErrorHandler: HttpErrorHandler,
        public loadingService: LoadingServiceProvider
    ) {
        super(http, httpErrorHandler);
    }

    authenticateUser(pinCode, authType, serviceResponse?: IServiceResponse<any>) {
        this.setNetworkOperation(serviceResponse, "LOGIN");
        this.pinCode = pinCode;
        this.authType = authType;
        this.cacheService.getCache(this.CONSTANT.KEY_LOGGED_IN_USER_DETAILS).then((res: any) => {
            this.isSCBcustomer = res.isScblifeCustomer;
            this.getpreAuthData(serviceResponse, this.authType);
        }, (err) => {
            this.logger.log('err', err);
        });
    }

    getUserNameAndAuth(parentServiceResponse: IServiceResponse<any>, authDetails) {
        authDetails["username"] = this.deviceInfoService.getDeviceID();
        this.validateUserWith(parentServiceResponse, authDetails)
    }

    private getCacheValue() {
        return this.cacheService.getCache(this.CONSTANT.DEVICEID_AND_RANDOM_SIX_DIGIT_NUMBER);
    }

    getEncrytedText(e2ssid, pk, serverRandom, oldPlaintText, oaep_hash) {
        return this.iSprint.encryptPassword(e2ssid, pk, serverRandom, oldPlaintText, oaep_hash);
    }

    private validateUserWith(parentServiceResponse: IServiceResponse<any>, authDetails) {
        //debugger
        this.setNetworkOperation(this.verifyPinResponse, "VERIFY_PIN");
        let headers = {};
        headers["oauth-client-id"] = ENV.oAuthClientID;
        headers["oauth-client-secret"] = ENV.oAuthClientSecret;
        this.verifyPinResponse.parentServiceResponse = parentServiceResponse;
        this.post(routes.login.url, this.verifyPinResponse, authDetails, headers)
    }

    getpreAuthData(parentServiceResponse?: IServiceResponse<any>, authType?) {
        //debugger;
        this.setNetworkOperation(this.preAuthResponse, "PRE_AUTH_");
        this.preAuthResponse.parentServiceResponse = parentServiceResponse;
        let preauthData = {
            "loginModuleId": "E2EEPIN"
        };
        // Default authType is pin it only change to BIO when having param BIO
        if (authType != "") {
            preauthData["loginModuleId"] = loginModuleType[authType];
        }
        this.post(routes.preAuthentication.url, this.preAuthResponse, preauthData)

    }

    preAuthResponse = <IServiceResponse<any>>{
        success: (data: any) => {
            //debugger;
            console.log(data, "pre auth response");
            // return new Promise((resolve, reject) => {
            let res = data.result
            let pk = res.params.pubKey;
            let serverRandom = res.params.serverRandom;
            var chalengeToken = res.challengeToken;
            let e2ssid = res.params.e2eeSid;
            var authDetails = {
                "challengeToken": chalengeToken,
                "realmId": loginModuleType[this.authType]
            };
            // Pin is available for both non and scb customer to login ..
            if (this.authType == "PIN") {
                this.getEncrytedText(e2ssid, pk, serverRandom, this.pinCode, encrytionType).then((res: any) => {
                    authDetails["password"] = res;
                    this.getUserNameAndAuth(this.preAuthResponse.parentServiceResponse, authDetails)
                });
            } else {
                this.getCacheValue().then((response: any) => {
                    console.log("login random num pass", response);
                    this.getEncrytedText(e2ssid, pk, serverRandom, response, encrytionType).then(res => {
                        authDetails["password"] = res;
                        this.getUserNameAndAuth(this.preAuthResponse.parentServiceResponse, authDetails)
                    });


                }, error => {
                    // reject(error);
                });
            }
            // });
        },
        fail: (errorService) => {
            //debugger;
            this.preAuthResponse.parentServiceResponse.fail(errorService);
        },
        systemFailure: (errorService) => {
            //debugger;
            this.preAuthResponse.parentServiceResponse.systemFailure(errorService);
        },
        progress: (isProgress) => {


            this.preAuthResponse.parentServiceResponse.progress(isProgress);
        }
    }
    verifyPinResponse = <IServiceResponse<any>>{
        success: (data: any) => {
            //debugger
            // console.log(data instanceof Customer ? "Response is in Customer Format" : "Response is NOT in Customer Format");
            console.log("verifyPinResponse objcet : ", data);
            this.deviceInfoService.bearerToken = data.result.token_type + " " + data.result.access_token;
            this.logger.log('bearer token ', this.deviceInfoService.bearerToken);
            console.log('then block of httpService for login>>>');
            this.verifyPinResponse.parentServiceResponse.success(data);
        },
        fail: (errorService) => {
            //debugger
            console.log("verifyPinResponse Error - ", errorService)
            this.logger.log("error.error.status.code", errorService);
            this.verifyPinResponse.parentServiceResponse.fail(errorService);
            //Condition to check if user has registered on new device and this device is no longer active
            //   if (error.error.status.code == "1012") {
            //     this.modalService.presentModal(DeviceAlreadyRegisteredPromptPage);
            //     console.log("User has been activated on a new device");
            //   }

        },
        systemFailure: (errorService) => {
            this.verifyPinResponse.parentServiceResponse.systemFailure(errorService);
        },

        progress: (isProgress) => {
            console.log("verifyPinResponse Progress:", isProgress);
            this.loadingService.isLoading(isProgress);
        }
    }

}

