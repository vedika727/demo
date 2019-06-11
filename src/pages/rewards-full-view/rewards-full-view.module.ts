import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RewardsFullViewPage } from './rewards-full-view';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    RewardsFullViewPage,
  ],
  imports: [
    IonicPageModule.forChild(RewardsFullViewPage),ComponentsModule,TranslateModule
  ],
})
export class RewardsFullViewPageModule {}
