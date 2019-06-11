import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionTimeoutPage } from './session-timeout';

@NgModule({
  declarations: [
    SessionTimeoutPage,
  ],
  imports: [
    IonicPageModule.forChild(SessionTimeoutPage),
  ],
})
export class SessionTimeoutPageModule {}
