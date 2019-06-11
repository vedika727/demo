import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { EnterOtpPage } from "./enter-otp";
import {TranslateModule} from 'ng2-translate';
import { ComponentsModule } from "../../components/components.module";


@NgModule({
  declarations: [EnterOtpPage],
  imports: [
    IonicPageModule.forChild(EnterOtpPage),
    TranslateModule,
    ComponentsModule
  ]
})
export class EnterOtpPageModule {}
