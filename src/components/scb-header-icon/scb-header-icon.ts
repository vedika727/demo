import { NavController } from "ionic-angular";
import { Component, Input } from "@angular/core";

@Component({
  selector: "scb-header-icon",
  templateUrl: "scb-header-icon.html"
})
export class ScbHeaderIconComponent {

  text: string;
  @Input("in") inputsDetails: HeaderInputs;
  @Input("daynightFlag") daynightFlag;
  @Input("absolutePosition") absolutePosition:boolean;

  constructor(
    // private translateService: TranslateService
  ) {
    console.log("Hello ScbHeaderIconComponent Component");
    this.daynightFlag = 'day';
    this.absolutePosition=false
    // this.translateService.use("en");
  }

  backBtnEvent() {
    this.inputsDetails.nav.pop();
  }
}

export class HeaderInputs {
  isBackButton: boolean;
  isSideMenu: boolean;
  nav: NavController;
}
