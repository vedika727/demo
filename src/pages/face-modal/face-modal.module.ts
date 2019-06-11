import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaceModalPage } from './face-modal';

@NgModule({
  declarations: [
    FaceModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FaceModalPage),
  ],
})
export class FaceModalPageModule {}
