import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPopupPage } from './login-popup';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "ng2-translate";


@NgModule({
  declarations: [
    LoginPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPopupPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class LoginPopupPageModule {}
