import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPinSuccessPage } from './new-pin-success';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    NewPinSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPinSuccessPage),
    TranslateModule
  ],
})
export class NewPinSuccessPageModule {}
