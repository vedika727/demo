import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";
// import { TranslateService } from "ng2-translate";

/**
 * Generated class for the RegistrationEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-registration-entry",
  templateUrl: "registration-entry.html"
})
export class RegistrationEntryPage {
  headerInput:ScbHeaderInputs = new ScbHeaderInputs();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,

  ) // private translateService: TranslateService
  {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = navCtrl;
    // this.translateService.use("en");
  }

  applyLater() {}
}
