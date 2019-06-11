import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScbLaterProcessPage } from './scb-later-process';
import { ComponentsModule } from "../../components/components.module";
import { TranslateModule } from "ng2-translate";

@NgModule({
  declarations: [
    ScbLaterProcessPage,
  ],
  imports: [
    IonicPageModule.forChild(ScbLaterProcessPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class ScbLaterProcessPageModule {}
