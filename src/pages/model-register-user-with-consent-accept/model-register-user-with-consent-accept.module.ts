import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModelRegisterUserWithConsentAcceptPage } from './model-register-user-with-consent-accept';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ModelRegisterUserWithConsentAcceptPage,
  ],
  imports: [
    IonicPageModule.forChild(ModelRegisterUserWithConsentAcceptPage),
    ComponentsModule,TranslateModule
  ],
})
export class ModelRegisterUserWithConsentAcceptPageModule {}
