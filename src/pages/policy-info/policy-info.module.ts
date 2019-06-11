import { TranslateModule } from 'ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PolicyInfoPage } from './policy-info';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    PolicyInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PolicyInfoPage),TranslateModule,
    ComponentsModule,
    PipesModule
  ],
})
export class PolicyInfoPageModule {}
