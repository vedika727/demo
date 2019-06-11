import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentSentConfirmationPage } from './document-sent-confirmation';
import {TranslateModule} from 'ng2-translate';

@NgModule({
  declarations: [
    DocumentSentConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentSentConfirmationPage),ComponentsModule,TranslateModule
  ],
})
export class DocumentSentConfirmationPageModule {}
