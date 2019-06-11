import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentMethodPage } from './payment-method';
import { ComponentsModule } from '../../components/components.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    PaymentMethodPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentMethodPage),
    ComponentsModule,
    NgxQRCodeModule,
    TranslateModule
  ],
})
export class PaymentMethodPageModule {}
