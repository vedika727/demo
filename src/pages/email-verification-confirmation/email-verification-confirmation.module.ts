import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailVerificationConfirmationPage } from './email-verification-confirmation';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    EmailVerificationConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailVerificationConfirmationPage),
    TranslateModule
  ],
})
export class EmailVerificationConfirmationPageModule {}
