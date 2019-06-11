import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityLogPage } from './activity-log';
import {TranslateModule} from 'ng2-translate';
@NgModule({
  declarations: [
    ActivityLogPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityLogPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class ActivityLogPageModule {}
