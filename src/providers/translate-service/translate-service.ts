
import { BaseApp } from './../../app/base';
import { CacheServiceProvider } from './../ion-service/cache-service';
import { Injectable } from "@angular/core";
import { PushNotificationService } from '../firebase-service/push-notification-service';
import { LogServiceProvider } from "../data-service/log-service";
import { TranslateService } from 'ng2-translate';
/**
 * @author Nilesh
 * @description to convert text from typescript pages or need to do operation on text
*/

@Injectable()
export class TranslateServiceProvider extends BaseApp{

  constructor(
    private cacheService:CacheServiceProvider,
    private logger: LogServiceProvider,
    public pushNotificationService:PushNotificationService,
    public translate: TranslateService

  ) {
    super();
    this.logger.log("device info called");
  } 

  translateText(key:string){
    let currentLang = this.translate.currentLang;
    return this.translate.get(key, { currentLang: "XXX-XXX-{{lastDigits}}" });
  }
}
