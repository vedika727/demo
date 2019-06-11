import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsAndConditionConsentPage } from './terms-and-condition-consent';
import { TranslateModule } from "ng2-translate";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TermsAndConditionConsentPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsAndConditionConsentPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class TermsAndConditionConsentPageModule {}
