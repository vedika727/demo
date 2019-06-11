import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentInformationPage } from './payment-information';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    PaymentInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentInformationPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class PaymentInformationPageModule {}
