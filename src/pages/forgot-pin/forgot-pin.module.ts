import { ComponentsModule } from "./../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ForgotPinPage } from "./forgot-pin";
import { TranslateModule } from "ng2-translate";
@NgModule({
  declarations: [ForgotPinPage],
  imports: [
    IonicPageModule.forChild(ForgotPinPage),
    TranslateModule,
    ComponentsModule
  ]
})
export class ForgotPinPageModule {}
