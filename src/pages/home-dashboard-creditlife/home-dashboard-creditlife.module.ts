import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeDashboardCreditlifePage } from './home-dashboard-creditlife';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from 'ng2-translate';

@NgModule({
  declarations: [
    HomeDashboardCreditlifePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeDashboardCreditlifePage),ComponentsModule,
    TranslateModule
  ],
})
export class HomeDashboardCreditlifePageModule {}
