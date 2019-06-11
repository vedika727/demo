import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetNewpinSuccessfulLoginPage } from './set-newpin-successful-login';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from 'ng2-translate';
@NgModule({
  declarations: [
    SetNewpinSuccessfulLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(SetNewpinSuccessfulLoginPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class SetNewpinSuccessfulLoginPageModule {}
