import { DeviceInfoServiceProvider } from './../deviceInfo-service/deviceInfo-service';
import { NETWORK_ERROR } from '../../common/constants/config';
import { CustomHttpResponse } from "./../../common/models/response.class";
import { LoadingServiceProvider } from "../ion-service/loading-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NetworkServiceProvider } from "./network-service";
import { LogServiceProvider } from "./log-service";
import { FirebaseAnalyticsService } from "../firebase-service/firebase-analytics-service";
import 'rxjs/add/operator/timeout';
import { Observable } from "rxjs/Observable";
import {ENV} from "../../environments/environment";
import { Events } from 'ionic-angular';
import * as HttpStatus from 'http-status-codes';

/**
 * @author Sandesh Uttarwar
 * @description All the Api calls will done from here
 */

@Injectable()
export class HttpServiceProvider {
  addAuthToken: boolean = true;
  //base Url will change according to build environment, e.g SIT, UAT, DEV
  baseUrl = ENV.apiEndPoint;
  // baseUrl = "http://internal-aws-elb-sit-k8s-687324875.";
  // baseUrl = "http://ec2-18-219-11-96.us-east-2.compute.amazonaws.com:8080/";
  // baseUrl = 'http://18.223.45.24:8080/';
  isMock = false;
  API_TIMEOUT = 15000;
  //Headers for SSL security
  private preHeaders: any;
  private httpOptions;
  private loadingIsOnFlag = false;

  constructor(
    private http: HttpClient,
    private networkService: NetworkServiceProvider,
    private loadingService: LoadingServiceProvider,
    private logger: LogServiceProvider,
    public deviceInfoService: DeviceInfoServiceProvider,
    private fba: FirebaseAnalyticsService,
    public events: Events
  ) {
  }

  /**
   * @description this will validate response
   */

  validateResponse(response: CustomHttpResponse) {
    // if 200 or 201 success respose.
    // if (response.status.code == 200 || response.status.code == 201) {
    return true;
    // } 
    // return false;
  }

  /**
   * @description help to generate headers dynamically
   */
  generateHeader(header?, authTokenNeetToAdd?: boolean) {
    let httpConfig: any = {
      "Content-Type": "application/json"
    };

    // httpConfig["Origin"] ="https://api-sit.sdn.scblife.co.th";
    if (this.deviceInfoService.getBearer()) {
      httpConfig["Authorization"] = this.deviceInfoService.getBearer();
    }
    // if (!authTokenNeetToAdd && authTokenNeetToAdd != undefined) {
    //   delete httpConfig["Authorization"];
    // }
    if (header) {
      Object.assign(httpConfig, header);
    }
    this.httpOptions = new HttpHeaders(httpConfig);
  }


  handleInternetConnection(resolve, reject) {

    if (!this.networkService.checkNetwork()) {
      // logging network error
      // this.loadingService.dismissLoading();
      // reject(NETWORK_ERROR);
      //TODO Remove this present model from common module and let it handle by respective functionality.
      // so that it will have full control over UI
      return false;
    }
    return true;

  }

  checkValidResponse(res: CustomHttpResponse, resolve, reject) {
    this.loadingService.dismissLoading();
    if (this.validateResponse(res)) {
      resolve(res);
    } else {
      reject(res);
    }
  }

  handleNetWorkError(err: any, resolve, reject) {
    this.loadingService.dismissLoading();
    this.fba.logEvent("networkError", err.name);
    reject(err);
  }




  /**
   * @param endPoint {string} - api endPoint
   * @description This method will call HttpClient's Get method to fetch data from API
   * @returns Promise
   */
  httpGet(endPoint, header?): Promise<any> {
    return this.httpRequest(endPoint, null, header);
  }

  httpPost(endPoint: string, body: any, header?): Promise<any> {
    return this.httpRequest(endPoint, body, header,'post');
  }

  httpPut(endPoint: string, body: any, header?): Promise<any> {
    return this.httpRequest(endPoint, body, header, 'put');
  }

  httpRequest(endPoint: string, body: any, header?, method?: string): Promise<any> {
    console.log('http request called');
    this.loadingService.presentLoading();
    return new Promise((resolve, reject) => {
      //  
      //this if condition will check if network connectivity is available and then make http calls.

      let scbRequest: Observable<any>;

      if (this.handleInternetConnection(resolve, reject)) {
        this.generateHeader(header);
        this.deviceHttpRequest(endPoint, body, header, method)
          .subscribe((res: CustomHttpResponse) => {
            //  
            this.checkValidResponse(res, resolve, reject);
          },
            (err: any) => {
              // var errorMsg=err.error.status.message
              this.handleNetWorkError(err, resolve, reject);
            }
          )

      } else {
        this.loadingService.dismissLoading(); // TODO TEMP
        this.logger.debug("Showing error near TODO Temp");
        reject(NETWORK_ERROR);
      }
    });

  }

  deviceHttpRequest(endPoint: string, body: any, header?, method?: string) {
    if (body) {
      if (method && method == 'put') {
        return this.http.put(this.baseUrl + endPoint, body, { headers: this.httpOptions })
      }
      return this.http.post(this.baseUrl + endPoint, body, { headers: this.httpOptions })
    } else {
      return this.http.get(this.baseUrl + endPoint, { headers: this.httpOptions })
    }
  }

}

