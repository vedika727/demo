import { Component } from "@angular/core";
import { IonicPage, NavController, ViewController } from "ionic-angular";
// import { TranslateService } from "ng2-translate";
import { ScbHeaderInputs } from "../../components/scb-header/scb-header";

@IonicPage()
@Component({
  selector: "page-security-questions",
  templateUrl: "security-questions.html"
})
export class SecurityQuestionsPage {
  securityQA: any = {};
  headerInput: ScbHeaderInputs = new ScbHeaderInputs();

  constructor(public navCtrl: NavController) // public viewCtrl: ViewController
  // private translateService: TranslateService
  {
    this.headerInput.isBackButton = true;
    this.headerInput.nav = this.navCtrl;
  }

  backBtn() {
    this.navCtrl.pop();
  }
  sendAnswerSet() {}

  contactSupport() {}
}
