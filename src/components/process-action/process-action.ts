import { Component, Input, OnInit, EventEmitter, Output } from "@angular/core";
// import { TranslaterModule } from 'translator/translator';
// import { TranslateService } from "ng2-translate";

/**
 * Generated class for the ProcessActionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "process-action",
  templateUrl: "process-action.html"
})
export class ProcessActionComponent implements OnInit {
  @Input("in") processActionInput: any;
  @Output() navigateToPage = new EventEmitter();
  text: string;
  iconName: string;
  title: string;
  showCameraIcon: boolean;
  showChallengeIcon: boolean;
  constructor(
    // private translateService: TranslateService
  ) {}
  ngOnInit() {
    if (!this.processActionInput.hasOwnProperty("headMessage")) {
      this.processActionInput.headMessage = "";
    }
    if (!this.processActionInput.hasOwnProperty("headMessage2")) {
      this.processActionInput.headMessage2 = "";
    }
  }
  action() {
    this.navigateToPage.emit("true");
  }
}
