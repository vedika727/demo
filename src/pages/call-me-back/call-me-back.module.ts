import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallMeBackPage } from './call-me-back';
import { TranslateModule } from "ng2-translate";
@NgModule({
  declarations: [
    CallMeBackPage,
  ],
  imports: [
    IonicPageModule.forChild(CallMeBackPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class CallMeBackPageModule {}
