import { Component, Input } from "@angular/core";
import { NavController } from "ionic-angular";

/**
 * Generated class for the GenericMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "generic-view",
  templateUrl: "generic-view.html"
})
export class GenericViewComponent {
  @Input("In")
  inputData;
  ngOnInit() {}

  constructor(private navCtrl: NavController) {
    console.log("Hello GenericMessageComponent Component");
  }

  callBackFunction() {
    this.inputData.callback.apply(this.inputData.context);
    this.inputData.handler.ok.apply(this.inputData.context);
  }
  callBackFunction2() {
    // this.navCtrl.pop(this.inputData.pageName);
    this.inputData.handler.cancel.apply(this.inputData.context);
  }
}
