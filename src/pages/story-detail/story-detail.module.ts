import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryDetailPage } from './story-detail';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    StoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(StoryDetailPage),
    ComponentsModule
  ],
})
export class StoryDetailPageModule {}
