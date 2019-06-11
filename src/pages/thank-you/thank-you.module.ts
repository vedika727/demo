import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ThankYouPage } from './thank-you';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    ThankYouPage,
  ],
  imports: [
    IonicPageModule.forChild(ThankYouPage),
    ComponentsModule,
    TranslateModule,
  ],
})
export class ThankYouPageModule {}
