import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogoutPromptPage } from './logout-prompt';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    LogoutPromptPage,
  ],
  imports: [
    IonicPageModule.forChild(LogoutPromptPage),
    TranslateModule
  ],
})
export class LogoutPromptPageModule {}
