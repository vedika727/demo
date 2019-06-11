import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, ViewController } from "ionic-angular";


@IonicPage()
@Component({
  selector: "page-global-handler",
  templateUrl: "global-error-handler.html"
})
export class GlobalErrorHandlerPage {
   public errorHandlerData:ErrorHandlerData = new ErrorHandlerData();
  constructor(public navParams:NavParams,public viewController:ViewController){

  }
  ionViewDidLoad() {
    this.errorHandlerData = this.navParams.get("data");
    console.log("Service is ",this.errorHandlerData);
  }
  cancel(){
    this.viewController.dismiss();
  }
  retry(){
      let method = this.errorHandlerData.method;
      let service = this.errorHandlerData.service;
      console.log("Calling Service ",service,method);
      this.viewController.dismiss();
      method.apply(service,[this.errorHandlerData.params]);
  }



  
}

export class ErrorHandlerData{
    service:any;
    method:any;
    message:any;
    params?:any;
}