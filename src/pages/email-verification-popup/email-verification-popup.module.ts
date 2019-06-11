import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailVerificationPopupPage } from './email-verification-popup';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [
    EmailVerificationPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailVerificationPopupPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class EmailVerificationPopupPageModule {}
