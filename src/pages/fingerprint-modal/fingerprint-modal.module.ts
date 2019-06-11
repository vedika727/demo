import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FingerprintModalPage } from './fingerprint-modal';

@NgModule({
  declarations: [
    FingerprintModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FingerprintModalPage),
  ],
})
export class FingerprintModalPageModule {}
