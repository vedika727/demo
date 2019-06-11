import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from 'ng2-translate';
import { PolicyLoanDashboardPage } from './policy-loan-dashboard';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    PolicyLoanDashboardPage
  ],
  imports: [
    IonicPageModule.forChild(PolicyLoanDashboardPage),
    ComponentsModule, 
    TranslateModule,
    PipesModule
  ],
})
export class PolicyLoanDashboardPageModule {}
