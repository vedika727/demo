import { IonicPage, NavController } from "ionic-angular";
import {TabsPage } from "../pages";
import { Component } from "@angular/core";
import { FirebaseAnalyticsService } from "../../providers/firebase-service/firebase-analytics-service";
import { RegistrationProcessProvider } from "../../providers/registration-process-service/registration-process";
import { BaseApp } from '../../app/base';

/**
 * @author Kundan Patil
 * @description  Splash Screen 
 */

@IonicPage()
@Component({
  selector: "page-splash-screen",
  templateUrl: "splash-screen.html"
})
export class SplashScreenPage extends BaseApp {
  progressCounter: any = 1;
  userAppState: boolean = false;
  headerConfi = {
    isBackBtnActive: false
  };
  constructor(
    public navCtrl: NavController,
    private RegistrationProcessProvider: RegistrationProcessProvider,
    public FirebaseAnalyticsService: FirebaseAnalyticsService) {
    // Iniaite SuperApp.
    super();

    this.checkifAppOpensFirstTime();
    var progressCount = setInterval(() => {
      this.progressCounter = this.progressCounter + 1;
      if (this.progressCounter == 100) {
        clearInterval(progressCount);
        if (!this.userAppState) {
          // this.navCtrl.setRoot(OnboardingScreenPage);
          this.navCtrl.setRoot(TabsPage);
        } else {
          // var state = this.getCacheValue(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED);
          // state.then(
          //   (res: any) => {
          //     // //// ;
          //     if (res == true) {
          //       this.navCtrl.setRoot(LoginPage);
          //     } else {
          //       this.navCtrl.setRoot(RegisterUserPage);
          //     }
          //   },
          //   res => {
          //     this.navCtrl.setRoot(RegisterUserPage);
          //   }
          // );
        }
      }
    }, 20);

    this.FirebaseAnalyticsService.setCurrentScreen("SplashScreenPage");
  }

  getCacheValue(key: string) {
    return new Promise((resolve, reject) => {
      var state = this.RegistrationProcessProvider.getValue(key);
      state.then(
        (res: any) => {
          resolve(res);
        },
        res => {
          reject(res);
        }
      );
    });
  }
  checkifAppOpensFirstTime() {
    var state = this.getCacheValue(this.CONSTANT.KEY_IS_FIRST_TIME);
    state.then((res: any) => {
      if (res == true) {
        this.userAppState = true;
      } else {
        this.userAppState = false;
      }
    });
  }
}
