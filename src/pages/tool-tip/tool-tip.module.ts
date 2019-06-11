import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToolTipPage } from './tool-tip';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ToolTipPage,
  ],
  imports: [
    IonicPageModule.forChild(ToolTipPage),
    ComponentsModule
  ],
})
export class ToolTipPageModule {}
