import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceAlreadyRegisteredPromptPage } from './device-already-registered-prompt';
import { TranslateModule } from 'ng2-translate';
@NgModule({
  declarations: [
    DeviceAlreadyRegisteredPromptPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceAlreadyRegisteredPromptPage),
    TranslateModule
  ],
})
export class DeviceAlreadyRegisteredPromptPageModule {}
