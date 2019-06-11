import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SetFingerprintPage } from './set-fingerprint';
import {TranslateModule} from 'ng2-translate';


@NgModule({
  declarations: [
    SetFingerprintPage,
  ],
  imports: [
    IonicPageModule.forChild(SetFingerprintPage),
    TranslateModule,ComponentsModule
  ],
})
export class SetFingerprintPageModule {}
