import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScbForgotPinWarningPopupPage } from './scb-forgot-pin-warning-popup';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ScbForgotPinWarningPopupPage,
  ],
  imports: [
    IonicPageModule.forChild(ScbForgotPinWarningPopupPage),ComponentsModule,TranslateModule
  ],
})
export class ScbForgotPinWarningPopupPageModule {}
