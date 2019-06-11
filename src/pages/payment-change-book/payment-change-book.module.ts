import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentChangeBookPage } from './payment-change-book';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    PaymentChangeBookPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentChangeBookPage),
    TranslateModule,ComponentsModule
  ],
})
export class PaymentChangeBookPageModule {}
