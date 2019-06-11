import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddChangeCreditCardPage } from './add-change-credit-card';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    AddChangeCreditCardPage,
  ],
  imports: [
    IonicPageModule.forChild(AddChangeCreditCardPage),ComponentsModule,
    TranslateModule
  ],
})
export class AddChangeCreditCardPageModule {}
