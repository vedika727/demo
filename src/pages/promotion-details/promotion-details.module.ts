import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromotionDetailsPage } from './promotion-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PromotionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PromotionDetailsPage),
    ComponentsModule
  ],
})
export class PromotionDetailsPageModule {}
