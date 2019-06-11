import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportDocumentsPage } from './support-documents';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    SupportDocumentsPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportDocumentsPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class SupportDocumentsPageModule {}
