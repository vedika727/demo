import { LogServiceProvider } from '../../providers/data-service/log-service';
import { Component, Input } from '@angular/core';
import { LoginServivceProvider } from '../../providers/login-module/login-service/login-service';
import { ProfileImagePage, RegisterUserPage } from '../../pages/pages';
import { NavController } from 'ionic-angular';
import { RegistrationProcessProvider } from "../../providers/registration-process-service/registration-process";
import { BaseApp } from '../../app/base';
import { CacheServiceProvider } from '../../providers/ion-service/cache-service';
import { TranslateService } from "ng2-translate";

/**
 *@author Banti Sutar
 */
@Component({
  selector: 'home-holder',
  templateUrl: 'home-holder.html'
})
export class HomeHolderComponent extends BaseApp {

  isFitsenseRegister: any;
  public holderName: string;
  today: any;
  // stateicon:any;
  // StateIcon:any;
  @Input('in') ActivityStateIcon: any;
  messagedata: any;
  greetingmessagedata: any;

  constructor(public navCtrl: NavController,
    private RegistrationProcessProvider: RegistrationProcessProvider,
    public loginService: LoginServivceProvider,
    public logger: LogServiceProvider,
    private cacheService: CacheServiceProvider,
    public translateService: TranslateService
  ) {
    super();
    //this.stateicon = 'silver-state';
    logger.log('login user -', loginService);
    this.cacheService.getCache(this.CONSTANT.KEY_IS_FITSENSE_REGISTERED).then((res) => {
      console.log('got is Registered to fitsense', res);


      this.isFitsenseRegister = res;


    }, (err) => {
      ;
      console.log('DIDNT GET isregesiterd to fitsense', err);
      // this.isRegistered = err;
    })
    //this.StateIcon = 'state-icon1-silver';
  }
  /**
  * @author Banti Sutar
  * @description This method is used to navigate to Profile Image  page
  */
  redirect() {
    var state = this.getCacheValue(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED);
    state.then(
      (res: any) => {
        // // 
        if (res == true) {
          this.navCtrl.push(ProfileImagePage);
        } else {
          this.navCtrl.parent.parent.setRoot(RegisterUserPage);
        }
      },
      res => {
        this.navCtrl.parent.parent.setRoot(RegisterUserPage);
      }
    );
    //this.navCtrl.push(ProfileImagePage);
  }

  getgreetingMessage() {
    this.translateService.get("greetingMessages1").subscribe((data:
      any) => {
      //console.log(data);
      this.messagedata = data;
    });
    this.today = new Date().getHours();
    if (this.today >= 6 && this.today < 12) {
      return this.messagedata.daymessage6to12;
    } else if (this.today >= 12 && this.today < 18) {
      return this.messagedata.daymessage12to18;
    } else if (this.today >= 18 && this.today <= 24) {
      return this.messagedata.daymessage18to24;
    } else {
      return this.messagedata.daymessageElse;
    }
  }


  getGreetingMes2() {
    this.today = new Date().getHours();
    this.translateService.get("greetingMessages").subscribe((data:
      any) => {
      this.greetingmessagedata = data;
    });
    if (this.today >= 6 && this.today < 12) {
      if (this.ActivityStateIcon == 'Fitsense-bages-Bronze') {
        return this.greetingmessagedata.textWhenBronze6to12;
      } else if (this.ActivityStateIcon == 'Fitsense-bages-Silver') {
        return this.greetingmessagedata.textWhenSilver6to12;
      } else if (this.ActivityStateIcon == 'Fitsense-bages-Gold') {
        return this.greetingmessagedata.textWhenGold6to12;
      } else {
        return this.greetingmessagedata.textWhenElse6to12;
      }

    } else if (this.today >= 12 && this.today < 18) {
      if (this.ActivityStateIcon == 'Fitsense-bages-Bronze') {
        return this.greetingmessagedata.textWhenBronze12to18;
      } else if (this.ActivityStateIcon == 'Fitsense-bages-Silver') {
        return this.greetingmessagedata.textWhenSilver12to18;
      } else if (this.ActivityStateIcon == 'Fitsense-bages-Gold') {
        return this.greetingmessagedata.textWhenGold12to18;
      } else {
        return this.greetingmessagedata.textWhenElse12to18;
      }
    } else if (this.today >= 18 && this.today <= 24) {
      if (this.ActivityStateIcon == 'Fitsense-bages-Bronze') {
        return this.greetingmessagedata.textWhenBronze18to24;
      } else if (this.ActivityStateIcon == 'Fitsense-bages-Silver') {
        return this.greetingmessagedata.textWhenSilver18to24;
      } else if (this.ActivityStateIcon == 'Fitsense-bages-Gold') {
        return this.greetingmessagedata.textWhenGold18to24;
      } else {
        return this.greetingmessagedata.textWhenElse18to24;
      }
    } else {
      if (this.ActivityStateIcon == 'Fitsense-bages-Bronze') {
        return this.greetingmessagedata.textWhenBronze6to12;
      } else if (this.ActivityStateIcon == 'Fitsense-bages-Silver') {
        return this.greetingmessagedata.textWhenSilver6to12;
      } else if (this.ActivityStateIcon == 'Fitsense-bages-Gold') {
        return this.greetingmessagedata.textWhenGold6to12;
      } else {
        return this.greetingmessagedata.textWhenElse6to12;
      }
    }

  }
  getCacheValue(key: string) {
    return new Promise((resolve, reject) => {
      var state = this.RegistrationProcessProvider.getValue(key)
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
}
