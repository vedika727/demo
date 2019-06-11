import {TranslateModule} from 'ng2-translate';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPolicyPage } from './add-policy';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    AddPolicyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPolicyPage),ComponentsModule, TranslateModule
  ],
})
export class AddPolicyPageModule {}
