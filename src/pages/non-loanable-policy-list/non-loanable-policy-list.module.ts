import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NonLoanablePolicyListPage } from './non-loanable-policy-list';
import { TranslateModule } from "ng2-translate";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NonLoanablePolicyListPage,
  ],
  imports: [
    IonicPageModule.forChild(NonLoanablePolicyListPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class NonLoanablePolicyListPageModule {}
