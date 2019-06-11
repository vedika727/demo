import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from "ng2-translate";
import { ComponentsModule } from '../../components/components.module';
import { LoanSubmissionPage } from './loan-submission';

@NgModule({
  declarations: [
    LoanSubmissionPage,
  ],
  imports: [
    IonicPageModule.forChild(LoanSubmissionPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class LoanSubmissionPageModule {}
