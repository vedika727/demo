import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { PolicyLoanConfirmationPage } from './policy-loan-confirmation';

@NgModule({
  declarations: [
    PolicyLoanConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(PolicyLoanConfirmationPage),
    ComponentsModule
  ],
})
export class PolicyLoanConfirmationPageModule {}
