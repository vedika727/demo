import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CallSupportPage } from './call-support';
import {TranslateModule} from 'ng2-translate';
@NgModule({
  declarations: [
    CallSupportPage
  ],
  imports: [
    IonicPageModule.forChild(CallSupportPage),
    TranslateModule
  ],
})
export class CallSupportPageModule {}
