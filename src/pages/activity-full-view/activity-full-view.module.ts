import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityFullViewPage } from './activity-full-view';
import {TranslateModule} from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ActivityFullViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityFullViewPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class ActivityFullViewPageModule {}
