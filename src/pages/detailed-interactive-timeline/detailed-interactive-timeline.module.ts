import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailedInteractiveTimelinePage } from './detailed-interactive-timeline';
import {TranslateModule} from 'ng2-translate';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    DetailedInteractiveTimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailedInteractiveTimelinePage),
    TranslateModule,
    ComponentsModule
  ],
})
export class DetailedInteractiveTimelinePageModule {}
