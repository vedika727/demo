import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetPinPage } from './set-pin';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    SetPinPage,
  ],
  imports: [
    IonicPageModule.forChild(SetPinPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class SetPinPageModule { }
