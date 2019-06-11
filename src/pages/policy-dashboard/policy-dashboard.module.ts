import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolicyDashboardPage } from './policy-dashboard';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from 'ng2-translate';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PolicyDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(PolicyDashboardPage),
    ComponentsModule,
    TranslateModule,
    DirectivesModule,
    PipesModule
  ],
})
export class PolicyDashboardPageModule {}
