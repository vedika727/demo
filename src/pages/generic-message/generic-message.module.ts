import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GenericMessagePage } from './generic-message';
import { TranslateModule } from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    GenericMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(GenericMessagePage),
    TranslateModule,
    ComponentsModule
  ],
})
export class GenericMessagePageModule {}
