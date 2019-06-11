import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardFullViewAccidentPage } from './dashboard-full-view-accident';
import { ComponentsModule } from '../../components/components.module';
import {TranslateModule} from 'ng2-translate';
import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    DashboardFullViewAccidentPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardFullViewAccidentPage),
    ComponentsModule,
    TranslateModule,
    PipesModule
  ],
})
export class DashboardFullViewAccidentPageModule {}
