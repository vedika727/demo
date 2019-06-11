import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsuranceCardPage } from './insurance-card';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    InsuranceCardPage,
  ],
  imports: [
    IonicPageModule.forChild(InsuranceCardPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class InsuranceCardPageModule {}
