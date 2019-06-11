import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsentPage } from './consent';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    ConsentPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsentPage),
    ComponentsModule,
    TranslateModule,
  ],
})
export class ConsentPageModule {}
