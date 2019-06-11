import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanTermsConditionsPage } from './loan-terms-conditions';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    LoanTermsConditionsPage,
  ],
  imports: [
    IonicPageModule.forChild(LoanTermsConditionsPage),
    TranslateModule,
    ComponentsModule
  ]
})
export class LoanTermsConditionsPageModule {}
