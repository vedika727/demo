import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutoDeductPaymentPage } from './auto-deduct-payment';
import {TranslateModule} from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    AutoDeductPaymentPage,
    
  ],
  imports: [
    IonicPageModule.forChild(AutoDeductPaymentPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class AutoDeductPaymentPageModule {}
