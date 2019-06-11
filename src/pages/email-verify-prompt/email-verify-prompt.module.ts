import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailVerifyPromptPage } from './email-verify-prompt';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    EmailVerifyPromptPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailVerifyPromptPage),
    TranslateModule
  ],
})
export class EmailVerifyPromptPageModule {}
