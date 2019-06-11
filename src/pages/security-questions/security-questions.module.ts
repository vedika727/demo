import { ComponentsModule } from "./../../components/components.module";
import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SecurityQuestionsPage } from "./security-questions";
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [SecurityQuestionsPage],
  imports: [
    IonicPageModule.forChild(SecurityQuestionsPage),
    ComponentsModule,
    TranslateModule
  ]
})
export class SecurityQuestionsPageModule {}
