import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TotalCoveragePage } from './total-coverage';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TotalCoveragePage,
  ],
  imports: [
    IonicPageModule.forChild(TotalCoveragePage),
    ComponentsModule
  ],
})
export class TotalCoveragePageModule {}
