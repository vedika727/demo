import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TranslateModule} from 'ng2-translate';
import { PaymentDashboardPage } from './payment-dashboard';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    PaymentDashboardPage
  ],
  imports: [
    IonicPageModule.forChild(PaymentDashboardPage),
    ComponentsModule, 
    TranslateModule,
    PipesModule
  ],
})
export class PaymentDashboardPageModule {}
