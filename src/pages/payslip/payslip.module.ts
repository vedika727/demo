import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayslipPage } from './payslip';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PayslipPage,
  ],
  imports: [
    IonicPageModule.forChild(PayslipPage),
    ComponentsModule
  ],
})
export class PayslipPageModule {}
