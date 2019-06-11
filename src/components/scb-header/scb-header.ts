import { LoginServivceProvider } from './../../providers/login-module/login-service/login-service';
import { NavController } from "ionic-angular";
import { Component, Input, OnInit } from "@angular/core";
import { CacheServiceProvider } from "../../providers/ion-service/cache-service";
import { BaseApp } from '../../app/base';
import { RegisterUserPage, TabsPage } from "../../pages/pages";
import { FitsenseServiceProvider } from '../../providers/homepage-module/fitsense-service/fitsense-service';
import { DeviceInfoServiceProvider } from '../../providers/deviceInfo-service/deviceInfo-service';

@Component({
  selector: "scb-header",
  templateUrl: "scb-header.html"
})
export class ScbHeaderComponent extends BaseApp implements OnInit {
  @Input("in") scbHeaderInputs: ScbHeaderInputs;

  constructor(public cacheService: CacheServiceProvider, public loginService: LoginServivceProvider, public fitsenseService: FitsenseServiceProvider,
    public deviceInfoService: DeviceInfoServiceProvider) {
    super();
    console.log("Hello ScbHeaderIconComponent Component");
    console.log(this.loginService.customerInfo, "customerInfo in header");
  }

  navigatePage() {
    if (this.scbHeaderInputs.backNavTo) {
      let page = this.scbHeaderInputs.backNavTo.page;
      let navData = this.scbHeaderInputs.backNavTo.navData;
      console.log('called back', this.scbHeaderInputs);
      this.scbHeaderInputs.nav.setRoot(page, { data: navData });
    } else {
      this.scbHeaderInputs.nav.pop();
      console.log("Pop the page called");
    }
  }

  ngOnInit() {
    if (!this.scbHeaderInputs) {
      this.scbHeaderInputs = new ScbHeaderInputs();
    }
    console.log("header status", this.scbHeaderInputs);
  }

  navigateTo(page) {

    this.cacheService.getCache(this.CONSTANT.KEY_IS_CUSTOMER_REGISTERED).then((res) => {
      console.log('got is Registered in navigateTo in header', res);
      if (res) {
        if (this.deviceInfoService.isRunningOnDevice()) {
          this.fitsenseService.endFitsenseScreen();
        }
        this.scbHeaderInputs.nav.push(page);
      }
      else
        this.scbHeaderInputs.nav.parent.parent.setRoot(RegisterUserPage);
    }, (err) => {
      console.log('DIDNT GET isregesiterd in navigateTo in header', err);
      this.scbHeaderInputs.nav.parent.parent.setRoot(RegisterUserPage);
    });
  }
}

export class ScbHeaderInputs {
  isBackButton: boolean = false;
  isProfile: boolean = false;
  isNotification: boolean = false;
  nav: NavController;
  daynightFlag: string = 'day';
  public backNavTo: any;
  isLogoNeedBlur: boolean = false;
  loginPageIconSize: boolean = false;
  title: string = '';
  isPageRegisterLaterProcess: boolean = false;
  constructor() {

  }
}
