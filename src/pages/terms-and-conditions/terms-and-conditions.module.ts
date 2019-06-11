import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsAndConditionsPage } from './terms-and-conditions';
import { TranslateModule } from "ng2-translate";
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TermsAndConditionsPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsAndConditionsPage),
    TranslateModule,
    ComponentsModule,
    PipesModule
  ],
})
export class TermsAndConditionsPageModule {}
