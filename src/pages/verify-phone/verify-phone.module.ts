import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerifyPhonePage } from './verify-phone';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    VerifyPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(VerifyPhonePage),
    TranslateModule,
    ComponentsModule
  ],
})
export class VerifyPhonePageModule {}
