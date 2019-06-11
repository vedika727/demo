import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WrongPinPopupPage } from './wrong-pin-popup';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [
    WrongPinPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(WrongPinPopupPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class WrongPinPopupPageModule {}
