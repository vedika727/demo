import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoMobileModalPage } from './no-mobile-modal';

@NgModule({
  declarations: [
    NoMobileModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NoMobileModalPage),
  ],
})
export class NoMobileModalPageModule {}
