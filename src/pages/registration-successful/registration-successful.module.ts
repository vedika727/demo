import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RegistrationSuccessfulPage } from "./registration-successful";
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [RegistrationSuccessfulPage],
  imports: [
    IonicPageModule.forChild(RegistrationSuccessfulPage),
    ComponentsModule,TranslateModule
  ]
})
export class RegistrationSuccessfulPageModule {}
