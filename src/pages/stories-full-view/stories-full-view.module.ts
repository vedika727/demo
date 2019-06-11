import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoriesFullViewPage } from './stories-full-view';

@NgModule({
  declarations: [
    StoriesFullViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StoriesFullViewPage),ComponentsModule
  ],
})
export class StoriesFullViewPageModule {}
