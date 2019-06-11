import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentChangebookSuccessPage } from './payment-changebook-success';
import {TranslateModule} from 'ng2-translate';
@NgModule({
  declarations: [
    PaymentChangebookSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentChangebookSuccessPage),ComponentsModule,TranslateModule
  ],
})
export class PaymentChangebookSuccessPageModule {}
