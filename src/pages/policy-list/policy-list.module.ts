import { ComponentsModule } from '../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolicyListPage } from './policy-list';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    PolicyListPage,
  ],
  imports: [
    IonicPageModule.forChild(PolicyListPage),ComponentsModule,TranslateModule
  ],
})
export class PolicyListPageModule {}
