import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClaimsPage } from './claims';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ClaimsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClaimsPage),
    ComponentsModule
  ],
})
export class ClaimsPageModule {}
