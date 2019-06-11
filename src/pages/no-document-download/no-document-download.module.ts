import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoDocumentDownloadPage } from './no-document-download';
import { TranslateModule } from 'ng2-translate';


@NgModule({
  declarations: [
    NoDocumentDownloadPage,
  ],
  imports: [
    IonicPageModule.forChild(NoDocumentDownloadPage),
    TranslateModule
  ],
})
export class NoDocumentDownloadPageModule {}
