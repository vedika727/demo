import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistrationEntryPage } from './registration-entry';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    RegistrationEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistrationEntryPage),ComponentsModule,
    TranslateModule
  ],
})
export class RegistrationEntryPageModule {}
