import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentFailAckPage } from './payment-fail-ack';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    PaymentFailAckPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentFailAckPage),TranslateModule,ComponentsModule
  ],
})
export class PaymentFailAckPageModule {}
