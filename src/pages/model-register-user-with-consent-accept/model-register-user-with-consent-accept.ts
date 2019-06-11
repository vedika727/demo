import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ModalServiceProvider } from "../../providers/modal-service/modal-service";

/**
 * Generated class for the ModelRegisterUserWithConsentAcceptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-model-register-user-with-consent-accept",
  templateUrl: "model-register-user-with-consent-accept.html"
})
export class ModelRegisterUserWithConsentAcceptPage implements OnInit {
  navParamFunctions: any;
  navCode: any;
  EmailAlredyExist: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    private modalService: ModalServiceProvider
  ) {
    this.navParamFunctions = this.navParam.get("callBack");
    this.navCode = this.navParam.get("CODE");
    if (this.navCode == 1113) {
      this.EmailAlredyExist = false;
    } else {
      this.EmailAlredyExist = true;
    }

    console.log("jhabhjhjvj ", this.EmailAlredyExist);
  }
  ngOnInit() {
    this.navCode = this.navParam.get("CODE");
    if (this.navCode == 1113) {
      this.EmailAlredyExist = false;
    } else {
      this.EmailAlredyExist = true;
    }

    console.log("jhabhjhjvj ", this.EmailAlredyExist);
  }
  callBackTrigger(status: boolean) {
    this.navParamFunctions(status);
  }

  dismissModal() {
    this.modalService.dismissModal();
  }
}
