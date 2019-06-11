import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ProvidersModule } from "../../providers/providers.module";
import { LogServiceProvider } from "../../providers/data-service/log-service";
import { LoginPage } from "../pages";
import { Platform } from "ionic-angular";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";
import { BaseApp } from "../../app/base";

/**
 * @author - Yashodhan Apte
 * @description - this is a page passed in modalService to show as a popup on any page if internet connectivity is lost.
 */
@IonicPage()
@Component({
  selector: "page-no-internet",
  templateUrl: "no-internet.html"
})
export class NoInternetPage extends BaseApp {
  // heading:string;
  // message1:string;
  // message2:string;
  // okayButton:string;

  internetData;
  title;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loggerService: LogServiceProvider,
    public plt: Platform,
    private modalService: ModalServiceProvider
  ) {
    super();
    let data = this.navParams.get("data");
    console.log("not internet data ---- ", data);
    this.internetData = data;
  }

  ionViewDidEnter() {
    this.getInternetConnectionGenericInterface(this.internetData);
  }

  hideModal() {
    this.modalService.dismissModal();
  }

  ionViewDidLeave(){
  }
}
