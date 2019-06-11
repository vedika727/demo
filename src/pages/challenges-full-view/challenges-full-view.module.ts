import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChallengesFullViewPage } from './challenges-full-view';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    ChallengesFullViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ChallengesFullViewPage),ComponentsModule,TranslateModule
  ],
})
export class ChallengesFullViewPageModule {}
