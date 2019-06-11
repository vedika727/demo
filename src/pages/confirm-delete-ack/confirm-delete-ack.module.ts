import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmDeleteAckPage } from './confirm-delete-ack';
import {TranslateModule} from 'ng2-translate';
@NgModule({
  declarations: [
    ConfirmDeleteAckPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmDeleteAckPage), TranslateModule
  ],
})
export class ConfirmDeleteAckPageModule {}
