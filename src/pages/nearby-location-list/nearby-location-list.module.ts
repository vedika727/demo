import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearbyLocationListPage } from './nearby-location-list';
import { TranslateModule } from "ng2-translate";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    NearbyLocationListPage,
  ],
  imports: [
    IonicPageModule.forChild(NearbyLocationListPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class NearbyLocationListPageModule {}
