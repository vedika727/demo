import { ComponentsModule } from "./../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GlobalErrorHandlerPage } from "./global-error-handler";
import { TranslateModule } from "ng2-translate";
@NgModule({
  declarations: [GlobalErrorHandlerPage],
  imports: [
    IonicPageModule.forChild(GlobalErrorHandlerPage),
    TranslateModule,
    ComponentsModule
  ]
})
export class GlobalErrorHandlerPageModule {}
