import { Injectable } from '@angular/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';
import { Platform } from "ionic-angular";
/*
  Generated class for the EventLoggerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseAnalyticsService {

  constructor(private fba: FirebaseAnalytics, public platform: Platform) {
    console.log('Hello EventLoggerProvider Provider');
  }

  /**
   * This function logs the events ex. Payment done
   * @param name Name of the event
   * @param value Parameters of the event
   */
  logEvent(name: string, value: any) {
    if (!this.isRunningOnDevice()) return;

    this.fba.logEvent(name, {param : value})
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      })
    console.log('log event called')
  }

  /**
   * This function  sets the user ID
   * @param id The user ID
   */
  setUserId(id: any) {
    if (!this.isRunningOnDevice()) return;

    this.fba.setUserId(id)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  /**
   * This function sets the properties pertaining to user ex. Favorite Food
   * @param name Property name
   * @param value Property value
   */
  setUserProperty(name: string, value: any) {
    if (!this.isRunningOnDevice()) return;

    this.fba.setUserProperty(name, value)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  /**
   * This function sets whether analytics collection is enabled for this app on this device
   * @param enabled Flag to set the status of analytics
   */
  setEnabled(enabled: boolean) {
    if (!this.isRunningOnDevice()) return;
    
    this.fba.setEnabled(enabled)
      .then((result: any) => {
        console.log(result);
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  /**
   * This function sets the current screen name, which specifies the current visual context in your app. 
   * This helps identify the areas in your app where users spend their time and how they interact with your app.
   * @param name The name of the screen
   */
  setCurrentScreen(name: string) {
    if (!this.isRunningOnDevice()) return;
    
    this.fba.setCurrentScreen(name)
        .then((result: any) => {
          console.log(result);
        })
        .catch((error: any) => {
          console.log(error);
        })
  }

  /**
  * @description- o identify if platform is cordova if so,it is running on a physical device
  */
  private isRunningOnDevice(): boolean {
    // // 
    let isAvailable: boolean = false;
    if (this.platform.platforms().indexOf('cordova') >= 0) {
      isAvailable = true;
    }
    console.log('physical device:=' + isAvailable);
    return isAvailable;
  }
}
