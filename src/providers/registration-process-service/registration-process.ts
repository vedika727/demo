import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CacheServiceProvider } from "../ion-service/cache-service";
/*
  Generated class for the SharedataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
/**
 * @author Kundan Patil
 * @description Use for Splash Screen and Onboarding screen .
 */
@Injectable()
export class RegistrationProcessProvider {
  private messageSource = new BehaviorSubject<any>("");
  currentMessage = this.messageSource.asObservable();

  constructor(private cache: CacheServiceProvider) {}

  setValue(key: string, value: any) {
    this.cache.setCache(key, value);
    return true;
  }

  getValue(key: string) {
    return this.cache.getCache(key);
  }
}
