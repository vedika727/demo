import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentSucessfulRoyaltyPage } from './payment-sucessful-royalty';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PaymentSucessfulRoyaltyPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentSucessfulRoyaltyPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class PaymentSucessfulRoyaltyPageModule {}
