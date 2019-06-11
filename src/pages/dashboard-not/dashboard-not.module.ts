import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardNotPage } from './dashboard-not';
import { ComponentsModule } from '../../components/components.module';
import {TranslateModule} from 'ng2-translate';

@NgModule({
  declarations: [
    DashboardNotPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardNotPage),
    ComponentsModule,
    TranslateModule
  ],
})
export class DashboardNotPageModule {}
