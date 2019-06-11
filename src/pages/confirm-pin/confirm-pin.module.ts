import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPinPage } from './confirm-pin';
import {TranslateModule} from 'ng2-translate';
import { ComponentsModule } from "../../components/components.module";
import { TranslaterModule } from "../../translator/translator";


@NgModule({
  declarations: [
    ConfirmPinPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPinPage),
    ComponentsModule,
    TranslaterModule
  ],
})
export class ConfirmPinPageModule {}
