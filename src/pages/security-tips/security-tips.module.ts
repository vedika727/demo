import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecurityTipsPage } from './security-tips';
import { TranslateModule } from "ng2-translate";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SecurityTipsPage,
  ],
  imports: [
    IonicPageModule.forChild(SecurityTipsPage),
    TranslateModule,
    ComponentsModule
  ],
})
export class SecurityTipsPageModule {}
