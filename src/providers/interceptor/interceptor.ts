import * as APP_CONSTANT from './../../common/constants/config';
import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor, HttpRequest,
  HttpHandler,
  HttpEvent, HttpErrorResponse, HttpResponse
} from "@angular/common/http";
import "rxjs/add/operator/timeout";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import { HeaderServiceProvider } from "./header-service";
import { DeviceInfoServiceProvider } from '../deviceInfo-service/deviceInfo-service';
import { LoginServivceAuthProvider } from '../login-module/login-service.auth/login-service-auth';
import * as HttpStatus from 'http-status-codes';
import { Events } from 'ionic-angular';
import { LogServiceProvider } from '../data-service/log-service';
import { ENV } from '../../environments/environment';


/** 
 * @author Keyur Joshi
*/
@Injectable()
export class MyHttpLogInterceptor implements HttpInterceptor {
  param;
  protected CONSTANT: any;
  private deviceId: string;
  private userAgent: string;
  constructor(
    private injector: Injector,
    private headerService: HeaderServiceProvider,
    private deviceInfo: DeviceInfoServiceProvider,
    public loginAuthService: LoginServivceAuthProvider,
    public events: Events,
    public logger: LogServiceProvider
  ) {
    this.CONSTANT = APP_CONSTANT;
    this.deviceId = this.deviceInfo.getDeviceID();
    this.userAgent = this.deviceInfo.getUserAgent();

  }

  /**
   * 
   * @param request 
   * @param next 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let customReq;

    // clone the original header object
    customReq = request.clone({
      headers: request.headers
        .set("Accept", "application/json")
        .set("Access-Control-Allow-Credentials", "true")
        .set("Access-Control-Allow-Methods", "GET, POST,PUT")
        .set("Access-Control-Allow-Headers", "X-Requested-With,content-type")
        .set("Access-Control-Allow-Origin", "*")
        .set("X-DEVICE-ID", this.deviceId)
        .set("X_DEVICE_USER_AGENT", this.userAgent)
    });
    if (this.deviceInfo.getBearer()) {
      customReq = customReq.clone({
        header: customReq.headers.set('Authorization', this.deviceInfo.getBearer())
      })
    }
    if (customReq.headers.get("oauth-client-secret")) {
      customReq = customReq.clone({
        headers: customReq.headers.delete("Authorization", customReq.headers.get('Authorization'))
      });
    }

    if (request.url.includes('/api/')) {
      customReq = customReq.clone({
        headers: customReq.headers.set("X-IBM-Client-Id", ENV.PreAuthIBMClientID)
      });
    } else {
      customReq = customReq.clone({
        headers: customReq.headers.set("X-IBM-Client-Id", ENV.GenericIBMClientID)
      });
    }

    console.log('requesr made for - ', customReq);

    return next.handle(customReq).map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        if (event.status == HttpStatus.UNAUTHORIZED || event.status == HttpStatus.FORBIDDEN) {
          this.events.publish('user:logout', event);
        }
      } else console.info('event =', event);
      return event;
    })
      .catch((err: any) => {
        console.info('Http Error Response', event);
        if (err instanceof HttpErrorResponse) {
          debugger;
          if (err.status == HttpStatus.UNAUTHORIZED || err.status == HttpStatus.FORBIDDEN) {
            this.events.publish('user:logout', event);
          }
          if (err.error.status.code == this.CONSTANT.CODE_E_USER_REGISTERED_ON_ANOTHER_DEVICE){
            this.events.publish('MULTIPLE_REGISTRATION', err.error)
          }
          return Observable.throw(err);
        }
      });
  }
}

