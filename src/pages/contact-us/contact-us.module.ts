import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactUsPage } from './contact-us';
import { ComponentsModule } from '../../components/components.module';
// imported CallMeBack Page
import { CallMeBackPage } from "pages/pages";
import {TranslateModule} from 'ng2-translate';
@NgModule({
  declarations: [
    ContactUsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactUsPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class ContactUsPageModule { }
